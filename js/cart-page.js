/* Renders cart contents, quantity editing, delivery fee estimate,
   and preps the hidden fields used by the Formspree quote request form. */

let deliveryState = { status: "none" };
let promoState = { applied: false };

const PROMO_CODES = { SUMMER26: 0.05 };

const CART_LABELS = {
  each: { en: "each", es: "c/u" },
  decreaseQty: { en: "Decrease quantity", es: "Disminuir cantidad" },
  increaseQty: { en: "Increase quantity", es: "Aumentar cantidad" },
  removeItem: { en: "Remove item", es: "Eliminar artículo" },
  free: { en: "Free", es: "Gratis" },
  contactUs: { en: "Contact us", es: "Contáctanos" },
  sending: { en: "Sending…", es: "Enviando…" },
  submit: { en: "Submit", es: "Enviar" },
  submitError: {
    en: "Something went wrong sending your request. Please try again, or email us directly at jjrentalservices1@gmail.com.",
    es: "Algo salió mal al enviar tu solicitud. Intenta de nuevo, o escríbenos directamente a jjrentalservices1@gmail.com."
  },
  promoApplied: { en: (pct) => `Code applied — ${pct}% off your order.`, es: (pct) => `Código aplicado — ${pct}% de descuento en tu pedido.` },
  promoUnrecognized: { en: "Code not recognized.", es: "Código no reconocido." }
};

function cartLabel(key, lang) {
  return CART_LABELS[key][lang];
}

function cartLineName(line, lang) {
  return lang === "es" && line.nameEs ? line.nameEs : line.name;
}

function cartLineDims(line, lang) {
  return lang === "es" && line.dimsEs ? line.dimsEs : line.dims;
}

function cartRowHTML(line, lang) {
  return `
    <div class="cart-row" data-key="${line.key}">
      <div class="cart-row-info">
        <h4>${cartLineName(line, lang)}</h4>
        <span>${cartLineDims(line, lang)} · ${formatMoney(line.price)} ${cartLabel("each", lang)}</span>
      </div>
      <div class="qty-stepper">
        <button type="button" data-qty-minus aria-label="${cartLabel("decreaseQty", lang)}">−</button>
        <input type="text" inputmode="numeric" value="${line.qty}" data-qty-input readonly />
        <button type="button" data-qty-plus aria-label="${cartLabel("increaseQty", lang)}">+</button>
      </div>
      <div class="cart-row-price">${formatMoney(line.price * line.qty)}</div>
      <button type="button" class="cart-row-remove" data-remove aria-label="${cartLabel("removeItem", lang)}">✕</button>
    </div>
  `;
}

function wireCartRows() {
  document.querySelectorAll(".cart-row").forEach((row) => {
    const key = row.dataset.key;
    const line = getCart().find((l) => l.key === key);
    if (!line) return;
    const catalogItem = CATALOG.find((i) => i.id === line.id);
    const maxQty = catalogItem ? catalogItem.stock : 999;

    row.querySelector("[data-qty-minus]").addEventListener("click", () => {
      updateCartQty(key, line.qty - 1);
      renderCart();
    });

    row.querySelector("[data-qty-plus]").addEventListener("click", () => {
      updateCartQty(key, Math.min(line.qty + 1, maxQty));
      renderCart();
    });

    row.querySelector("[data-remove]").addEventListener("click", () => {
      removeFromCart(key);
      renderCart();
    });
  });
}

function updateTotals() {
  const lang = typeof getLang === "function" ? getLang() : "en";
  const cart = getCart();
  const subtotal = cartTotal(cart);

  const deliveryRow = document.getElementById("delivery-row");
  const deliveryDisplay = document.getElementById("delivery-fee-display");
  const promoRow = document.getElementById("promo-row");
  const promoDisplay = document.getElementById("promo-discount-display");
  const totalEl = document.getElementById("summary-total");
  const deliveryField = document.getElementById("delivery-field");
  const promoField = document.getElementById("promo-field");
  const totalField = document.getElementById("total-field");

  const discount = promoState.applied ? subtotal * PROMO_CODES.SUMMER26 : 0;
  const discountedSubtotal = subtotal - discount;

  promoRow.hidden = !promoState.applied;
  promoDisplay.textContent = discount > 0 ? `-${formatMoney(discount)}` : "—";
  promoField.value = promoState.applied ? `SUMMER26 (-${formatMoney(discount)})` : "None";

  let deliveryFeeText = "—";
  let deliveryFieldValue = "Not calculated";
  let totalText = formatMoney(discountedSubtotal);
  let showDeliveryRow = false;

  if (deliveryState.status === "free") {
    deliveryFeeText = cartLabel("free", lang);
    deliveryFieldValue = "Free (Moreno Valley ZIP)";
    totalText = formatMoney(discountedSubtotal);
    showDeliveryRow = true;
  } else if (deliveryState.status === "fee") {
    deliveryFeeText = formatMoney(deliveryState.fee);
    deliveryFieldValue = `${formatMoney(deliveryState.fee)} (~${deliveryState.distance.toFixed(1)} mi from Moreno Valley)`;
    totalText = formatMoney(discountedSubtotal + deliveryState.fee);
    showDeliveryRow = true;
  } else if (deliveryState.status === "contact") {
    deliveryFeeText = cartLabel("contactUs", lang);
    deliveryFieldValue = `Contact us (~${deliveryState.distance.toFixed(0)} mi away)`;
    totalText = `${formatMoney(discountedSubtotal)} + delivery (TBD)`;
    showDeliveryRow = true;
  }

  deliveryRow.hidden = !showDeliveryRow;
  deliveryDisplay.textContent = deliveryFeeText;
  totalEl.textContent = totalText;
  deliveryField.value = deliveryFieldValue;
  totalField.value = totalText;
}

function renderCart() {
  const lang = typeof getLang === "function" ? getLang() : "en";
  const cart = getCart();
  const emptyEl = document.getElementById("cart-empty");
  const contentEl = document.getElementById("cart-content");

  if (cart.length === 0) {
    emptyEl.hidden = false;
    contentEl.hidden = true;
    return;
  }

  emptyEl.hidden = true;
  contentEl.hidden = false;

  document.getElementById("cart-items").innerHTML = cart.map((line) => cartRowHTML(line, lang)).join("");
  wireCartRows();

  document.getElementById("summary-rows").innerHTML = cart
    .map(
      (line) => `
        <div class="summary-row">
          <span>${line.qty} × ${cartLineName(line, lang)}</span>
          <span>${formatMoney(line.price * line.qty)}</span>
        </div>
      `
    )
    .join("");

  // Always in English — this feeds the hidden field emailed to the business, not shown to the shopper.
  const summaryText = cart
    .map(
      (line) =>
        `${line.qty} x ${line.name} (${line.dims}) — ${formatMoney(line.price)} each = ${formatMoney(
          line.price * line.qty
        )}`
    )
    .join("\n");
  document.getElementById("cart-summary-field").value = summaryText;

  updateTotals();
}

function initDeliveryZip() {
  const zipInput = document.getElementById("zip");
  const note = document.getElementById("delivery-note");
  let debounceTimer;

  zipInput.addEventListener("input", () => {
    zipInput.value = zipInput.value.replace(/\D/g, "").slice(0, 5);
    clearTimeout(debounceTimer);

    const zip = zipInput.value.trim();
    if (zip.length !== 5) {
      deliveryState = { status: "none" };
      note.textContent = "";
      updateTotals();
      return;
    }

    const lang = typeof getLang === "function" ? getLang() : "en";
    note.textContent = lang === "es" ? "Verificando costo de entrega…" : "Checking delivery fee…";
    debounceTimer = setTimeout(async () => {
      const result = await estimateDeliveryFee(zip, lang);
      deliveryState = result;
      note.textContent = result.message || "";
      updateTotals();
    }, 500);
  });
}

function initPromoCode() {
  const promoInput = document.getElementById("promo-code");
  const note = document.getElementById("promo-note");
  if (!promoInput) return;

  promoInput.addEventListener("input", () => {
    const lang = typeof getLang === "function" ? getLang() : "en";
    const code = promoInput.value.trim().toUpperCase();

    if (!code) {
      promoState = { applied: false };
      note.textContent = "";
      updateTotals();
      return;
    }

    if (PROMO_CODES[code]) {
      promoState = { applied: true };
      note.textContent = cartLabel("promoApplied", lang)(PROMO_CODES[code] * 100);
    } else {
      promoState = { applied: false };
      note.textContent = cartLabel("promoUnrecognized", lang);
    }
    updateTotals();
  });
}

function initEventDateMin() {
  const dateInput = document.getElementById("event-date");
  if (!dateInput) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  initDeliveryZip();
  initPromoCode();
  initEventDateMin();

  const form = document.getElementById("quote-form");
  if (form) {
    const submitBtn = document.getElementById("submit-btn");
    const errorEl = document.getElementById("submit-error");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (getCart().length === 0) return;
      const lang = typeof getLang === "function" ? getLang() : "en";

      errorEl.style.display = "none";
      submitBtn.disabled = true;
      submitBtn.textContent = cartLabel("sending", lang);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          saveCart([]);
          window.location.href = "thank-you.html";
          return;
        }

        throw new Error("Submission failed");
      } catch (err) {
        errorEl.textContent = cartLabel("submitError", lang);
        errorEl.style.display = "block";
        submitBtn.disabled = false;
        submitBtn.textContent = cartLabel("submit", lang);
      }
    });
  }

  document.addEventListener("languagechange", renderCart);
});

/* Renders the full catalog on shop.html with category filters,
   quantity steppers, a dry/wet mode selector, and add-to-cart. */

const SHOP_LABELS = {
  configuration: { en: "Configuration", es: "Configuración" },
  color: { en: "Color", es: "Color" },
  size: { en: "Size", es: "Tamaño" },
  material: { en: "Material", es: "Material" },
  number: { en: "Number", es: "Número" },
  dry: { en: "Dry", es: "Seco" },
  wet: { en: "Wet", es: "Húmedo" },
  perRental: { en: " / per rental", es: " / por renta" },
  perCatering: { en: " / per catering", es: " / por catering" },
  available: { en: "available", es: "disponibles" },
  addToCart: { en: "Add to Cart", es: "Agregar al Carrito" },
  addedFlash: { en: "Added to cart ✓", es: "Agregado al carrito ✓" }
};

function shopLabel(key, lang) {
  return SHOP_LABELS[key][lang];
}

function priceUnitLabel(item, lang) {
  return shopLabel(item.category === "catering" ? "perCatering" : "perRental", lang);
}

function itemCardHTML(item, lang) {
  const name = translatedItemName(item.id, lang);
  const dims = translatedItemDims(item.id, lang);
  const desc = translatedItemDesc(item.id, lang);
  const details = translatedItemDetails(item.id, lang);
  const extras = translatedItemExtras(item.id, lang);
  const extrasLabel = lang === "es" ? "Extras" : "Extras";
  const colors = translatedColors(item, lang);

  const initialPrice = item.sizes
    ? item.sizes[0].price
    : item.materials
    ? item.materials[0].price
    : item.price;
  const priceDisplay = `${formatMoney(initialPrice)}<small>${priceUnitLabel(item, lang)}</small>`;

  const modeSelect = item.hasMode
    ? `<div class="item-mode">
         <label for="mode-${item.id}">${shopLabel("configuration", lang)}</label>
         <select id="mode-${item.id}" data-mode-select data-id="${item.id}">
           <option value="dry">${shopLabel("dry", lang)} — ${formatMoney(item.price)}</option>
           <option value="wet">${shopLabel("wet", lang)} — ${formatMoney(item.wetPrice)}</option>
         </select>
       </div>`
    : "";

  const colorSelect = item.colors
    ? `<div class="item-mode">
         <label for="color-${item.id}">${shopLabel("color", lang)}</label>
         <select id="color-${item.id}" data-color-select data-id="${item.id}">
           ${colors
             .map((c) => `<option value="${c.id}">${c.label} — ${c.detail}</option>`)
             .join("")}
         </select>
       </div>`
    : "";

  const sizeSelect = item.sizes
    ? `<div class="item-mode">
         <label for="size-${item.id}">${shopLabel("size", lang)}</label>
         <select id="size-${item.id}" data-size-select data-id="${item.id}">
           ${item.sizes
             .map(
               (s) =>
                 `<option value="${s.id}">${item.hideSizePrices ? s.label : `${s.label} — ${formatMoney(s.price)}`}</option>`
             )
             .join("")}
         </select>
       </div>`
    : "";

  const numberSelect = item.numbers
    ? `<div class="item-mode">
         <label for="number-${item.id}">${shopLabel("number", lang)}</label>
         <select id="number-${item.id}" data-number-select data-id="${item.id}">
           ${item.numbers.map((n) => `<option value="${n}">${n}</option>`).join("")}
         </select>
       </div>`
    : "";

  const materialSelect = item.materials
    ? `<div class="item-mode">
         <label for="material-${item.id}">${shopLabel("material", lang)}</label>
         <select id="material-${item.id}" data-material-select data-id="${item.id}">
           ${item.materials
             .map((m) => `<option value="${m.id}">${translatedMaterialLabel(item, m.id, lang)} — ${formatMoney(m.price)}</option>`)
             .join("")}
         </select>
       </div>`
    : "";

  return `
    <article class="item-card" data-id="${item.id}" data-category="${item.category}">
      <div class="item-icon">${item.icon}</div>
      <h3>${name}</h3>
      <p class="item-dims">${dims}</p>
      <p class="item-desc">${desc}</p>
      ${details ? `<ul class="item-details">${details.map((d) => `<li>${d}</li>`).join("")}</ul>` : ""}
      ${
        extras
          ? `<div class="item-extras">
               <strong>${extrasLabel}:</strong>
               <ul>
                 ${extras
                   .map(
                     (e, i) => `<li>
                       <label class="extra-option" for="extra-${item.id}-${i}">
                         <input type="checkbox" id="extra-${item.id}-${i}" data-extra-checkbox data-index="${i}" />
                         <span class="extra-name">${e.name}</span>
                         <span class="extra-price">+${formatMoney(e.price)}</span>
                       </label>
                     </li>`
                   )
                   .join("")}
               </ul>
             </div>`
          : ""
      }
      <span class="item-stock">${item.stock} ${shopLabel("available", lang)}</span>
      ${modeSelect}
      ${colorSelect}
      ${sizeSelect}
      ${materialSelect}
      ${numberSelect}
      <div class="item-price-row">
        <span class="item-price" data-price-display>${priceDisplay}</span>
        <div class="qty-stepper">
          <button type="button" data-qty-minus aria-label="Decrease quantity">−</button>
          <input type="text" inputmode="numeric" value="1" data-qty-input maxlength="3" />
          <button type="button" data-qty-plus aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="item-add-row">
        <button type="button" class="btn btn-primary" data-add-to-cart>${shopLabel("addToCart", lang)}</button>
      </div>
      <p class="added-flash" data-added-flash>${shopLabel("addedFlash", lang)}</p>
    </article>
  `;
}

function renderItems(filter) {
  const lang = typeof getLang === "function" ? getLang() : "en";
  const grid = document.getElementById("item-grid");
  const items =
    filter === "all"
      ? CATALOG.filter((i) => i.category !== "catering")
      : CATALOG.filter((i) => i.category === filter);
  grid.innerHTML = items.map((item) => itemCardHTML(item, lang)).join("");
  wireItemCards();
}

function currentFilter() {
  const active = document.querySelector(".filter-btn.active");
  return active ? active.dataset.filter : "all";
}

function wireItemCards() {
  const lang = typeof getLang === "function" ? getLang() : "en";

  document.querySelectorAll(".item-card").forEach((card) => {
    const id = card.dataset.id;
    const item = CATALOG.find((i) => i.id === id);
    const qtyInput = card.querySelector("[data-qty-input]");
    const priceDisplay = card.querySelector("[data-price-display]");
    const modeSelect = card.querySelector("[data-mode-select]");
    const colorSelect = card.querySelector("[data-color-select]");
    const sizeSelect = card.querySelector("[data-size-select]");
    const numberSelect = card.querySelector("[data-number-select]");
    const materialSelect = card.querySelector("[data-material-select]");
    const extraCheckboxes = card.querySelectorAll("[data-extra-checkbox]");
    const flash = card.querySelector("[data-added-flash]");

    const basePrice = () => {
      if (item.hasMode && modeSelect) {
        return modeSelect.value === "wet" ? item.wetPrice : item.price;
      }
      if (item.sizes && sizeSelect) {
        return item.sizes.find((s) => s.id === sizeSelect.value).price;
      }
      if (item.materials && materialSelect) {
        return item.materials.find((m) => m.id === materialSelect.value).price;
      }
      return item.price;
    };

    const extrasTotal = () => {
      if (!item.extras) return 0;
      let total = 0;
      extraCheckboxes.forEach((cb) => {
        if (cb.checked) total += item.extras[parseInt(cb.dataset.index, 10)].price;
      });
      return total;
    };

    const currentPrice = () => basePrice() + extrasTotal();

    const clampQty = (val) => {
      if (isNaN(val)) return 1;
      return Math.min(Math.max(val, 1), item.stock);
    };

    card.querySelector("[data-qty-minus]").addEventListener("click", () => {
      qtyInput.value = clampQty(parseInt(qtyInput.value, 10) - 1);
    });

    card.querySelector("[data-qty-plus]").addEventListener("click", () => {
      qtyInput.value = clampQty(parseInt(qtyInput.value, 10) + 1);
    });

    qtyInput.addEventListener("input", () => {
      qtyInput.value = qtyInput.value.replace(/\D/g, "").slice(0, 3);
    });

    qtyInput.addEventListener("blur", () => {
      qtyInput.value = clampQty(parseInt(qtyInput.value, 10));
    });

    const refreshPrice = () => {
      const price = currentPrice();
      priceDisplay.innerHTML = `${formatMoney(price)}<small>${priceUnitLabel(item, lang)}</small>`;
    };

    if (modeSelect) modeSelect.addEventListener("change", refreshPrice);
    if (sizeSelect) sizeSelect.addEventListener("change", refreshPrice);
    if (materialSelect) materialSelect.addEventListener("change", refreshPrice);
    extraCheckboxes.forEach((cb) => cb.addEventListener("change", refreshPrice));

    card.querySelector("[data-add-to-cart]").addEventListener("click", () => {
      const qty = clampQty(parseInt(qtyInput.value, 10));
      const currentLang = typeof getLang === "function" ? getLang() : "en";

      const variantParts = [];
      const labelPartsEn = [];
      const labelPartsEs = [];

      if (item.hasMode) {
        const mode = modeSelect.value;
        variantParts.push(mode);
        labelPartsEn.push(mode === "wet" ? "Wet" : "Dry");
        labelPartsEs.push(mode === "wet" ? "Húmedo" : "Seco");
      } else if (item.colors) {
        const color = item.colors.find((c) => c.id === colorSelect.value);
        const colorEs = translatedColors(item, "es").find((c) => c.id === colorSelect.value);
        variantParts.push(color.id);
        labelPartsEn.push(color.label);
        labelPartsEs.push(colorEs.label);
      } else if (item.sizes) {
        const size = item.sizes.find((s) => s.id === sizeSelect.value);
        variantParts.push(size.id);
        labelPartsEn.push(size.label);
        labelPartsEs.push(size.label);
      }

      if (item.materials) {
        const material = item.materials.find((m) => m.id === materialSelect.value);
        variantParts.push(material.id);
        labelPartsEn.push(material.label);
        labelPartsEs.push(translatedMaterialLabel(item, material.id, "es"));
      }

      if (item.numbers) {
        const number = numberSelect.value;
        variantParts.push(number);
        labelPartsEn.push(`#${number}`);
        labelPartsEs.push(`#${number}`);
      }

      if (item.extras) {
        const extrasEs = translatedItemExtras(item.id, "es");
        extraCheckboxes.forEach((cb) => {
          if (!cb.checked) return;
          const idx = parseInt(cb.dataset.index, 10);
          variantParts.push(`extra${idx}`);
          labelPartsEn.push(`+${item.extras[idx].name}`);
          labelPartsEs.push(`+${extrasEs[idx].name}`);
        });
      }

      const variant = variantParts.length ? variantParts.join("-") : undefined;
      const name = labelPartsEn.length ? `${item.name} (${labelPartsEn.join(", ")})` : item.name;
      const nameEs = labelPartsEs.length
        ? `${translatedItemName(item.id, "es")} (${labelPartsEs.join(", ")})`
        : translatedItemName(item.id, "es");

      addToCart(
        {
          id: item.id,
          name,
          nameEs,
          dims: item.dims,
          dimsEs: translatedItemDims(item.id, "es"),
          price: currentPrice(),
          variant
        },
        qty
      );
      const original = flash.textContent;
      flash.textContent = shopLabel("addedFlash", currentLang);
      flash.classList.add("show");
      setTimeout(() => {
        flash.classList.remove("show");
        flash.textContent = original;
      }, 1500);
      qtyInput.value = 1;
    });
  });
}

function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderItems(btn.dataset.filter);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const initialFilter = params.get("category") || "all";

  initFilters();
  const matchingBtn = document.querySelector(`.filter-btn[data-filter="${initialFilter}"]`);
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  (matchingBtn || document.querySelector('.filter-btn[data-filter="all"]')).classList.add("active");
  renderItems(initialFilter);
});

document.addEventListener("languagechange", () => {
  if (document.getElementById("item-grid")) renderItems(currentFilter());
});

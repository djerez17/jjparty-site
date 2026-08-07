/* Renders promo bundles and category shortcuts on index.html. */

function bundleRegularPrice(bundle, tableOptionId) {
  const base = bundle.items.reduce((sum, entry) => {
    const item = CATALOG.find((i) => i.id === entry.id);
    const price = entry.mode === "wet" ? item.wetPrice : item.price;
    return sum + price * entry.qty;
  }, 0);
  if (!bundle.tableOptions) return base;
  const chosen = bundle.tableOptions.find((opt) => opt.id === tableOptionId) || bundle.tableOptions[0];
  const tableItem = CATALOG.find((i) => i.id === chosen.id);
  return base + tableItem.price * chosen.qty;
}

function bundleCateringItem(bundle) {
  return bundle.items
    .map((entry) => CATALOG.find((i) => i.id === entry.id))
    .find((i) => i && i.category === "catering" && i.extras);
}

function bundleItemLabel(entry) {
  const lang = typeof getLang === "function" ? getLang() : "en";
  const name = translatedItemName(entry.id, lang);
  const modeLabel = entry.mode ? ` (${entry.mode === "wet" ? (lang === "es" ? "Húmedo" : "Wet") : (lang === "es" ? "Seco" : "Dry")})` : "";
  let label = `${entry.qty} × ${name}${modeLabel}`;
  if (entry.altId) {
    const altName = translatedItemName(entry.altId, lang);
    label += ` ${lang === "es" ? "o" : "or"} ${entry.altQty} × ${altName}`;
  }
  return label;
}

function bundleCardHTML(bundle) {
  const lang = typeof getLang === "function" ? getLang() : "en";
  const defaultTableId = bundle.tableOptions ? bundle.tableOptions[0].id : null;
  const regular = bundle.discount ? bundle.price + bundle.discount : bundleRegularPrice(bundle, defaultTableId);
  const savings = regular - bundle.price;
  const i18n = BUNDLE_I18N[bundle.id];
  const name = lang === "es" && i18n ? i18n.name : bundle.name;
  const tag = lang === "es" && i18n ? i18n.tag : bundle.tag;
  const note = lang === "es" && i18n && i18n.note ? i18n.note : bundle.note;
  const addLabel = lang === "es" ? "Agregar Paquete al Carrito" : "Add Bundle to Cart";
  const chooseLabel = lang === "es" ? "Elige tus mesas:" : "Choose your tables:";
  const extrasLabel = lang === "es" ? "Extras Opcionales" : "Optional Extras";
  const cateringItem = bundleCateringItem(bundle);
  const extras = cateringItem ? translatedItemExtras(cateringItem.id, lang) : null;
  return `
    <div class="bundle-card" data-bundle-id="${bundle.id}">
      ${tag ? `<span class="bundle-tag">${tag}</span>` : ""}
      <h3>${name}</h3>
      ${bundle.guests ? `<span class="bundle-guests">${lang === "es" ? `Sirve hasta ${bundle.guests} invitados` : `Serves up to ${bundle.guests} guests`}</span>` : ""}
      <div class="bundle-price-row">
        <span class="bundle-price">${formatMoney(bundle.price)}</span>
        <span class="bundle-price-old" ${savings > 0 ? "" : 'style="display:none"'}>${formatMoney(regular)}</span>
      </div>
      <ul class="bundle-items">
        ${bundle.items.map((entry) => `<li>${bundleItemLabel(entry)}</li>`).join("")}
        ${bundle.tableOptions ? `<li class="bundle-table-item">${bundle.tableOptions[0].label}</li>` : ""}
      </ul>
      ${note ? `<p class="bundle-note">${note}</p>` : ""}
      ${bundle.tableOptions ? `
        <label class="bundle-table-label">
          ${chooseLabel}
          <select class="bundle-table-select" data-bundle-id="${bundle.id}">
            ${bundle.tableOptions.map((opt) => `<option value="${opt.id}">${opt.label}</option>`).join("")}
          </select>
        </label>
      ` : ""}
      ${
        extras
          ? `<div class="bundle-extras">
               <strong>${extrasLabel}:</strong>
               <ul>
                 ${extras
                   .map(
                     (e, i) => `<li>
                       <label class="extra-option" for="bundle-extra-${bundle.id}-${i}">
                         <input type="checkbox" id="bundle-extra-${bundle.id}-${i}" data-bundle-extra-checkbox data-index="${i}" />
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
      <button type="button" class="btn btn-primary btn-block" data-add-bundle="${bundle.id}">
        ${addLabel}
      </button>
    </div>
  `;
}

function categoryCardHTML(cat) {
  const lang = typeof getLang === "function" ? getLang() : "en";
  const i18n = CATEGORY_I18N[cat.id];
  const label = lang === "es" && i18n ? i18n.label : cat.label;
  const blurb = lang === "es" && i18n ? i18n.blurb : cat.blurb;
  return `
    <a class="cat-card" href="shop.html?category=${cat.id}">
      <span class="cat-icon">${cat.icon}</span>
      <span>
        <strong>${label}</strong>
        <span>${blurb}</span>
      </span>
    </a>
  `;
}

function addBundleToCart(bundle, tableOptionId, extraIndexes) {
  const entries = bundle.items.slice();
  if (bundle.tableOptions) {
    const chosen = bundle.tableOptions.find((opt) => opt.id === tableOptionId) || bundle.tableOptions[0];
    entries.push({ id: chosen.id, qty: chosen.qty });
  }
  entries.forEach((entry) => {
    const item = CATALOG.find((i) => i.id === entry.id);
    const price = entry.mode === "wet" ? item.wetPrice : item.price;
    const modeLabelEn = entry.mode ? ` (${entry.mode === "wet" ? "Wet" : "Dry"})` : "";
    const modeLabelEs = entry.mode ? ` (${entry.mode === "wet" ? "Húmedo" : "Seco"})` : "";
    const name = `${item.name}${modeLabelEn}`;
    const nameEs = `${translatedItemName(item.id, "es")}${modeLabelEs}`;
    addToCart(
      {
        id: item.id,
        name,
        nameEs,
        dims: item.dims,
        dimsEs: translatedItemDims(item.id, "es"),
        price,
        variant: entry.mode
      },
      entry.qty
    );
  });

  const cateringItem = bundleCateringItem(bundle);
  if (cateringItem && extraIndexes && extraIndexes.length) {
    const extrasEs = translatedItemExtras(cateringItem.id, "es");
    extraIndexes.forEach((idx) => {
      const extra = cateringItem.extras[idx];
      const extraEs = extrasEs[idx];
      addToCart(
        {
          id: `${cateringItem.id}-extra-${idx}`,
          name: extra.name,
          nameEs: extraEs.name,
          dims: "",
          dimsEs: "",
          price: extra.price
        },
        1
      );
    });
  }
}

function renderBundlesAndCategories() {
  const bundleGrid = document.getElementById("bundle-grid");
  if (bundleGrid) {
    bundleGrid.innerHTML = BUNDLES.map(bundleCardHTML).join("");
    bundleGrid.querySelectorAll(".bundle-table-select").forEach((select) => {
      select.addEventListener("change", () => {
        const bundle = BUNDLES.find((b) => b.id === select.dataset.bundleId);
        const card = select.closest(".bundle-card");
        const chosen = bundle.tableOptions.find((opt) => opt.id === select.value);
        card.querySelector(".bundle-table-item").textContent = `${chosen.qty} × ${chosen.label}`;
        const regular = bundleRegularPrice(bundle, select.value);
        const savings = regular - bundle.price;
        const oldPriceEl = card.querySelector(".bundle-price-old");
        oldPriceEl.textContent = formatMoney(regular);
        oldPriceEl.style.display = savings > 0 ? "" : "none";
      });
    });
    bundleGrid.querySelectorAll("[data-add-bundle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bundle = BUNDLES.find((b) => b.id === btn.dataset.addBundle);
        const card = btn.closest(".bundle-card");
        const select = card.querySelector(".bundle-table-select");
        const extraCheckboxes = card.querySelectorAll("[data-bundle-extra-checkbox]:checked");
        const extraIndexes = Array.from(extraCheckboxes).map((cb) => parseInt(cb.dataset.index, 10));
        addBundleToCart(bundle, select ? select.value : null, extraIndexes);
        card.querySelectorAll("[data-bundle-extra-checkbox]").forEach((cb) => (cb.checked = false));
        const lang = typeof getLang === "function" ? getLang() : "en";
        const original = btn.textContent;
        btn.textContent = lang === "es" ? "Agregado ✓" : "Added ✓";
        setTimeout(() => {
          btn.textContent = original;
        }, 1500);
      });
    });
  }

  const catGrid = document.getElementById("cat-grid");
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(categoryCardHTML).join("");
  }
}

document.addEventListener("DOMContentLoaded", renderBundlesAndCategories);
document.addEventListener("languagechange", renderBundlesAndCategories);

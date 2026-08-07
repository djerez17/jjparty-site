/* Renders the taco catering packages on catering.html. */

function renderCateringItems() {
  const lang = typeof getLang === "function" ? getLang() : "en";
  const grid = document.getElementById("catering-grid");
  if (!grid) return;
  const items = CATALOG.filter((i) => i.category === "catering");
  grid.innerHTML = items.map((item) => itemCardHTML(item, lang)).join("");
  wireItemCards();
}

document.addEventListener("DOMContentLoaded", renderCateringItems);
document.addEventListener("languagechange", renderCateringItems);

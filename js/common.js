/* Shared cart storage + nav behavior, loaded on every page. */

const CART_KEY = "jjCart";

function formatMoney(n) {
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;
}

function cartLineKey(id, variant) {
  return variant ? `${id}__${variant}` : id;
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const cart = raw ? JSON.parse(raw) : [];
    return cart
      .filter((line) => line && line.id)
      .map((line) => ({ ...line, key: line.key || cartLineKey(line.id, line.variant) }));
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart({ id, name, nameEs, dims, dimsEs, price, variant }, qty) {
  if (qty < 1) return;
  const cart = getCart();
  const key = cartLineKey(id, variant);
  const existing = cart.find((line) => line.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ key, id, name, nameEs, dims, dimsEs, price, qty });
  }
  saveCart(cart);
}

function removeFromCart(key) {
  saveCart(getCart().filter((line) => line.key !== key));
}

function updateCartQty(key, qty) {
  const cart = getCart();
  const line = cart.find((l) => l.key === key);
  if (!line) return;
  if (qty < 1) {
    removeFromCart(key);
    return;
  }
  line.qty = qty;
  saveCart(cart);
}

function cartTotal(cart) {
  return cart.reduce((sum, line) => sum + line.price * line.qty, 0);
}

function cartCount(cart) {
  return cart.reduce((sum, line) => sum + line.qty, 0);
}

function updateCartBadge() {
  const count = cartCount(getCart());
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
  });
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

function highlightActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initNavToggle();
  highlightActiveNav();
});

/**
 * SOKO Online Shop - Cart & Storefront Controller
 * LocalStorage persistent cart state management for Issue #7.
 */

const STORAGE_KEY = "soko_cart_v2";

// --- CART STATE MANAGEMENT (LOCALSTORAGE PERSISTENCE) ---

function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateHeaderCartBadge();
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
}

function addToCart(productId, quantity = 1) {
  const products = window.SOKO_PRODUCTS || [];
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.error("Product not found!", productId);
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`Added "${product.name}" to your cart!`, "success");
}

function updateQuantity(productId, newQty) {
  newQty = parseInt(newQty, 10);
  if (isNaN(newQty) || newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
    if (typeof renderCartPage === "function") renderCartPage();
    if (typeof renderCheckoutPage === "function") renderCheckoutPage();
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  if (item) {
    showToast(`Removed "${item.name}" from cart.`, "info");
  }
  if (typeof renderCartPage === "function") renderCartPage();
  if (typeof renderCheckoutPage === "function") renderCheckoutPage();
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
  updateHeaderCartBadge();
  if (typeof renderCartPage === "function") renderCartPage();
  if (typeof renderCheckoutPage === "function") renderCheckoutPage();
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// --- UI HELPER NOTIFICATIONS ---

function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("toast-show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateHeaderCartBadge() {
  const badgeElements = document.querySelectorAll(".cart-badge-count");
  const count = getCartCount();
  badgeElements.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  });
}

// --- DOM INITIALIZATION ---

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderCartBadge();
});

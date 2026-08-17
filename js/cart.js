/**
 * SOKO Online Shop - Cart & Storefront Controller
 * In-memory shopping cart state management & UI interactions for Issue #6.
 */

// In-memory cart array
let cart = [];

// --- CART STATE MANAGEMENT ---

function getCart() {
  return cart;
}

function addToCart(productId, quantity = 1) {
  const products = window.SOKO_PRODUCTS || [];
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.error("Product not found!", productId);
    return;
  }

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

  updateHeaderCartBadge();
  showToast(`Added "${product.name}" to your cart!`, "success");
}

function updateQuantity(productId, newQty) {
  newQty = parseInt(newQty, 10);
  if (isNaN(newQty) || newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    updateHeaderCartBadge();
    if (typeof renderCartPage === "function") renderCartPage();
    if (typeof renderCheckoutPage === "function") renderCheckoutPage();
  }
}

function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(i => i.id !== productId);
  updateHeaderCartBadge();
  if (item) {
    showToast(`Removed "${item.name}" from cart.`, "info");
  }
  if (typeof renderCartPage === "function") renderCartPage();
  if (typeof renderCheckoutPage === "function") renderCheckoutPage();
}

function clearCart() {
  cart = [];
  updateHeaderCartBadge();
  if (typeof renderCartPage === "function") renderCartPage();
  if (typeof renderCheckoutPage === "function") renderCheckoutPage();
}

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
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

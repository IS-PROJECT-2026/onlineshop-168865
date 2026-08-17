/**
 * SOKO Online Shop - Cart & Storefront Controller
 * Manages shopping cart state in localStorage and handles UI interactions.
 */

const STORAGE_KEY = "soko_cart_v1";

// --- CART STATE MANAGEMENT ---

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
    showToast("Product not found!", "error");
    return;
  }

  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
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
  let cart = getCart();
  newQty = parseInt(newQty, 10);
  if (isNaN(newQty) || newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
    renderCartPage();
    renderCheckoutPage();
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
  renderCartPage();
  renderCheckoutPage();
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
  updateHeaderCartBadge();
  renderCartPage();
  renderCheckoutPage();
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

// --- INDEX STOREFRONT RENDERER ---

let currentCategory = "all";
let currentSearch = "";
let currentSort = "featured";

function renderProductsGrid() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const products = window.SOKO_PRODUCTS || [];
  let filtered = products.filter(product => {
    const matchesCategory = currentCategory === "all" || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(currentSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalog">
        <div class="empty-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try resetting your search filters or browse other categories.</p>
        <button class="btn btn-secondary" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <button class="quick-view-btn" onclick="openQuickView('${product.id}')" title="Quick View">
          👁 Quick View
        </button>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="product-category">${product.category.toUpperCase()}</span>
          <span class="product-rating">★ ${product.rating} (${product.reviewsCount})</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <div class="price-box">
            <span class="price-current">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ""}
          </div>
          <button class="btn btn-primary add-to-cart-btn" onclick="addToCart('${product.id}')">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function resetFilters() {
  currentCategory = "all";
  currentSearch = "";
  currentSort = "featured";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.value = "featured";

  document.querySelectorAll(".category-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === "all");
  });

  renderProductsGrid();
}

function openQuickView(productId) {
  const products = window.SOKO_PRODUCTS || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let modal = document.getElementById("quick-view-modal");
  if (!modal) return;

  const modalBody = modal.querySelector(".modal-body");
  modalBody.innerHTML = `
    <div class="quickview-container">
      <div class="quickview-image-col">
        <img src="${product.image}" alt="${product.name}" class="quickview-img" />
      </div>
      <div class="quickview-info-col">
        <span class="product-category">${product.category.toUpperCase()}</span>
        <h2>${product.name}</h2>
        <div class="quickview-rating">
          <span class="stars">★★★★★</span>
          <span>${product.rating} out of 5 (${product.reviewsCount} verified reviews)</span>
        </div>
        <div class="quickview-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ""}
        </div>
        <p class="quickview-desc">${product.description}</p>
        <div class="quickview-qty-group">
          <label>Quantity:</label>
          <div class="qty-picker">
            <button class="qty-btn" onclick="changeQuickViewQty(-1)">-</button>
            <input type="number" id="quickview-qty" value="1" min="1" max="10" readonly />
            <button class="qty-btn" onclick="changeQuickViewQty(1)">+</button>
          </div>
        </div>
        <button class="btn btn-primary btn-large" onclick="submitQuickViewCart('${product.id}')">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function changeQuickViewQty(delta) {
  const input = document.getElementById("quickview-qty");
  if (input) {
    let val = parseInt(input.value, 10) + delta;
    if (val >= 1 && val <= 10) {
      input.value = val;
    }
  }
}

function submitQuickViewCart(productId) {
  const input = document.getElementById("quickview-qty");
  const qty = input ? parseInt(input.value, 10) : 1;
  addToCart(productId, qty);
  closeQuickView();
}

function closeQuickView() {
  const modal = document.getElementById("quickview-modal");
  if (modal) modal.classList.remove("open");
}

// --- CART PAGE RENDERER ---

let promoDiscountRate = 0;

function renderCartPage() {
  const cartList = document.getElementById("cart-items-list");
  const summaryBox = document.getElementById("cart-summary-box");
  if (!cartList) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="empty-cart-view">
        <div class="empty-cart-icon">🛒</div>
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <a href="index.html" class="btn btn-primary">Explore Products</a>
      </div>
    `;
    if (summaryBox) summaryBox.style.display = "none";
    return;
  }

  if (summaryBox) summaryBox.style.display = "block";

  cartList.innerHTML = cart.map(item => {
    const itemSubtotal = item.price * item.quantity;
    return `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <span class="product-category">${item.category.toUpperCase()}</span>
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">$${item.price.toFixed(2)} each</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-subtotal">
          $${itemSubtotal.toFixed(2)}
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove item">
          🗑
        </button>
      </div>
    `;
  }).join("");

  // Update summary counts
  const subtotal = getCartSubtotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = subtotal * promoDiscountRate;
  const total = Math.max(0, subtotal + shipping + tax - discount);

  const elemSubtotal = document.getElementById("summary-subtotal");
  const elemShipping = document.getElementById("summary-shipping");
  const elemTax = document.getElementById("summary-tax");
  const elemDiscount = document.getElementById("summary-discount");
  const elemTotal = document.getElementById("summary-total");

  if (elemSubtotal) elemSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (elemShipping) elemShipping.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  if (elemTax) elemTax.textContent = `$${tax.toFixed(2)}`;
  if (elemDiscount) elemDiscount.textContent = `-$${discount.toFixed(2)}`;
  if (elemTotal) elemTotal.textContent = `$${total.toFixed(2)}`;
}

function applyPromoCode() {
  const codeInput = document.getElementById("promo-code-input");
  if (!codeInput) return;
  const code = codeInput.value.trim().toUpperCase();
  if (code === "SOKO10") {
    promoDiscountRate = 0.10; // 10% off
    showToast("Promo code applied: 10% Discount!", "success");
  } else if (code === "SOKO20") {
    promoDiscountRate = 0.20; // 20% off
    showToast("Promo code applied: 20% Discount!", "success");
  } else {
    showToast("Invalid promo code. Try SOKO10 or SOKO20", "error");
    promoDiscountRate = 0;
  }
  renderCartPage();
}

// --- CHECKOUT PAGE RENDERER ---

function renderCheckoutPage() {
  const checkoutList = document.getElementById("checkout-items-summary");
  if (!checkoutList) return;

  const cart = getCart();
  if (cart.length === 0) {
    checkoutList.innerHTML = `<p class="empty-msg">Your cart is empty. <a href="index.html">Return to Shop</a></p>`;
    return;
  }

  checkoutList.innerHTML = cart.map(item => `
    <div class="checkout-item-row">
      <img src="${item.image}" alt="${item.name}" />
      <div class="checkout-item-info">
        <h5>${item.name}</h5>
        <span>Qty: ${item.quantity} × $${item.price.toFixed(2)}</span>
      </div>
      <span class="checkout-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join("");

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const elemSubtotal = document.getElementById("checkout-subtotal");
  const elemShipping = document.getElementById("checkout-shipping");
  const elemTax = document.getElementById("checkout-tax");
  const elemTotal = document.getElementById("checkout-total");

  if (elemSubtotal) elemSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (elemShipping) elemShipping.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  if (elemTax) elemTax.textContent = `$${tax.toFixed(2)}`;
  if (elemTotal) elemTotal.textContent = `$${total.toFixed(2)}`;
}

function processCheckout(event) {
  event.preventDefault();
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }

  const orderNum = "SOKO-" + Math.floor(100000 + Math.random() * 900000);
  const confirmModal = document.getElementById("order-confirmation-modal");

  if (confirmModal) {
    document.getElementById("order-ref-number").textContent = orderNum;
    confirmModal.classList.add("open");
  } else {
    alert(`Order Placed Successfully! Your Reference Number is ${orderNum}`);
  }

  clearCart();
}

// --- DOM INITIALIZATION ---

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderCartBadge();

  // Index catalog handlers
  if (document.getElementById("products-grid")) {
    renderProductsGrid();

    // Category Tabs
    document.querySelectorAll(".category-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentCategory = tab.dataset.category;
        renderProductsGrid();
      });
    });

    // Search input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value;
        renderProductsGrid();
      });
    }

    // Sort select
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        renderProductsGrid();
      });
    }
  }

  // Cart page initialization
  if (document.getElementById("cart-items-list")) {
    renderCartPage();
  }

  // Checkout page initialization
  if (document.getElementById("checkout-items-summary")) {
    renderCheckoutPage();
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", processCheckout);
    }
  }
});

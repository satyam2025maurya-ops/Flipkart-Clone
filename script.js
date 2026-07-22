/* =
   PRODUCT DATA
   (emoji used as placeholder "images" — I will swap them with real <img> src later)
= */
const PRODUCTS = [
  { id: 1,  title: "Galaxy Note Pro 5G, 8GB RAM, 128GB Storage", cat: "mobiles",      emoji: "📱", price: 18999, mrp: 27999, rating: 4.3, reviews: "12,483", assured: true },
  { id: 2,  title: "Wireless Bluetooth Earbuds with ANC",         cat: "electronics",  emoji: "🎧", price: 1499,  mrp: 3999,  rating: 4.1, reviews: "8,921",  assured: true },
  { id: 3,  title: "Men's Slim Fit Casual Cotton Shirt",          cat: "fashion",      emoji: "🥼", price: 599,   mrp: 1499,  rating: 4.0, reviews: "3,204",  assured: false },
  { id: 4,  title: "Ergonomic Office Chair with Lumbar Support",  cat: "home",         emoji: "🪑", price: 5999,  mrp: 11999, rating: 4.2, reviews: "1,876",  assured: true },
  { id: 5,  title: "4K Smart LED TV 55 inch",                     cat: "electronics",  emoji: "📺", price: 34999, mrp: 54999, rating: 4.4, reviews: "6,542",  assured: true },
  { id: 6,  title: "Women's Ethnic Printed Kurta Set",            cat: "fashion",      emoji: "👗", price: 899,   mrp: 2299,  rating: 3.9, reviews: "2,110",  assured: false },
  { id: 7,  title: "Double Door Refrigerator 340L Frost Free",    cat: "appliances",   emoji: "🧊", price: 24999, mrp: 36999, rating: 4.3, reviews: "4,332",  assured: true },
  { id: 8,  title: "Front Load Washing Machine 7kg",              cat: "appliances",   emoji: "🌀", price: 21999, mrp: 32999, rating: 4.1, reviews: "2,987",  assured: true },
  { id: 9,  title: "Running Shoes - Lightweight Mesh",             cat: "fashion",      emoji: "👟", price: 1299,  mrp: 2999,  rating: 4.2, reviews: "9,845",  assured: false },
  { id: 10, title: "Laptop Backpack Water Resistant 35L",         cat: "fashion",      emoji: "🎒", price: 799,   mrp: 1999,  rating: 4.0, reviews: "5,102",  assured: false },
  { id: 11, title: "Smartwatch with Heart Rate Monitor",          cat: "electronics",  emoji: "⌚", price: 1999,  mrp: 4999,  rating: 4.1, reviews: "7,654",  assured: true },
  { id: 12, title: "Non-Stick Cookware Set (5 Pieces)",           cat: "home",         emoji: "🍳", price: 1499,  mrp: 3299,  rating: 4.3, reviews: "3,876",  assured: false },
  { id: 13, title: "Face Moisturizer with SPF 30",                cat: "beauty",       emoji: "🧴", price: 349,   mrp: 699,   rating: 4.0, reviews: "2,543",  assured: false },
  { id: 14, title: "Herbal Shampoo & Conditioner Combo",          cat: "beauty",       emoji: "🧪", price: 299,   mrp: 599,   rating: 3.8, reviews: "1,432",  assured: false },
  { id: 15, title: "Basmati Rice 5kg Premium Pack",               cat: "grocery",      emoji: "🍚", price: 449,   mrp: 599,   rating: 4.4, reviews: "982",    assured: false },
  { id: 16, title: "Cold Pressed Extra Virgin Olive Oil 1L",      cat: "grocery",      emoji: "🧴", price: 599,   mrp: 899,   rating: 4.2, reviews: "764",    assured: false },
  { id: 17, title: "Gaming Laptop 16GB RAM RTX Graphics",         cat: "electronics",  emoji: "💻", price: 74999, mrp: 99999, rating: 4.5, reviews: "3,221",  assured: true },
  { id: 18, title: "Bluetooth Party Speaker 50W",                 cat: "electronics",  emoji: "🔊", price: 2499,  mrp: 5999,  rating: 4.0, reviews: "4,567",  assured: true },
  { id: 19, title: "3-Seater Fabric Sofa",                        cat: "home",         emoji: "🛋️", price: 15999, mrp: 25999, rating: 4.1, reviews: "654",    assured: true },
  { id: 20, title: "Kids Study Table with Chair",                 cat: "home",         emoji: "🪛", price: 3499,  mrp: 5999,  rating: 4.0, reviews: "432",    assured: false },
  { id: 21, title: "Formal Leather Belt for Men",                 cat: "fashion",      emoji: "👖", price: 399,   mrp: 999,   rating: 3.9, reviews: "1,209",  assured: false },
  { id: 22, title: "Flagship Phone 12GB RAM 256GB",               cat: "mobiles",      emoji: "📲", price: 42999, mrp: 59999, rating: 4.4, reviews: "15,332", assured: true },
  { id: 23, title: "Budget Smartphone 4GB RAM 64GB",              cat: "mobiles",      emoji: "📞", price: 8999,  mrp: 12999, rating: 4.0, reviews: "6,789",  assured: false },
  { id: 24, title: "Microwave Oven 20L Convection",                cat: "appliances",   emoji: "🍽️", price: 6999,  mrp: 10999, rating: 4.2, reviews: "1,998",  assured: true },
];
const DEAL_IDS = [5, 17, 22, 7, 19, 2];
/* =
   STATE
= */
let cart = {};          // { productId: qty }
let activeCategory = "all";
let searchQuery = "";
/* =
   DOM REFS
= */
const productGrid   = document.getElementById("productGrid");
const dealsRow       = document.getElementById("dealsRow");
const gridTitle      = document.getElementById("gridTitle");
const resultCount    = document.getElementById("resultCount");
const cartCount      = document.getElementById("cartCount");
const drawerCartCount= document.getElementById("drawerCartCount");
const cartItemsList  = document.getElementById("cartItemsList");
const cartEmptyMsg   = document.getElementById("cartEmptyMsg");
const cartTotalEl    = document.getElementById("cartTotal");
const cartDrawer     = document.getElementById("cartDrawer");
const cartOverlay    = document.getElementById("cartOverlay");
const toast          = document.getElementById("toast");
const searchInput    = document.getElementById("searchInput");
/* =
   RENDER: PRODUCT CARD
=*/
function formatINR(n) {
  return "₹" + n.toLocaleString("en-IN");
}
function discountPct(price, mrp) {
  return Math.round(((mrp - price) / mrp) * 100);
}
function createProductCard(p) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.id = p.id;

  const inCart = !!cart[p.id];

  card.innerHTML = `
    ${p.assured ? '<span class="assured-badge">ASSURED</span>' : ''}
    <div class="product-img-wrap">${p.emoji}</div>
    <div class="product-title">${p.title}</div>
    <div class="rating-badge">${p.rating.toFixed(1)} ★ <span style="opacity:.85">(${p.reviews})</span></div>
    <div class="price-row">
      <span class="price-now">${formatINR(p.price)}</span>
      <span class="price-old">${formatINR(p.mrp)}</span>
      <span class="price-off">${discountPct(p.price, p.mrp)}% off</span>
    </div>
    <div class="free-delivery">Free delivery</div>
    <button class="add-cart-btn ${inCart ? 'added' : ''}" data-id="${p.id}">
      ${inCart ? 'Added ✓' : 'Add to Cart'}
    </button>
  `;
  return card;
}

function renderGrid(list) {
  productGrid.innerHTML = "";
  if (list.length === 0) {
    productGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#878787;padding:40px 0;">
      No products found. Try a different search or category.</p>`;
    return;
  }
  list.forEach(p => productGrid.appendChild(createProductCard(p)));
}

function renderDeals() {
  dealsRow.innerHTML = "";
  DEAL_IDS.forEach(id => {
    const p = PRODUCTS.find(pr => pr.id === id);
    if (p) dealsRow.appendChild(createProductCard(p));
  });
}

/* =
   FILTER + SEARCH LOGIC
= */
function applyFilters() {
  let list = PRODUCTS;

  if (activeCategory !== "all") {
    list = list.filter(p => p.cat === activeCategory);
  }

  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => p.title.toLowerCase().includes(q));
  }

  renderGrid(list);

  if (searchQuery.trim() !== "") {
    gridTitle.textContent = `Results for "${searchQuery}"`;
    resultCount.textContent = `${list.length} item${list.length !== 1 ? 's' : ''} found`;
  } else if (activeCategory !== "all") {
    gridTitle.textContent = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
    resultCount.textContent = `${list.length} item${list.length !== 1 ? 's' : ''}`;
  } else {
    gridTitle.textContent = "Recommended for You";
    resultCount.textContent = "";
  }
}

/* Category buttons */
document.getElementById("categoryStrip").addEventListener("click", (e) => {
  const btn = e.target.closest(".cat-btn");
  if (!btn) return;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.cat;
  applyFilters();
  window.scrollTo({ top: document.querySelector(".section-block:nth-of-type(2)").offsetTop - 100, behavior: "smooth" });
});

/* Search */
function doSearch() {
  searchQuery = searchInput.value;
  applyFilters();
}
document.getElementById("searchBtn").addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});
searchInput.addEventListener("input", () => {
  // live search as user types
  searchQuery = searchInput.value;
  applyFilters();
});

/* =
   CART LOGIC
= */
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  showToast("Added to cart");
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
}

function getCartTotalItems() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function getCartTotalPrice() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(pr => pr.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

function renderCartDrawer() {
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    cartItemsList.innerHTML = `<p class="cart-empty" id="cartEmptyMsg">Your cart is empty. Add items to get started!</p>`;
    cartTotalEl.textContent = formatINR(0);
    return;
  }

  cartItemsList.innerHTML = "";
  entries.forEach(([id, qty]) => {
    const p = PRODUCTS.find(pr => pr.id === Number(id));
    if (!p) return;
    const line = document.createElement("div");
    line.className = "cart-line";
    line.innerHTML = `
      <div class="cart-line-img">${p.emoji}</div>
      <div class="cart-line-info">
        <div class="cart-line-title">${p.title}</div>
        <div class="cart-line-price">${formatINR(p.price * qty)}</div>
        <div class="qty-control">
          <button data-action="dec" data-id="${p.id}">−</button>
          <span>${qty}</span>
          <button data-action="inc" data-id="${p.id}">+</button>
        </div>
        <div class="remove-line" data-action="remove" data-id="${p.id}">Remove</div>
      </div>
    `;
    cartItemsList.appendChild(line);
  });

  cartTotalEl.textContent = formatINR(getCartTotalPrice());
}

function updateCartUI() {
  const totalItems = getCartTotalItems();
  cartCount.textContent = totalItems;
  drawerCartCount.textContent = totalItems;
  renderCartDrawer();

  // refresh "Added ✓" state on visible product cards
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    const id = Number(btn.dataset.id);
    if (cart[id]) {
      btn.classList.add("added");
      btn.textContent = "Added ✓";
    } else {
      btn.classList.remove("added");
      btn.textContent = "Add to Cart";
    }
  });
}

/* Delegated click handling: product grid / deals row / cart drawer */
document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-cart-btn");
  if (addBtn) {
    addToCart(Number(addBtn.dataset.id));
    return;
  }

  const qtyBtn = e.target.closest("[data-action]");
  if (qtyBtn) {
    const id = Number(qtyBtn.dataset.id);
    const action = qtyBtn.dataset.action;
    if (action === "inc") changeQty(id, 1);
    if (action === "dec") changeQty(id, -1);
    if (action === "remove") removeFromCart(id);
    return;
  }
});

/* =
   CART DRAWER OPEN/CLOSE
= */
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}
function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}
document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);

document.getElementById("placeOrderBtn").addEventListener("click", () => {
  if (getCartTotalItems() === 0) {
    showToast("Your cart is empty");
    return;
  }
  showToast("Order placed successfully! 🎉");
  cart = {};
  updateCartUI();
  closeCartDrawer();
});

/* =
   TOAST
=*/
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

/* =
   LOGIN BUTTON (placeholder)
= */
document.getElementById("loginBtn").addEventListener("click", () => {
  showToast("Login flow not implemented in this demo");
});

document.getElementById("logoHome").addEventListener("click", () => {
  activeCategory = "all";
  searchQuery = "";
  searchInput.value = "";
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  document.querySelector('.cat-btn[data-cat="all"]').classList.add("active");
  applyFilters();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =
   HERO CAROUSEL
=*/
const heroSlides = [
  { eyebrow: "BIG SAVINGS DAYS", title: "Up to 80% off", sub: "On Electronics, Fashion & more "},
  { eyebrow: "MOBILE FEST", title: "Best deals on smartphones", sub: "Exchange offers available" },
  { eyebrow: "FASHION SALE", title: "Min 50% off", sub: "Top brands, new arrivals" },
  { eyebrow: "HOME ESSENTIALS", title: "Furnish your home", sub: "EMI options from ₹499/month" },
];
let heroIndex = 0;
const heroEyebrow = document.getElementById("heroEyebrow");
const heroTitle   = document.getElementById("heroTitle");
const heroSub     = document.getElementById("heroSub");
const heroDots    = document.getElementById("heroDots");

function renderHeroDots() {
  heroDots.innerHTML = "";
  heroSlides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === heroIndex) dot.classList.add("active");
    heroDots.appendChild(dot);
  });
}

function showHeroSlide(i) {
  const s = heroSlides[i];
  heroEyebrow.textContent = s.eyebrow;
  heroTitle.textContent = s.title;
  heroSub.textContent = s.sub;
  heroIndex = i;
  renderHeroDots();
}

setInterval(() => {
  showHeroSlide((heroIndex + 1) % heroSlides.length);
}, 3500);

/* =
   DEAL COUNTDOWN TIMER
= */
let dealSeconds = 5 * 3600 + 32 * 60 + 10; // 05:32:10
const dealTimerEl = document.getElementById("dealTimer");

function tickTimer() {
  if (dealSeconds <= 0) { dealSeconds = 6 * 3600; }
  dealSeconds--;
  const h = String(Math.floor(dealSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((dealSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(dealSeconds % 60).padStart(2, "0");
  dealTimerEl.textContent = `${h}:${m}:${s}`;
}
setInterval(tickTimer, 1000);

/* =
   INIT
= */
function init() {
  renderDeals();
  renderHeroDots();
  applyFilters();
  updateCartUI();
}
init();

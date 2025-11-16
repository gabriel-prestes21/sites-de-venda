// REFERÊNCIAS
const productsEl = document.getElementById("products");
const cartBtn = document.getElementById("cart-btn");
const cartCountEl = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");
const yearEl = document.getElementById("year");

// PRODUTOS
const products = [
    { id: "1", name: "Whey Protein Isolado", price: 139.90, img: "img/whey-prot-iso-mor-po-900g_56302.png" },
    { id: "2", name: "Creatina Monohidratada", price: 89.90, img: "https://images.unsplash.com/photo-1579722821273-0f63e7d2a73c?w=600" },
    { id: "3", name: "Pré-treino Explosive", price: 119.90, img: "https://images.unsplash.com/photo-1585238342028-3eaf6a35d1e5?w=600" },
    { id: "4", name: "BCAA 2:1:1", price: 59.90, img: "https://images.unsplash.com/photo-1514996937319-344454492b37?w=600" },
    { id: "5", name: "Glutamina", price: 74.90, img: "https://images.unsplash.com/photo-1598515214217-6f10bb1dedad?w=600" },
    { id: "6", name: "Hipercalórico 3kg", price: 149.90, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600" },
    { id: "7", name: "Multivitamínico", price: 39.90, img: "https://images.unsplash.com/photo-1576330298599-4ff01f38f5d1?w=600" },
    { id: "8", name: "Ômega 3", price: 29.90, img: "https://images.unsplash.com/photo-1603398938378-d178b18a91e4?w=600" },
    { id: "9", name: "Cafeína 420mg", price: 34.90, img: "https://images.unsplash.com/photo-1518611012118-fc02cc4b322e?w=600" },
    { id: "10", name: "Termogênico FireBurn", price: 129.90, img: "https://images.unsplash.com/photo-1598550874173-c6e3df13c8ba?w=600" }
];

// CARRINHO
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const total = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCountEl.textContent = total;
}

// FORMATADOR
function formatBRL(n) {
    return n.toFixed(2).replace(".", ",");
}

// RENDERIZAR PRODUTOS
function renderProducts() {
    productsEl.innerHTML = "";
    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p>Suplemento de alta qualidade.</p>
            <div class="price">R$ ${formatBRL(p.price)}</div>
            <button data-id="${p.id}">Adicionar ao carrinho</button>
        `;
        productsEl.appendChild(div);
    });
}

// ADICIONAR AO CARRINHO
function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty++;
    else cart.push({ id, qty: 1 });
    saveCart();
    updateCartCount();
}

// RENDERIZAR CARRINHO
function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const li = document.createElement("li");

        li.innerHTML = `
            <img src="${product.img}">
            <div>
                <strong>${product.name}</strong>
                <div>R$ ${formatBRL(product.price)} x ${item.qty}</div>
            </div>
            <div>
                <button class="dec" data-id="${item.id}">-</button>
                <button class="inc" data-id="${item.id}">+</button>
            </div>
        `;

        cartItemsEl.appendChild(li);
        total += product.price * item.qty;
    });

    cartTotalEl.textContent = formatBRL(total);
}

// MUDAR QUANTIDADE
function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;

    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);

    saveCart();
    updateCartCount();
    renderCart();
}

// BOTÕES
cartBtn.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
    renderCart();
});

closeCart.addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

productsEl.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        addToCart(e.target.dataset.id);
    }
});

cartItemsEl.addEventListener("click", e => {
    if (e.target.classList.contains("inc")) changeQty(e.target.dataset.id, 1);
    if (e.target.classList.contains("dec")) changeQty(e.target.dataset.id, -1);
});

clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
});

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return alert("Carrinho vazio!");

    alert("Compra finalizada! Obrigado :)");
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
});

// INICIAR
renderProducts();
updateCartCount();
yearEl.textContent = new Date().getFullYear();
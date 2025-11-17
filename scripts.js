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
    { id: "1", name: "Whey Protein Isolado", price: 139.90, img: "https://cdn.shoppub.io/cdn-cgi/image/w=560,h=560,q=80,f=auto/gsn/media/uploads/produtos/foto/gdmyzsbz/chocolate.png" },
    { id: "2", name: "Creatina Monohidratada", price: 89.90, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnCwH8dIKWpRt1e1OnMG5lDzssqlaiMtLtzA&s" },
    { id: "3", name: "Pré-treino", price: 119.90, img: "https://images.tcdn.com.br/img/img_prod/1048598/pre_treino_horus_frutas_vermelhas_300g_11791_1_43578bd08517b8afe95ed5bf5a7c434d.png" },
    { id: "4", name: "BCAA", price: 59.90, img: "https://www.gsuplementos.com.br/upload/produto/imagem/bcaa-2-1-1-200g-em-p-growth-supplements-4.webp" },
    { id: "5", name: "Glutamina", price: 74.90, img: "https://www.gsuplementos.com.br/upload/produto/imagem/l-glutamina-250g-growth-supplements-1.webp" },
    { id: "6", name: "Hipercalórico 1,4kg", price: 149.90, img: "https://d2kh0jmrbw4y83.cloudfront.net/Custom/Content/Products/12/77/12773_mass-hipercalorico-7000-health-labs-sabor-baunilha-14kg-162816_m3_638284648212375479.webp" },
    { id: "7", name: "Multivitamínico", price: 39.90, img: "https://i0.wp.com/vegashop.com.br/wp-content/uploads/2022/02/001-10.jpg?fit=1000%2C1000&ssl=1" },
    { id: "8", name: "Ômega 3", price: 29.90, img: "https://www.drogaraia.com.br/_next/image?url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F11348936.webp&w=3840&q=40" },
    { id: "9", name: "Cafeína 200mg", price: 34.90, img: "https://www.gsuplementos.com.br/upload/produto/imagem/cafe-na-200mg-120-caps-growth-supplements-termog-nico.png" },
    { id: "10", name: "Termogênico", price: 129.90, img: "https://product-data.raiadrogasil.io/images/3518555.webp" }
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
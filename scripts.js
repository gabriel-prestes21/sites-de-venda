// ELEMENTOS
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
const titleEl = document.getElementById("store-title");
const descEl = document.getElementById("store-desc");

// --------------------- PRODUTOS PRINCIPAIS ---------------------
const products = [
    { id: "1", name: "Whey Protein Isolado", price: 139.90, img: "https://cdn.shoppub.io/cdn-cgi/image/w=560,h=560,q=80,f=auto/gsn/media/uploads/produtos/foto/gdmyzsbz/chocolate.png" },
    { id: "2", name: "Creatina Monohidratada", price: 89.90, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnCwH8dIKWpRt1e1OnMG5lDzssqlaiMtLtzA&s" },
    { id: "3", name: "Pré-treino", price: 119.90, img: "https://images.tcdn.com.br/img/img_prod/1048598/pre_treino_horus_frutas_vermelhas_300g_11791_1_43578bd08517b8afe95ed5bf5a7c434d.png" },
    { id: "6", name: "Hipercalórico 1,4kg", price: 110.90, img: "https://d2kh0jmrbw4y83.cloudfront.net/Custom/Content/Products/12/77/12773_mass-hipercalorico-7000-health-labs-sabor-baunilha-14kg-162816_m3_638284648212375479.webp" },
    { id: "7", name: "Multivitamínico", price: 39.90, img: "https://i0.wp.com/vegashop.com.br/wp-content/uploads/2022/02/001-10.jpg?fit=1000%2C1000&ssl=1" },
    { id: "8", name: "Ômega 3", price: 29.90, img: "https://www.drogaraia.com.br/_next/image?url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F11348936.webp&w=3840&q=40" }
];

// --------------------- PRODUTOS SECRETOS ---------------------
const secretProducts = [
    { id: "s1", name: "Trembolona Acetato", price: 255, img: "https://landerlan.com.br/img/produto/trembolona-10ml-landerlan.jpg" },
    { id: "s2", name: "Oxandrolona", price: 235 , img: "https://d5gag3xtge2og.cloudfront.net/producao/35288766/G/oxana.jpeg" },
    { id: "s3", name: "Clembuterol", price: 160 , img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmR1Njf8cOr9mX2Vi2LQ71Pg_e71ozK8lhMA&s" },
    { id: "s4", name: "Durateston", price: 205 , img: "https://i0.wp.com/hmcmax.com/wp-content/uploads/2025/01/durateston_plus-_smart_suplementos-1.jpg.webp?fit=487%2C520&ssl=1" },
    { id: "s5", name: "Deca-Durabolin", price: 85, img: "https://precosnoparaguai.s3.amazonaws.com/product_images/b366c930-0333-40ff-a8ed-2d3fe1aef5e7.png" },
    { id: "s6", name: "Hemogenin (Oxymetolona)", price: 85, img: "https://barbaesuplementos.com/wp-content/uploads/2025/01/oximetolona-hemogenin-50mg-landerlan-oxitoland-1-300x300.jpg" }
];

let currentList = "main";

// ------------------ RENDERIZAÇÃO ------------------
function formatBRL(n) {
    return n.toFixed(2).replace(".", ",");
}

function renderProducts() {
    productsEl.innerHTML = "";

    const list = currentList === "main" ? products : secretProducts;

    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p>${currentList === "main" ? "Suplemento de alta qualidade." : "Produto exclusivo."}</p>
            <div class="price">R$ ${formatBRL(p.price)}</div>
            <button data-id="${p.id}">Adicionar ao carrinho</button>
        `;
        productsEl.appendChild(div);
    });

    if (currentList === "main") {
        titleEl.textContent = "Suplementos de qualidade para seus treinos";
        descEl.textContent = "Proteínas, vitaminas e pré-treinos selecionados para você.";
    } else {
        titleEl.textContent = "Área Exclusiva";
        descEl.textContent = "Produtos secretos — acesso restrito.";
    }
}

// ------------------ CARRINHO ------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const total = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCountEl.textContent = total;
}

function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty++;
    else cart.push({ id, qty: 1 });
    saveCart();
    updateCartCount();
}

function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id) ||
                        secretProducts.find(p => p.id === item.id);

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

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;

    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);

    saveCart();
    updateCartCount();
    renderCart();
}

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
    alert("Compra finalizada!");
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
});

// ------------------ SENHA SECRETA (↑ ↓ ← → → ↑ ↓) ------------------
const secretCode = [
    "ArrowUp", "ArrowDown", "ArrowLeft",
    "ArrowRight", "ArrowRight",
    "ArrowUp", "ArrowDown"
];

let pressed = [];

document.addEventListener("keydown", e => {
    pressed.push(e.key);

    if (pressed.length > secretCode.length)
        pressed.shift();

    if (pressed.join(",") === secretCode.join(",")) {

        // ATIVA MODO ESCURO
        document.documentElement.classList.add("dark-mode");

        currentList = "secret";
        document.querySelector(".logo").textContent = "Loja de Suplementos Totalmente Lícitos";
        renderProducts();
        alert("Entrada liberada: área secreta desbloqueada!");
    }
});

// ------------------ SENHA PARA VOLTAR (↓ ↑ → ← ← ↓ ↑) ------------------
const exitCode = [
    "ArrowDown", "ArrowUp", "ArrowRight",
    "ArrowLeft", "ArrowLeft",
    "ArrowDown", "ArrowUp"
];

let pressedExit = [];

document.addEventListener("keydown", e => {
    pressedExit.push(e.key);

    if (pressedExit.length > exitCode.length)
        pressedExit.shift();

    if (pressedExit.join(",") === exitCode.join(",")) {

        // DESATIVA MODO ESCURO
        document.documentElement.classList.remove("dark-mode");

        currentList = "main";
        document.querySelector(".logo").textContent = "NutriPlus";
        renderProducts();
        alert("Você voltou à loja principal!");
    }
});

// ------------------ INICIAR ------------------
renderProducts();
updateCartCount();
yearEl.textContent = new Date().getFullYear();
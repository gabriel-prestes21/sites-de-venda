// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Whey Protein 100% Pure - 2kg",
        price: 129.90,
        originalPrice: 159.90,
        image: "https://via.placeholder.com/300",
        category: "Whey Protein",
        description: "Whey Protein 100% puro, com alto valor biológico e rápida absorção. Ideal para ganho de massa muscular.",
        shipping: "Frete grátis",
        inStock: true
    },
    {
        id: 2,
        name: "Creatina Monohidratada - 300g",
        price: 49.90,
        originalPrice: 69.90,
        image: "https://via.placeholder.com/300",
        category: "Creatina",
        description: "Creatina monohidratada de alta pureza. Aumenta a força e a resistência muscular durante os treinos.",
        shipping: "Frete grátis",
        inStock: true
    },
    {
        id: 3,
        name: "Pré-treino Explosive Energy",
        price: 79.90,
        originalPrice: 99.90,
        image: "https://via.placeholder.com/300",
        category: "Pré-treino",
        description: "Pré-treino com fórmula avançada para aumentar energia, foco e resistência durante os exercícios.",
        shipping: "Frete grátis",
        inStock: true
    },
    {
        id: 4,
        name: "Hipercalórico Mass Gain - 3kg",
        price: 89.90,
        originalPrice: 119.90,
        image: "https://via.placeholder.com/300",
        category: "Hipercalóricos",
        description: "Suplemento hipercalórico com alto teor de carboidratos e proteínas para ganho de massa muscular.",
        shipping: "Frete grátis",
        inStock: true
    },
    {
        id: 5,
        name: "BCAA 2:1:1 - 300g",
        price: 59.90,
        originalPrice: 79.90,
        image: "https://via.placeholder.com/300",
        category: "Aminoácidos",
        description: "BCAA na proporção 2:1:1 de leucina, isoleucina e valina. Reduz a fadiga muscular e acelera a recuperação.",
        shipping: "Frete grátis",
        inStock: true
    },
    {
        id: 6,
        name: "Multivitamínico Completo - 60 cápsulas",
        price: 39.90,
        originalPrice: 49.90,
        image: "https://via.placeholder.com/300",
        category: "Vitaminas",
        description: "Complexo vitamínico completo com minerais essenciais para suprir as necessidades diárias do organismo.",
        shipping: "Frete grátis",
        inStock: true
    },
    {
        id: 7,
        name: "Whey Protein Isolado - 1kg",
        price: 99.90,
        originalPrice: 129.90,
        image: "https://via.placeholder.com/300",
        category: "Whey Protein",
        description: "Whey Protein Isolado com alto teor proteico e baixo teor de carboidratos e gorduras.",
        shipping: "Frete grátis",
        inStock: true
    },
    {
        id: 8,
        name: "Glutamina - 300g",
        price: 44.90,
        originalPrice: 59.90,
        image: "https://via.placeholder.com/300",
        category: "Aminoácidos",
        description: "Glutamina pura para melhorar a recuperação muscular e fortalecer o sistema imunológico.",
        shipping: "Frete grátis",
        inStock: true
    }
];

// Carrinho de compras
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const dealsGrid = document.getElementById('deals-grid');
const productModal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderDeals();
    setupEventListeners();
});

// Renderizar produtos em destaque
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.slice(0, 6).forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Renderizar ofertas do dia
function renderDeals() {
    dealsGrid.innerHTML = '';
    
    // Selecionar produtos com desconto para as ofertas
    const deals = products.filter(product => product.originalPrice > product.price).slice(0, 4);
    
    deals.forEach(product => {
        const dealCard = createDealCard(product);
        dealsGrid.appendChild(dealCard);
    });
}

// Criar card de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-price">R$ ${product.price.toFixed(2)}</div>
            <div class="product-title">${product.name}</div>
            <div class="product-shipping">${product.shipping}</div>
        </div>
    `;
    
    card.addEventListener('click', () => openProductModal(product));
    
    return card;
}

// Criar card de oferta
function createDealCard(product) {
    const card = document.createElement('div');
    card.className = 'deal-card';
    card.dataset.id = product.id;
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="deal-image">
        <div class="deal-info">
            <div class="deal-price">
                R$ ${product.price.toFixed(2)}
                <span class="discount-badge">${discount}% OFF</span>
            </div>
            <div class="deal-title">${product.name}</div>
            <div class="deal-shipping">${product.shipping}</div>
        </div>
    `;
    
    card.addEventListener('click', () => openProductModal(product));
    
    return card;
}

// Abrir modal do produto
function openProductModal(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-details">
                <h2 class="modal-title">${product.name}</h2>
                <div class="modal-price">
                    R$ ${product.price.toFixed(2)}
                    ${product.originalPrice > product.price ? 
                        `<span style="text-decoration: line-through; color: #666; font-size: 18px; margin-left: 10px;">
                            R$ ${product.originalPrice.toFixed(2)}
                        </span>
                        <span class="discount-badge">${discount}% OFF</span>` : ''}
                </div>
                <p class="modal-description">${product.description}</p>
                <div class="modal-actions">
                    <button class="btn-primary" id="add-to-cart">Adicionar ao carrinho</button>
                    <button class="btn-secondary" id="buy-now">Comprar agora</button>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar eventos aos botões do modal
    document.getElementById('add-to-cart').addEventListener('click', () => addToCart(product));
    document.getElementById('buy-now').addEventListener('click', () => buyNow(product));
    
    productModal.style.display = 'block';
}

// Fechar modal
closeModal.addEventListener('click', () => {
    productModal.style.display = 'none';
});

// Fechar modal ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target === productModal) {
        productModal.style.display = 'none';
    }
});

// Adicionar produto ao carrinho
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} adicionado ao carrinho!`);
    productModal.style.display = 'none';
}

// Comprar agora
function buyNow(product) {
    addToCart(product);
    // Em uma aplicação real, redirecionaria para a página de checkout
    alert(`Redirecionando para checkout com ${product.name}`);
}

// Atualizar interface do carrinho
function updateCartUI() {
    const cartElement = document.querySelector('.cart');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartCount > 0) {
        cartElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <span>Carrinho (${cartCount})</span>
        `;
    }
}

// Mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #00a650;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1001;
        transition: opacity 0.3s;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Configurar event listeners
function setupEventListeners() {
    // Busca
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Categorias
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            alert(`Mostrando produtos da categoria: ${category}`);
            // Em uma aplicação real, filtraria os produtos por categoria
        });
    });
}

// Realizar busca
function performSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        alert(`Buscando por: ${searchTerm}`);
        // Em uma aplicação real, filtraria os produtos pelo termo de busca
    }
}
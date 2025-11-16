// scripts.js


function changeQty(id, delta){
const it = cart.find(i=>i.id===id)
if(!it) return
it.qty += delta
if(it.qty <= 0) cart = cart.filter(i=>i.id!==id)
saveCart(); updateCartCount(); renderCart()
}


function clearCart(){ cart = []; saveCart(); updateCartCount(); renderCart() }


function checkout(){
if(cart.length===0){ alert('Seu carrinho está vazio.'); return }
// Simulação de checkout
alert('Compra finalizada! Obrigado.\nTotal: R$ ' + cartTotalEl.textContent)
clearCart()
}


// Eventos
productsEl.addEventListener('click', e=>{
if(e.target.tagName === 'BUTTON'){
const id = e.target.dataset.id
addToCart(id)
}
})


cartBtn.addEventListener('click', ()=>{
cartModal.classList.remove('hidden')
cartModal.setAttribute('aria-hidden', 'false')
renderCart()
})


closeCart.addEventListener('click', ()=>{
cartModal.classList.add('hidden')
cartModal.setAttribute('aria-hidden', 'true')
})


cartItemsEl.addEventListener('click', e=>{
if(e.target.classList.contains('inc')){
changeQty(e.target.dataset.id, 1)
} else if(e.target.classList.contains('dec')){
changeQty(e.target.dataset.id, -1)
}
})


clearCartBtn.addEventListener('click', clearCart)
checkoutBtn.addEventListener('click', checkout)


// Inicialização
renderProducts(); updateCartCount(); yearEl.textContent = new Date().getFullYear()
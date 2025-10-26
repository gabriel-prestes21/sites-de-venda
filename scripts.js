// Dados fictícios de produtos — troque/adicione produtos como quiser


function loadCart(){
const raw = localStorage.getItem('suple_cart');
if(raw) cart = JSON.parse(raw);
}


function updateCartUI(){
const count = cart.reduce((s,i)=>s+i.qty,0);
cartCount.textContent = count;
// atualizar modal
cartItems.innerHTML = '';
if(cart.length===0) cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
cart.forEach(ci => {
const row = document.createElement('div');
row.className = 'cart-item';
row.innerHTML = `
<img src="https://via.placeholder.com/80x80?text=Prod" alt="${ci.name}">
<div style="flex:1">
<div style="font-weight:600">${ci.name}</div>
<div>R$ ${ci.price.toFixed(2).replace('.',',')}</div>
<div style="margin-top:6px">Quantidade:
<button onclick="changeQty(${ci.id}, -1)">-</button>
<strong style="margin:0 8px">${ci.qty}</strong>
<button onclick="changeQty(${ci.id}, 1)">+</button>
<button style="margin-left:12px" onclick="removeItem(${ci.id})">Remover</button>
</div>
</div>
`;
cartItems.appendChild(row);
});
const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
cartTotal.textContent = total.toFixed(2).replace('.',',');
}


window.changeQty = function(id, delta){
const item = cart.find(x=>x.id===id);
if(!item) return;
item.qty += delta;
if(item.qty<=0) cart = cart.filter(x=>x.id!==id);
saveCart();
updateCartUI();
}


window.removeItem = function(id){
cart = cart.filter(x=>x.id!==id);
saveCart();
updateCartUI();
}


cartBtn.addEventListener('click', ()=>{
cartModal.classList.remove('hidden');
})
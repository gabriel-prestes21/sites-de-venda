// Aguarda o documento HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os botões "Adicionar ao Carrinho"
    const botoesAdicionar = document.querySelectorAll('.btn-add-cart');

    // Seleciona o link do carrinho na navegação (para atualizar a contagem)
    // Vamos supor que o link do carrinho seja o último item da lista
    const linkCarrinho = document.querySelector('nav ul li:last-child a');

    let totalItensCarrinho = 0;

    // Itera sobre cada botão e adiciona um ouvinte de evento (click)
    botoesAdicionar.forEach(botao => {
        
        botao.addEventListener('click', () => {
            // Pega o nome do produto do atributo 'data-product'
            const nomeProduto = botao.getAttribute('data-product');

            // 1. Ação Simples: Apenas um alerta
            alert(`"${nomeProduto}" foi adicionado ao carrinho!`);

            // 2. Ação Intermediária: Atualiza o contador do carrinho
            totalItensCarrinho++;
            linkCarrinho.textContent = `Carrinho (${totalItensCarrinho})`;

            /* Em um site real, aqui você faria uma lógica mais complexa:
            - Criar um objeto 'item' (com id, nome, preço).
            - Adicionar esse objeto a um array (o 'carrinho').
            - Salvar esse array no 'localStorage' do navegador.
            - Atualizar visualmente o ícone do carrinho.
            */
        });

    });

});
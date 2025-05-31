
document.addEventListener('DOMContentLoaded', async () => {
    
    const produtosContainer = document.getElementById('produtos-container');
    
    // Define o caminho para o arquivo JSON (mock API)
    const jsonPath = '../api/produtos.json'; 

    try {
        // 1. Faz a requisição para buscar os dados do JSON
        const response = await fetch(jsonPath);
        
        // 2. Verifica se a resposta da requisição (status 200 OK)
        if (!response.ok) {
            // Se a resposta não for OK, lança um erro 
            throw new Error(`Erro ao carregar os produtos: ${response.status} ${response.statusText}`);
        }

        // 3. Converte a resposta para JSON
        const produtos = await response.json();

        // 4. Limpa qualquer mensagem de carregamento 
        produtosContainer.innerHTML = ''; 

        // 5. Itera sobre cada produto recebido do JSON 
        produtos.forEach(produto => {
            const produtoCard = document.createElement('div');

            // Adiciona uma classe para estilização no CSS
            produtoCard.classList.add('produto-card'); 

            // Define o conteúdo HTML do card
            produtoCard.innerHTML = `
                <img src="${produto.imagemCard}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricaoCompleta}</p> 
                <a href="${produto.linkDiretoFerramenta}" class="btn-acessar">Acessar</a>
            `;
            
            // Adiciona o card criado
            produtosContainer.appendChild(produtoCard);
        });

    } catch (error) {
        // 6. Bloco para tratamento de erros uma mensagem de erro será exibida 
        console.error('Erro ao carregar os produtos:', error);
        produtosContainer.innerHTML = `
            <p class="mensagem-erro">Ops! Não foi possível carregar nossos produtos no momento. 
            Por favor, tente novamente mais tarde.</p>
            <p class="mensagem-erro-detalhe">Detalhes do erro: ${error.message}</p>
        `;
    }
});
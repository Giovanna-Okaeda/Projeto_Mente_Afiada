document.addEventListener('DOMContentLoaded', async () => {
    const equipeContainer = document.getElementById('equipe-container');
    // Caminho para o arquivo JSON da equipe
    const jsonPath = '../api/equipe.json'; 

    try {
        const response = await fetch(jsonPath);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar os dados da equipe: ${response.status} ${response.statusText}`);
        }

        const equipe = await response.json();

        equipeContainer.innerHTML = ''; // Limpa a mensagem de carregamento

        equipe.forEach(membro => {
            const membroCard = document.createElement('div');
            membroCard.classList.add('membro-card'); 
            
            membroCard.innerHTML = `
                <img src="${membro.foto}" alt="Foto de ${membro.nome}">
                <h3>${membro.nome}</h3>
                <h4>${membro.cargo}</h4>
                <p>${membro.descricao}</p>
                <div class="redes-sociais">
                    ${membro.redesSociais.linkedin ? `<a href="${membro.redesSociais.linkedin}" target="_blank" title="LinkedIn"><img src="../img/icons/linkedin_icon.png" alt="LinkedIn"></a>` : ''}
                    ${membro.redesSociais.github ? `<a href="${membro.redesSociais.github}" target="_blank" title="GitHub"><img src="../img/icons/github_icon.png" alt="GitHub"></a>` : ''}
                    ${membro.redesSociais.instagram ? `<a href="${membro.redesSociais.instagram}" target="_blank" title="Instagram"><img src="../img/icons/instagram_icon.png" alt="Instagram"></a>` : ''}
                    </div>
            `;
            
            equipeContainer.appendChild(membroCard);
        });

    } catch (error) {
        console.error('Erro ao carregar a equipe:', error);
        equipeContainer.innerHTML = `
            <p class="mensagem-erro">Ops! Não foi possível carregar as informações da equipe no momento. 
            Por favor, tente novamente mais tarde.</p>
            <p class="mensagem-erro-detalhe">Detalhes do erro: ${error.message}</p>
        `;
    }
});
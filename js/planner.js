
let plannerData = [];
let editingIndex = -1; 

function mostrarPlanner() {
    const criarPlannerSection = document.getElementById('criar-planner');
    const visualizacaoPlanner = document.getElementById('planner-visualizacao');

    
    if (criarPlannerSection && visualizacaoPlanner) {
        criarPlannerSection.style.display = 'block';
        visualizacaoPlanner.style.display = 'block';
        
        criarPlannerSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function adicionarMateria() {
    const materiaInput = document.getElementById('materia');
    const diasCheckbox = document.querySelectorAll('input[name="dia"]:checked');
    const horaInicioInput = document.getElementById('hora-inicio');

    const materia = materiaInput.value.trim();
    const diasSelecionados = Array.from(diasCheckbox).map(checkbox => checkbox.value);
    const horaInicio = horaInicioInput.value;

    if (materia && diasSelecionados.length > 0 && horaInicio) {
        let novaMateria = {
            materia: materia,
            dias: diasSelecionados,
            horaInicio: horaInicio
        };

        if (editingIndex === -1) {
            plannerData.push(novaMateria);
        } else {
            plannerData[editingIndex] = novaMateria;
            editingIndex = -1;
            document.querySelector('#study-planner-form button').textContent = 'Adicionar Matéria';
        }
        
        atualizarTabelaPlanner();
        limparFormulario();
    } else {
        alert('Por favor, preencha todos os campos e selecione pelo menos um dia e o horário de início.');
    }
}

function limparFormulario() {
    document.getElementById('materia').value = '';
    const diasCheckbox = document.querySelectorAll('input[name="dia"]');
    diasCheckbox.forEach(checkbox => checkbox.checked = false);
    document.getElementById('hora-inicio').value = '';
}

function atualizarTabelaPlanner() {
    const tabelaPlannerBody = document.getElementById('planner-table').getElementsByTagName('tbody')[0];
    tabelaPlannerBody.innerHTML = '';

    const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

    plannerData.forEach((item, index) => {
        let novaLinha = tabelaPlannerBody.insertRow();
        let celulaMateria = novaLinha.insertCell();
        celulaMateria.textContent = item.materia;

        diasDaSemana.forEach(dia => {
            let celulaDia = novaLinha.insertCell();
            if (item.dias.includes(dia)) {
                celulaDia.textContent = item.horaInicio;
            } else {
                celulaDia.textContent = '';
            }
        });

        let celulaAcoes = novaLinha.insertCell();
        
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.classList.add('edit-btn');
        botaoEditar.onclick = function() {
            editarMateria(index);
        };
        celulaAcoes.appendChild(botaoEditar);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('delete-btn');
        botaoExcluir.onclick = function() {
            plannerData.splice(index, 1);
            if (editingIndex === index) { 
                editingIndex = -1;
                document.querySelector('#study-planner-form button').textContent = 'Adicionar Matéria';
                limparFormulario();
            } else if (editingIndex > index) {
                editingIndex--;
            }
            atualizarTabelaPlanner();
        };
        celulaAcoes.appendChild(botaoExcluir);
    });
}

function editarMateria(index) {
    editingIndex = index;
    const itemParaEditar = plannerData[index];

    document.getElementById('materia').value = itemParaEditar.materia;
    
    const diasCheckbox = document.querySelectorAll('input[name="dia"]');
    diasCheckbox.forEach(checkbox => checkbox.checked = false);
    itemParaEditar.dias.forEach(dia => {
        const checkboxDia = document.getElementById(dia.toLowerCase());
        if (checkboxDia) {
            checkboxDia.checked = true;
        }
    });

    document.getElementById('hora-inicio').value = itemParaEditar.horaInicio;

    document.querySelector('#study-planner-form button').textContent = 'Atualizar Matéria';

    document.getElementById('criar-planner').scrollIntoView({ behavior: 'smooth' });
}


function downloadPlanner() {
    if (plannerData.length === 0) {
        alert('Adicione matérias ao seu planner antes de baixar.');
        return;
    }

    let plannerHTML = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Planner de Estudos - Mente Afiada</title>
            <style>
                body { font-family: sans-serif; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Planner de Estudos - Mente Afiada</h1>
            <table>
                <thead>
                    <tr>
                        <th>Matéria</th>
                        <th>Segunda</th>
                        <th>Terça</th>
                        <th>Quarta</th>
                        <th>Quinta</th>
                        <th>Sexta</th>
                        <th>Sábado</th>
                        <th>Domingo</th>
                    </tr>
                </thead>
                <tbody>
    `;

    const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

    plannerData.forEach(item => {
        plannerHTML += `
                    <tr>
                        <td>${item.materia}</td>
        `;
        diasDaSemana.forEach(dia => {
            plannerHTML += `<td>${item.dias.includes(dia) ? item.horaInicio : ''}</td>`;
        });
        plannerHTML += `</tr>`;
    });

    plannerHTML += `
                </tbody>
            </table>
        </body>
        </html>
    `;

    const nomeArquivo = 'planner_de_estudos.html';
    const blob = new Blob([plannerHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const linkDownload = document.createElement('a');
    linkDownload.href = url;
    linkDownload.download = nomeArquivo;
    document.body.appendChild(linkDownload);
    linkDownload.click();
    document.body.removeChild(linkDownload);
    URL.revokeObjectURL(url);
}

//Search Suggestions)
document.addEventListener('DOMContentLoaded', () => {
    const searchTermsInput = document.getElementById('search-terms');
    const searchBtn = document.getElementById('search-btn');
    const searchResultsDiv = document.getElementById('search-results');

    async function searchStudyResources(query) {
        searchResultsDiv.innerHTML = '<p>Buscando recursos...</p>';
        const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            searchResultsDiv.innerHTML = '';

            if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                const resultsList = document.createElement('ul');
                data.RelatedTopics.slice(0, 5).forEach(topic => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = topic.FirstURL || '#';
                    link.textContent = topic.Text || 'Ver mais';
                    link.target = '_blank';
                    listItem.appendChild(link);
                    resultsList.appendChild(listItem);
                });
                searchResultsDiv.appendChild(resultsList);
            } else if (data.AbstractURL) {
                const resultLink = document.createElement('a');
                resultLink.href = data.AbstractURL;
                resultLink.textContent = data.AbstractText || 'Ver resultado';
                resultLink.target = '_blank';
                searchResultsDiv.appendChild(resultLink);
            } else {
                searchResultsDiv.innerHTML = '<p class="no-results">Nenhum resultado encontrado para sua busca.</p>';
            }

        } catch (error) {
            console.error('Erro ao buscar recursos:', error);
            searchResultsDiv.innerHTML = '<p class="error">Erro ao buscar recursos.</p>';
        }
    }

    searchStudyResources('dicas de estudo e organização'); // Busca inicial

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchTermsInput.value.trim();
        if (searchTerm) {
            searchStudyResources(searchTerm);
        } else {
            searchStudyResources('recursos de estudo');
        }
    });

    searchTermsInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });
});

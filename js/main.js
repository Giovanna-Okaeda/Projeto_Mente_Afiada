let plannerData = [];

// Adiciona um ouvinte de evento para garantir que o DOM esteja carregado
document.addEventListener('DOMContentLoaded', function() {
    atualizarTabelaPlanner(); // Chama para exibir dados existentes (se houver)
});

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
        plannerData.push(novaMateria);
        atualizarTabelaPlanner(); // Atualiza a visualização
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
    tabelaPlannerBody.innerHTML = ''; // Limpa a tabela

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
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = function() {
            plannerData.splice(index, 1);
            atualizarTabelaPlanner();
        };
        celulaAcoes.appendChild(botaoExcluir);
    });
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

// Chama a função para atualizar a tabela quando a página carrega
atualizarTabelaPlanner();
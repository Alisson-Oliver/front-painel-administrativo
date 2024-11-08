// Define o número máximo de migrantes exibidos por página
const limit = 50;

// Define a página atual como a primeira (inicialmente)
let currentPage = 1;

// Função principal para renderizar a tabela com os migrantes da página atual
function renderTable() {
    // Calcula o índice inicial e final dos migrantes que devem ser exibidos com base na página atual
    const start = (currentPage - 1) * limit;
    const end = start + limit;

    // Extrai apenas os migrantes que devem aparecer na página atual
    const pageMigrants = migrants.slice(start, end);

    // Obtém a referência do corpo da tabela onde os dados dos migrantes serão inseridos
    const tableBody = document.getElementById('migrantTable');
    
    // Limpa o conteúdo da tabela antes de inserir as novas linhas da página atual
    tableBody.innerHTML = '';

    // Itera sobre os migrantes da página atual e cria uma linha de tabela para cada um
    pageMigrants.forEach(migrant => {
        // Gera uma linha HTML para o migrante, com seus dados. Se algum dado estiver indisponível, exibe "Não disponível"
        const row = `
            <tr>
                <td>${migrant.full_name}</td> <!-- Nome completo -->
                <td>${migrant.social_name || 'Não disponível'}</td> <!-- Nome social, se existir -->
                <td>${migrant.email}</td> <!-- Email do migrante -->
                <td>${migrant.phone || 'Não disponível'}</td> <!-- Telefone, se existir -->
                <td>${migrant.MigrantDocument?.document_identification || 'Não disponível'}</td> <!-- Documento de identificação, se existir -->
                <td>
                    <div class="d-flex">
                        <form action="/dashboard/migrants/details" method="POST" class='mr-2'>
                            <input type="hidden" name="migrant_id" value="${migrant.id}">
                            <button type="submit" class="btn btn-info btn-sm">Detalhes</button>
                        </form>
                        <form action="/dashboard/migrants/edit" method="POST">
                            <input type="hidden" name="migrant_id" value="${migrant.id}">
                            <button type="submit" class="btn btn-info btn-sm">Editar</button>
                        </form>
                    </div>
                </td>
            </tr>`;
        // Insere a linha na tabela
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Atualiza o texto do contador de exibição, mostrando quantos e quais migrantes estão na página atual
    document.getElementById('contador').textContent = `Exibindo ${start + 1} a ${Math.min(end, migrants.length)} de ${migrants.length} migrantes`;

    // Define o estado dos botões de navegação:
    // Desativa o botão "anterior" se estiver na primeira página
    document.getElementById('prevPage').disabled = currentPage === 1;
    
    // Desativa o botão "próximo" se estiver na última página
    document.getElementById('nextPage').disabled = end >= migrants.length;
}

// Adiciona o evento de clique para o botão "Página Anterior"
document.getElementById('prevPage').addEventListener('click', () => {
    // Se a página atual for maior que 1, decrementa a página e renderiza a tabela novamente
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

// Adiciona o evento de clique para o botão "Próxima Página"
document.getElementById('nextPage').addEventListener('click', () => {
    // Se ainda houver migrantes não exibidos, incrementa a página e renderiza a tabela novamente
    if (currentPage * limit < migrants.length) {
        currentPage++;
        renderTable();
    }
});

// Chama a função para renderizar a tabela ao carregar a página, exibindo a primeira página de migrantes
renderTable();

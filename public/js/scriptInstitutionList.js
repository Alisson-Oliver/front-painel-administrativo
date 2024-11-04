const limit = 50; // Número de instituições por página
let currentPage = 1;

function renderTable() {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const pageInstitutions = institutions.slice(start, end);

    const tableBody = document.getElementById('institutionTable');
    tableBody.innerHTML = '';

    pageInstitutions.forEach(institution => {
        const row = `
            <tr>
                <td>${institution.name}</td>
                <td>${institution.cnpj || 'Não disponível'}</td>
                <td>${institution.email}</td>
                <td>${institution.main_phone || 'Não disponível'}</td>
                <td>
                    <form action="/admin/institutions/details" method="POST">
                        <input type="hidden" name="institution_id" value="${institution.id}">
                        <button type="submit" class="btn btn-info btn-sm">Detalhes</button>
                    </form>
                </td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    document.getElementById('contador').textContent = `Exibindo ${start + 1} a ${Math.min(end, institutions.length)} de ${institutions.length} instituições`;

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = end >= institutions.length;
}


document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage * limit < institutions.length) {
        currentPage++;
        renderTable();
    }
});

// Renderizar a primeira página ao carregar
renderTable();

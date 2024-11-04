 // Função para configurar o nome e o ID da instituição no modal de deleção
 function confirmDelete(name, id) {
    document.getElementById('institutionName').textContent = name;
    document.getElementById('confirmText').value = ''; 
    document.getElementById('institution_id').value = id; // Define o ID no formulário de deleção
}
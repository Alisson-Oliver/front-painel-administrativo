function confirmDelete(name, id) {
    // Preenche o nome da instituição no modal
    document.getElementById('institutionName').textContent = name;
    
    // Define o ID da instituição no formulário para que seja enviado corretamente
    document.getElementById('institution_id').value = id;
}

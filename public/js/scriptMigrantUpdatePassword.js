document.addEventListener("DOMContentLoaded", function() {
    const birthDateElement = document.getElementById("birthDate");
    if (migrantBirthDate) {
        birthDateElement.textContent = formatDate(migrantBirthDate);
    } else {
        birthDateElement.textContent = 'Não disponível';
    }
});

function formatDate(dateStr) {
    const date = new Date(dateStr + 'Z'); 
    if (isNaN(date)) {
        return 'Data inválida'; 
    }
    date.setHours(date.getHours() + 3); 
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function validateForm() {
    const requiredFields = [
        'newPassword',
        'confirmPassword'
    ];
    
    let isValid = true;
    let errorMessage = '';
    
    // Verifica se todos os campos obrigatórios estão preenchidos
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (input && !input.value.trim()) {
            isValid = false;
            errorMessage += `O campo "${input.previousElementSibling.innerText}" é obrigatório. Por favor, preencha-o.\n`;
        }
    });

    // Verifica se as senhas são iguais
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        isValid = false;
        errorMessage += 'As senhas não coincidem. Por favor, verifique.\n';
    }
    
    if(password.length < 6){
        isValid = false;
        errorMessage += 'A senha deve conter 6 dígitos ou mais. \n'
    }
    
    if (!isValid) {
        const alertBox = document.getElementById('alert');
        alertBox.classList.remove('d-none');
        alertBox.innerText = errorMessage;
    
        // Rola a página até o alerta
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        return false; // Não submeter o formulário
    }
    
    return true; // Submeter o formulário
};

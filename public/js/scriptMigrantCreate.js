
function toggleOtherGenderInput() {
    const genderSelect = document.getElementById('gender');
    const otherGenderInput = document.getElementById('other_gender');

    if (genderSelect.value === 'Outro') {
        otherGenderInput.classList.remove('d-none');
        otherGenderInput.required = true;  // Torna o campo obrigatório
    } else {
        otherGenderInput.classList.add('d-none');
        otherGenderInput.value = ''; // Limpa o campo se não for "Outro"
        otherGenderInput.required = false;  // Remove a obrigatoriedade
    }
}

function formatPhone(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.length > 10
        ? value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
}

document.getElementById('btnBuscarEndereco').addEventListener('click', function() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('street').value = data.logradouro;
                    document.getElementById('neighborhood').value = data.bairro;
                    document.getElementById('city').value = data.localidade;
                    document.getElementById('state').value = data.estado;
                } else {
                    alert('CEP não encontrado. Por favor, verifique o número inserido.');
                }
            })  
            .catch(error => {
                console.error('Erro ao buscar endereço:', error);
                alert('Erro ao buscar endereço. Tente novamente mais tarde.');
            });
    } else {
        alert('Por favor, insira um CEP válido.');
    }
});

// Função para validar a senha
function validatePasswords() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const alertDiv = document.getElementById('alert');

    // Verifica se as senhas são iguais e têm mais de 6 caracteres
    if (password !== confirmPassword) {
        alertDiv.textContent = 'As senhas não coincidem!';
        alertDiv.classList.remove('d-none');
        return false;
    } else if (password.length < 6) {
        alertDiv.textContent = 'A senha deve ter pelo menos 6 caracteres!';
        alertDiv.classList.remove('d-none');
        return false;
    } else {
        alertDiv.classList.add('d-none');
        return true;
    }
}

// Adiciona o evento de validação ao enviar o formulário
document.querySelector('form').addEventListener('submit', function(event) {
    if (!validatePasswords()) {
        event.preventDefault(); // Impede o envio do formulário se a validação falhar
    }
});

function toggleOtherGenderInput() {
    const genderSelect = document.getElementById('gender');
    const otherGenderInput = document.getElementById('other_gender');
    if (genderSelect.value === 'Outro') {
        otherGenderInput.classList.remove('d-none');
        otherGenderInput.setAttribute('required', 'required');
    } else {
        otherGenderInput.classList.add('d-none');
        otherGenderInput.removeAttribute('required');
        otherGenderInput.value = '';
    }
}

function toggleOtherProgramInput() {
    const programSelect = document.getElementById('social_program_access');
    const otherProgramInput = document.getElementById('other_social_program_access');
    if (programSelect.value === 'Outro') {
        otherProgramInput.classList.remove('d-none');
        otherProgramInput.setAttribute('required', 'required');
    } else {
        otherProgramInput.classList.add('d-none');
        otherProgramInput.removeAttribute('required');
        otherProgramInput.value = '';
    }
}

// Configura o evento 'blur' no campo de email ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', handleEmailBlur);
});

// Função chamada ao sair do campo de email
const handleEmailBlur = async () => {
    const email = document.getElementById('email').value;
    if (!email) {
        clearEmailFeedback();
        return;
    }

    try {
        const data = await checkEmailAvailability(email);
        
        displayEmailFeedback(data.exists);
    } catch (error) {
        handleEmailError(error);
    }
};

const checkEmailAvailability = async (email) => {
    try {
        const response = await fetch('/admin/migrants/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });

        if (!response.ok) {
            console.error('Erro na requisição:', response.statusText);
            throw new Error('Erro na requisição');
        }
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erro ao verificar o e-mail:', error);
    }
};


// Função para exibir feedback baseado na disponibilidade do email
const displayEmailFeedback = (emailExists) => {
    const feedbackElement = document.getElementById('emailFeedback');
    if (emailExists) {
        feedbackElement.textContent = 'Este email já está cadastrado.';
        feedbackElement.style.color = 'red';
    } else {
        feedbackElement.textContent = '';
    }
};

// Função para limpar o feedback do campo de email
const clearEmailFeedback = () => {
    const feedbackElement = document.getElementById('emailFeedback');
    feedbackElement.textContent = '';
};

// Função para tratar erros na verificação do email
const handleEmailError = (error) => {
    console.error('Erro ao verificar o email:', error);
    const feedbackElement = document.getElementById('emailFeedback');
    feedbackElement.textContent = 'Erro ao verificar o email.';
    feedbackElement.style.color = 'orange';
};

// Alternar visibilidade da senha
document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    if (passwordField.type === "password") {
        passwordField.type = "text"; // Torna a senha visível
        eyeIcon.classList.remove("bi-eye-slash");
        eyeIcon.classList.add("bi-eye");
    } else {
        passwordField.type = "password"; // Torna a senha oculta
        eyeIcon.classList.remove("bi-eye");
        eyeIcon.classList.add("bi-eye-slash");
    }
});

// Alternar visibilidade da confirmação da senha
document.getElementById("toggleConfirmPassword").addEventListener("click", function() {
    const confirmPasswordField = document.getElementById("confirm_password");
    const eyeIconConfirm = document.getElementById("eyeIconConfirm");
    if (confirmPasswordField.type === "password") {
        confirmPasswordField.type = "text"; // Torna a confirmação visível
        eyeIconConfirm.classList.remove("bi-eye-slash");
        eyeIconConfirm.classList.add("bi-eye");
    } else {
        confirmPasswordField.type = "password"; // Torna a confirmação oculta
        eyeIconConfirm.classList.remove("bi-eye");
        eyeIconConfirm.classList.add("bi-eye-slash");
    }
});

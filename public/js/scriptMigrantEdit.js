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
                    alert('CEP não encontrado!');
                }
            })
            .catch(() => {
                alert('Erro ao buscar o CEP!');
            });
    } else {
        alert('CEP inválido!');
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

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    let originalEmail = emailInput.value; // Captura o valor original quando o usuário começa a editar

    // Evento de quando o campo de e-mail for modificado
    emailInput.addEventListener('focus', () => {
        originalEmail = emailInput.value; // Armazena o valor atual do e-mail ao clicar no campo
    });

    // Evento de "blur" ao sair do campo
    emailInput.addEventListener('blur', () => handleEmailBlur(originalEmail));
});

const handleEmailBlur = async (originalEmail) => {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    // Verifica se o e-mail foi alterado
    if (email !== originalEmail) {
        // Se o e-mail foi alterado, faz a verificação
        try {
            const data = await checkEmailAvailability(email);
            displayEmailFeedback(data.exists);
        } catch (error) {
            handleEmailError(error);
        }
    } else {
        // Se não houve alteração, limpa qualquer feedback
        clearEmailFeedback();
    }
};

const checkEmailAvailability = async (email) => {
    try {
        const response = await fetch('/dashboard/migrants/check-email', {
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


function formatCEP(input) {
    // Remove qualquer caractere que não seja número
    const value = input.value.replace(/\D/g, '');

    // Aplica a máscara de formatação do CEP
    const formattedValue = value.replace(/(\d{5})(\d{3})/, '$1-$2');

    // Atualiza o valor do campo com o CEP formatado
    input.value = formattedValue;
}


function formatPhone(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.length > 10
        ? value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
}
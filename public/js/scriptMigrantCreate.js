
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

function validateForm() {
const requiredFields = [
    'full_name',
    'email',
    'phone',
    'whatsapp_number',
    'document_type',
    'document_identification',
    'date_birth',
    'preferred_language',
    'entry_date',
    'migrant_reason',
    'gender',
    'nationality',
    'marital_status',
    'is_pcd',
    'cep',
    'street',
    'neighborhood',
    'city',
    'state',
    'numero',
    'password',
    'confirm_password'
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

  // Validação do campo "gender"
  const genderSelect = document.getElementById('gender');
  const otherGenderInput = document.getElementById('other_gender'); // Supondo que o input manual tenha id 'other_gender'

  if (genderSelect && genderSelect.value === 'Outro') {  // Verifica se o usuário escolheu "outro"
      // Se escolheu "outro", o campo manual deve ser preenchido
      if (!otherGenderInput || !otherGenderInput.value.trim()) {
          isValid = false;
          errorMessage += `Por favor, preencha o campo de gênero se você escolheu a opção "Outro".\n`;
      }
  }

// Verifica se as senhas são iguais
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirm_password').value;

if (password !== confirmPassword) {
    isValid = false;
    errorMessage += 'As senhas não coincidem. Por favor, verifique.\n';
}

if(password.length < 6){
    isValid = false;
    errorMessage += 'A senha deve conter 6 dígitos ou mais. \n'
}

// Verifica se o checkbox está marcado
const checkbox = document.getElementById('terms'); // Altere para o ID correto
if (!checkbox.checked) {
    isValid = false;
    errorMessage += 'O migrante deve aceitar os termos e condições.\n';
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

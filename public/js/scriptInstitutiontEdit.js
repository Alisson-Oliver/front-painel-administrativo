
/*
* Função para procurar o endereço a partir do CEP
*/
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
                };
            })
            .catch(() => {
                alert('Erro ao buscar o CEP!');
            });
    } else {
        alert('CEP inválido!');
    };
});

/*
* Função para formatar o telefone
*/
function formatPhone(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.length > 10
        ? value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
};

/*
* Função para formatar o CNPJ
*/
function formatCNPJ(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
    );
    input.value = formattedValue; 
};

/*
* Função para formatar o usuário do Instagram
*/
function formatInstagramUsername(input) {
    const value = input.value.trim().replace(/[^a-zA-Z0-9_]/g, '');
    if (value) {
        input.value = `@${value}`;
    } else {
        input.value = ''; 
    };
};

/*
* Função para formatar o campo de CEP
*/
function formatCEP(input) {
    const value = input.value.replace(/\D/g, '');
    // Formata o CEP
    if (value.length > 5) {
        input.value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
    } else {
        input.value = value; 
    };
};

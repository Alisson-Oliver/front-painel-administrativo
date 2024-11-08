

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

function formatPhone(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.length > 10
        ? value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
}

function formatCNPJ(input) {
    // Remove todos os caracteres que não são dígitos
    const value = input.value.replace(/\D/g, '');

    // Formata o CNPJ
    const formattedValue = value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
    );

    input.value = formattedValue; // Atualiza o campo
}

function formatInstagramUsername(input) {
    // Remove espaços em branco e caracteres não permitidos
    const value = input.value.trim().replace(/[^a-zA-Z0-9_]/g, '');

    // Adiciona o @ se o valor não estiver vazio
    if (value) {
        input.value = `@${value}`;
    } else {
        input.value = ''; // Limpa o campo se o valor estiver vazio
    }
}

function formatCEP(input) {
    // Remove todos os caracteres não numéricos
    const value = input.value.replace(/\D/g, '');

    // Formata o CEP
    if (value.length > 5) {
        input.value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
    } else {
        input.value = value; // Se menos de 5 dígitos, apenas retorna o que foi digitado
    }
}

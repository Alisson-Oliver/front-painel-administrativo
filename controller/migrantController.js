import { api } from '../config/config.js';

const getMigrants = async (req, res) => {
    try {
        const response = await api.get("/migrants");
        const migrants = response.data.migrants;
        res.render('migrants/migrantsList', { migrants })
    } catch (error) {
        console.error('Erro ao buscar migrantes:', error);
        res.status(500).render('error', { message: 'Erro ao buscar migrantes' });
    }
};

const deleteMigrant = async (req, res) => {
    const migrantId = req.params.id; // Obtém o ID do migrante da rota

    try {
        // Busca e deleta o migrante pelo ID
        await api.delete(`/migrants/${migrantId}`);
        
        // Redireciona após a deleção com uma mensagem de sucesso
        res.redirect('/admin/migrants'); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao deletar o migrante.' });
    }
};

const getMigrantById = async (req, res) => {
    const migrantId = req.params.id; // Obtém o ID do migrante da rota

    try {
        // Busca o migrante pelo ID
        const response = await api.get(`/migrants/${migrantId}`);
        const migrant = response.data.migrant;

        if (!migrant) {
            return res.status(404).send({ message: 'Migrante não encontrado.' });
        }

        // Renderiza uma nova página com os detalhes do migrante
        res.render('migrants/migrantDetails', { migrant }); // Certifique-se de que 'migrantDetails' é a sua view correta
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao obter os detalhes do migrante.' });
    }
};

const createMigrant = async (req, res) => {
    // Extrai os dados do migrante do corpo da requisição
    const {
        full_name,
        social_name,
        email,
        phone,
        whatsapp_number,
        document_type,
        document_identification,
        date_birth,
        preferred_language,
        entry_date,
        migrant_reason,
        gender,
        nationality,
        marital_status,
        education_level,
        social_program_access,
        status_migratory,
        is_pcd,
        cep,
        street,
        neighborhood,
        city,
        state,
        numero,
        complemento,
        password,
        authorized,
    } = req.body;

    // Função para garantir que os campos sejam null se não forem informados
    const ensureNull = (value) => (value === undefined || value === null || value === '') ? null : value;

    // Cria um objeto migrante, substituindo valores não informados por null
    const migrant = {
        full_name: ensureNull(full_name),
        social_name: ensureNull(social_name),
        email: ensureNull(email),
        phone: ensureNull(phone),
        whatsapp_number: ensureNull(whatsapp_number) || false,  // Assume false se não for informado
        date_birth: ensureNull(date_birth),
        entry_date: ensureNull(entry_date),
        preferred_language: ensureNull(preferred_language),
        migrant_reason: ensureNull(migrant_reason),
        gender: ensureNull(gender),
        nationality: ensureNull(nationality),
        marital_status: ensureNull(marital_status),
        education_level: ensureNull(education_level),
        social_program_access: ensureNull(social_program_access),
        status_migratory: ensureNull(status_migratory),
        address_number: ensureNull(numero),
        address_complement: ensureNull(complemento),
        is_pcd: ensureNull(is_pcd) || false,  // Assume false se não for informado,
        password: ensureNull(password),
        authorized: "on" ? true : false 
    };

    const address = {
        cep: ensureNull(cep),
        street: ensureNull(street),
        neighborhood: ensureNull(neighborhood),
        city: ensureNull(city),
        state: ensureNull(state),
    };

    const migrant_document = {
        document_type: ensureNull(document_type),
        document_identification: ensureNull(document_identification)
    };

    const newData = {
        migrant,
        address,
        migrant_document
    };

    try {
        // Faz a requisição para criar o novo migrante na API
        const response = await api.post('/migrants', newData);
        const migrant = response.data.migrant;
        console.log(response);

        // Redireciona para a página de detalhes do migrante recém-criado
        res.redirect(`/admin/migrants/${migrant.id}`);
    } catch (error) {
        console.error(error);

        // Verifica se há um erro específico retornado pela API
        if (error.response && error.response.data) {
            return res.status(400).send({ message: error.response.data.message });
        }

        // Em caso de erro desconhecido, retorna um erro genérico
        res.status(500).send({ message: 'Erro ao cadastrar o migrante.' });
    }
};


const getEditMigrantForm = async (req, res) => {
    const migrantId = req.params.id; // Obtém o ID do migrante da rota

    try {
        // Busca o migrante pelo ID
        const response = await api.get(`/migrants/${migrantId}`);
        const migrant = response.data.migrant;

        if (!migrant) {
            return res.status(404).send({ message: 'Migrante não encontrado.' });
        }

        // Renderiza a página de edição do migrante
        res.render('migrants/migrantEdit', { migrant }); // A view deve ser editMigrant
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao obter os detalhes do migrante para edição.' });
    }
};

const getRegisterMigrant = async (req, res) => {
     res.render('migrants/migrantCreate'); 
}

const updateMigrant = async (req, res) => {
    // Extrai os dados do migrante do corpo da requisição
    const migrantId = req.params.id

    const {
        full_name,
        social_name,
        email,
        phone,
        whatsapp_number,
        document_type,
        document_identification,
        date_birth,
        preferred_language,
        entry_date,
        migrant_reason,
        gender,
        nationality,
        marital_status,
        education_level,
        social_program_access,
        status_migratory,
        is_pcd,
        cep,
        street,
        neighborhood,
        city,
        state,
        numero,
        complemento,
    } = req.body;

    // Função para garantir que os campos sejam null se não forem informados
    const ensureNull = (value) => (value === undefined || value === null || value === '') ? null : value;

    // Cria um objeto migrante, substituindo valores não informados por null
    const migrant = {
        full_name: ensureNull(full_name),
        social_name: ensureNull(social_name),
        email: ensureNull(email),
        phone: ensureNull(phone),
        whatsapp_number: ensureNull(whatsapp_number) || false,  // Assume false se não for informado
        date_birth: ensureNull(date_birth),
        entry_date: ensureNull(entry_date),
        preferred_language: ensureNull(preferred_language),
        migrant_reason: ensureNull(migrant_reason),
        gender: ensureNull(gender),
        nationality: ensureNull(nationality),
        marital_status: ensureNull(marital_status),
        education_level: ensureNull(education_level),
        social_program_access: ensureNull(social_program_access),
        status_migratory: ensureNull(status_migratory),
        address_number: ensureNull(numero),
        address_complement: ensureNull(complemento),
        is_pcd: ensureNull(is_pcd) || false,  // Assume false se não for informado
    };

    const address = {
        cep: ensureNull(cep),
        street: ensureNull(street),
        neighborhood: ensureNull(neighborhood),
        city: ensureNull(city),
        state: ensureNull(state),
    };

    const migrant_document = {
        document_type: ensureNull(document_type),
        document_identification: ensureNull(document_identification)
    };

    const newData = {
        migrant,
        address,
        migrant_document
    };

    try {
        // Faz a requisição para atualizar o migrante na API
        await api.put(`/migrants/${migrantId}`, newData); // Corrigido para enviar o id no URL

        // Redireciona para a página de detalhes do migrante recém-atualizado
        res.redirect(`/admin/migrants/${migrantId}`);
    } catch (error) {
        console.error(error);

        // Verifica se há um erro específico retornado pela API
        if (error.response && error.response.data) {
            return res.status(400).send({ message: error.response.data.message });
        }

        // Em caso de erro desconhecido, retorna um erro genérico
        res.status(500).send({ message: 'Erro ao cadastrar o migrante.' });
    }
};


const searchMigrant = async (req, res) => {
    try {
        const query = req.query.query; 
        const response = await api.get(`/migrants/search?q=${query}`);
        const migrants = response.data.migrants;
        res.render('migrants/migrantsList', { migrants });
    } catch (error) {
        console.error('Erro ao buscar migrantes:', error);
        res.status(500).send('Erro ao buscar migrantes');
    }
};

export default {
    getMigrants,
    getMigrantById,
    createMigrant,
    updateMigrant,
    deleteMigrant,
    searchMigrant,
    getEditMigrantForm,
    getRegisterMigrant,
}
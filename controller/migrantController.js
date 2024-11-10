import { api } from '../config/config.js';

// Função para obter todos os migrantes e renderizar a lista
const getMigrants = async (req, res) => {
    try {
        const response = await api.get("/migrants");
        const migrants = response.data.migrants;

         // Renderiza a lista de migrantes
        res.render('migrants/migrantsList', { migrants });
    } catch (error) {
        console.error('Erro ao buscar migrantes:', error);
        res.status(500).render('error', { message: 'Erro ao buscar migrantes' });
    }
};

// Função para deletar um migrante pelo ID
const deleteMigrant = async (req, res) => {
    const migrantId = req.body.migrant_id; 
    try {
        // Chama a API para deletar o migrante
        await api.delete(`/migrants/${migrantId}`);
        
        // Redireciona após a deleção com uma mensagem de sucesso
        res.redirect('/dashboard/migrants'); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao deletar o migrante.' });
    }
};

// Função para buscar um migrante por ID e exibir os detalhes
const getMigrantById = async (req, res) => {
    const migrantId = req.body.migrant_id; 

    try {
        // Chama a API para procurar o migrante pelo ID
        const response = await api.get(`/migrants/${migrantId}`);
        const migrant = response.data.migrant;

        if (!migrant) {
            return res.status(404).send({ message: 'Migrante não encontrado.' });
        }

        // Renderiza os detalhes do migrante
        res.render('migrants/migrantDetails', { migrant });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao obter os detalhes do migrante.' });
    }
};


// Função para criar um novo migrante
const createMigrant = async (req, res) => {
    const {
        full_name, social_name, email, phone, whatsapp_number,
        document_type, document_identification, date_birth,
        preferred_language, entry_date, migrant_reason,
        gender, other_gender, nationality, marital_status,
        education_level, social_program_access, status_migratory,
        is_pcd, cep, street, neighborhood, city, state, numero,
        complemento, password, authorized,
    } = req.body;

    // Função para garantir que os campos sejam null se não forem informados
    const ensureNull = (value) => (value === undefined || value === null || value === '') ? null : value;

    // Cria um objeto migrante, substituindo valores não informados por null
    const migrant = {
        full_name: ensureNull(full_name), social_name: ensureNull(social_name),
        email: ensureNull(email), phone: ensureNull(phone),
        whatsapp_number: ensureNull(whatsapp_number) || false,  
        date_birth: ensureNull(date_birth), entry_date: ensureNull(entry_date),
        preferred_language: ensureNull(preferred_language),
        migrant_reason: ensureNull(migrant_reason),
        gender: gender === 'Outro' ? other_gender : gender,
        nationality: ensureNull(nationality), marital_status: ensureNull(marital_status),
        education_level: ensureNull(education_level),
        social_program_access: ensureNull(social_program_access), status_migratory: ensureNull(status_migratory),
        address_number: ensureNull(numero), address_complement: ensureNull(complemento),
        is_pcd: ensureNull(is_pcd) || false, password: ensureNull(password),
        authorized: authorized === "on" ? true : false
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
        migrant, address, migrant_document
    };

    try {
        // Faz a requisição para criar o novo migrante na API
        const { data } = await api.post('/migrants', newData);
        const migrantId = data.migrant.id

        // Redireciona para a página de detalhes do migrante recém-criado
        res.render('migrants/redirect', { migrantId });
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
            return res.status(400).send({ message: error.response.data.message });
        }
        res.status(500).send({ message: 'Erro ao cadastrar o migrante.' });
    }
};

// Função para renderizar página de edição com os dados do migrante
const getEditMigrantForm = async (req, res) => {
    const migrantId = req.body.migrant_id; 

    try {
        // Busca o migrante pelo ID
        const response = await api.get(`/migrants/${migrantId}`);
        const migrant = response.data.migrant;

        if (!migrant) {
            return res.status(404).send({ message: 'Migrante não encontrado.' });
        }

        // Renderiza a página de edição do migrante
        res.render('migrants/migrantEdit', { migrant });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao obter os detalhes do migrante para edição.' });
    }
};


// Função para renderizar página de cadastro de migrante
const getRegisterMigrant = async (req, res) => {
    try {
     res.render('migrants/migrantCreate'); 
    } catch (error) {
        res.render('error', { error });
    }
};

// Função para atualizar dados do migrante
const updateMigrant = async (req, res) => {
    const migrantId = req.body.migrant_id

    const {
        full_name, social_name, email, phone, whatsapp_number, document_type,
        document_identification, date_birth, preferred_language, entry_date,
        migrant_reason, gender, other_gender, nationality, marital_status,
        education_level, social_program_access, status_migratory, is_pcd,
        cep, street, neighborhood, city, state,  numero, complemento,
    } = req.body;

    // Função para garantir que os campos sejam null se não forem informados
    const ensureNull = (value) => (value === undefined || value === null || value === '') ? null : value;

    // Cria um objeto migrante, substituindo valores não informados por null
    const migrant = {
        full_name: ensureNull(full_name), social_name: ensureNull(social_name), email: ensureNull(email),
        phone: ensureNull(phone), whatsapp_number: ensureNull(whatsapp_number) || false,
        date_birth: ensureNull(date_birth),  entry_date: ensureNull(entry_date),
        preferred_language: ensureNull(preferred_language), migrant_reason: ensureNull(migrant_reason),
        gender: gender === 'Outro' ? other_gender : gender,  nationality: ensureNull(nationality),
        marital_status: ensureNull(marital_status), education_level: ensureNull(education_level),
        social_program_access: ensureNull(social_program_access),  status_migratory: ensureNull(status_migratory),
        address_number: ensureNull(numero), address_complement: ensureNull(complemento), is_pcd: ensureNull(is_pcd) || false,  
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
        migrant, address, migrant_document
    };

    try {
        // Faz a requisição para atualizar o migrante na API
        await api.put(`/migrants/${migrantId}`, newData); 

        // Redireciona para a página de detalhes do migrante recém-atualizado
        res.render('migrants/redirect', { migrantId });
    } catch (error) {
        console.error(error);

        if (error.response && error.response.data) {
            return res.status(400).send({ message: error.response.data.message });
        }

        res.status(500).send({ message: 'Erro ao cadastrar o migrante.' });
    }
};

// Função para pesquisar migrante por email, documento ou telefone
const searchMigrant = async (req, res) => {
    try {
        const query = req.query.query; 
        const response = await api.get(`/migrants/search?q=${query}`);
        const migrants = response.data.migrants;


        if(!migrants || migrants.length === 0){
            res.render('migrants/migrantsList', { error: 'Nenhum resultado foi encontrado', migrants })
        }

        // Renderiza página de listagem com o migrante encontrado
        res.render('migrants/migrantsList', { migrants });
    } catch (error) {
        console.error('Erro ao buscar migrantes:', error);
        res.status(500).send('Erro ao buscar migrantes');
    }
};


// Função para verificar se email digitado já está cadastrado
const checkEmail = async (req, res) => {
    try {
        const email = req.body.email;
        
        // Enviar o email no corpo da requisição para a API
        const emailExistResponse = await api.post('/migrants/check-email', { email });

        const exists = emailExistResponse.data.exists;
        
        if (exists) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "Erro interno no servidor. Tente novamente mais tarde." });
    }
}

// Função para renderizar página de atualização de senha
const getUpdatePassword = async (req, res) => {
    const migrantData = req.body.migrant;
    const migrant = JSON.parse(migrantData); 
    res.render('migrants/migrantUpdatePassword', { migrant });
};

// Função para atualizar senha do migrante
const updatePassword = async (req, res) => {
    try {
        const { confirmPassword } = req.body;
        const migrantId = req.body.migrant_id;
        api.patch(`/migrants/change-password/${migrantId}`, {password: confirmPassword} );

        // Renderiza página com mensagem de sucesso  
        res.render('migrants/migrantUpdatePassword', { success: 'Senha atualizada com sucesso.' } );
    } catch (error) {
        console.error('Erro ao buscar alterar senhar:', error);
        return res.render('migrants/migrantUpdatePassword', { error: 'Erro ao atualizar senha do migrante.' });
    }
};

const getForms = async (req, res) => {
    try {
        const response = await api.get("/forms");
        const forms = response.data.forms;
        if(!forms || forms.length === 0){
            res.render('forms/formsList', { error: 'Nenhum resultado foi encontrado', forms })
        }
        res.render('forms/formsList', { forms, selectedStatus: "" });
    } catch (error) {
        console.error('Erro ao buscar formulários:', error);
        res.status(500).render('error', { message: 'Erro ao buscar formulários' });
    }
}

const getFormsByStatus = async (req, res) => {
    try {
        const status = req.query.status;
        const response = await api.get(`/forms/status/${status}`);
        const forms = response.data.forms;
        if (!forms || forms.length === 0) {
            return res.render('forms/formsList', { error: 'Nenhum resultado foi encontrado', forms: [] });
        }
        res.render('forms/formsList', { forms, selectedStatus: status  });
    } catch (error) {
        console.error('Erro ao buscar formulários: ', error);
        res.status(500).render('error', { message: 'Erro ao buscar formulários' });
    }
};

const formRead = async (req, res) => {
    try {
        const { form_id } = req.body;
        await api.put(`/forms/${form_id}`, { status: 'read'});
        req.flash('successMessage', 'Formulário marcado como "lido".')
        res.redirect('/dashboard/forms/migrants');
    } catch (error) {
        console.error('Erro ao atualizar status do formulário: ', error);
        res.status(500).render('error', { message: 'Erro ao atualiar formulário' })
    }
};

const formResolved = async (req, res) => {
    try {
        const { form_id } = req.body;
        await api.put(`/forms/${form_id}`, { status: 'resolved'});
        req.flash('successMessage', 'Formulário marcado como "resolvido".')
        res.redirect('/dashboard/forms/migrants');
    } catch (error) {
        console.error('Erro ao atualizar status do formulário: ', error);
        res.status(500).render('error', { message: 'Erro ao atualiar formulário' })
    }
};

const deleteForms = async (req, res) => {
    const { form_id } = req.body; 
    console.log(form_id);
    
    try {
        await api.delete(`/forms/${form_id}`);
        
        req.flash('successMessage', 'Formulário deletado com sucesso.')
        res.redirect('/dashboard/forms/migrants'); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao deletar o formulário.' });
    }
};
 
export default {
    getMigrants, getMigrantById, createMigrant, updateMigrant,
    deleteMigrant, searchMigrant, getEditMigrantForm, getRegisterMigrant,
    checkEmail, getUpdatePassword, updatePassword, getForms, getFormsByStatus,
    formRead, formResolved, deleteForms,
}
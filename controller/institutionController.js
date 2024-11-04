import { name } from 'ejs';
import { api } from '../config/config.js';

const getInstitutions = async (req, res) => {
    try {
        const response = await api.get("/institutions");
        const institutions = response.data.institutions;
        res.render('institutions/institutionList', { institutions })
    } catch (error) {
        console.error('Erro ao buscar instituições:', error);
        res.status(500).render('error', { message: 'Erro ao buscar instituições' });
    }
};

const createInstitution = async (req, res) => {
    const {
        name,
        cnpj,
        email,
        main_phone,
        secondary_phone,
        website,
        institution_category,
        instagram,
        main_language,
        second_language,
        link_maps,
        description_pt,
        description_en,
        description_fr,
        description_es,
        service_hours_pt,
        service_hours_en,
        service_hours_fr,
        service_hours_es,
        target_populations_pt,
        target_populations_en,
        target_populations_fr,
        target_populations_es,
        requirements_restrictions_pt,
        requirements_restrictions_en,
        requirements_restrictions_fr,
        requirements_restrictions_es,
        services_offered_pt,
        services_offered_en,
        services_offered_fr,
        services_offered_es,
        service_costs_pt,
        service_costs_en,
        service_costs_fr,
        service_costs_es,
        cep,
        street,
        neighborhood,
        city,
        state,
        numero,
        complemento,
        authorized,
        responsible_role,
        responsible_sector,
        responsible_position,
        responsible_name,
    } = req.body;

    // Função para garantir que os campos sejam null se não forem informados
    const ensureNull = (value) => (value === undefined || value === null || value === '') ? null : value;

    // Cria um objeto instituição, substituindo valores não informados por null
    const institution = {
        name: ensureNull(name),
        cnpj: ensureNull(cnpj),
        email: ensureNull(email),
        main_phone: ensureNull(main_phone),
        secondary_phone: ensureNull(secondary_phone),
        site: ensureNull(website),
        instagram: ensureNull(instagram),
        main_language: ensureNull(main_language),
        second_language: ensureNull(second_language),
        link_maps: ensureNull(link_maps),
        address_number: ensureNull(numero),
        address_complement: ensureNull(complemento),
        category_id: ensureNull(institution_category),
        authorized: authorized === "on" ? true : false,
    };

    const institution_descriptions = {
        description_pt: ensureNull(description_pt),
        description_en: ensureNull(description_en),
        description_fr: ensureNull(description_fr),
        description_es: ensureNull(description_es),
    }

    const service_hours = {
        service_hours_pt: ensureNull(service_hours_pt),
        service_hours_en: ensureNull(service_hours_en),
        service_hours_fr: ensureNull(service_hours_fr),
        service_hours_es: ensureNull(service_hours_es),
    }

    const target_population = {
        target_populations_pt: ensureNull(target_populations_pt),
        target_populations_en: ensureNull(target_populations_en),
        target_populations_fr: ensureNull(target_populations_fr),
        target_populations_es: ensureNull(target_populations_es),
    }

    const requirements_restrictions = {
        requirements_restrictions_pt: ensureNull(requirements_restrictions_pt),
        requirements_restrictions_en: ensureNull(requirements_restrictions_en),
        requirements_restrictions_fr: ensureNull(requirements_restrictions_fr),
        requirements_restrictions_es: ensureNull(requirements_restrictions_es),
    }

    const services_offered = {
        services_offered_pt: ensureNull(services_offered_pt),
        services_offered_en: ensureNull(services_offered_en),
        services_offered_fr: ensureNull(services_offered_fr),
        services_offered_es: ensureNull(services_offered_es),
    }

    const service_cost = {
        services_costs_pt: ensureNull(service_costs_pt),
        services_costs_en: ensureNull(service_costs_en),
        services_costs_fr: ensureNull(service_costs_fr),
        services_costs_es: ensureNull(service_costs_es),
    }

    const address = {
        cep: ensureNull(cep),
        street: ensureNull(street),
        neighborhood: ensureNull(neighborhood),
        city: ensureNull(city),
        state: ensureNull(state),
    };

    const responsible_user = {
        name: ensureNull(responsible_name),
        position: ensureNull(responsible_position),
        sector: ensureNull(responsible_sector),
        role: ensureNull(responsible_role),
    }

    const newData = {
        institution,
        address,
        institution_descriptions,
        service_hours,
        target_population,
        requirements_restrictions,
        services_offered,
        service_cost,
        responsible_user
    };


    try {
        // Faz a requisição para criar instituição na API
        const { data } = await api.post(`/institutions`, newData); 
        const institutionId = data.institution.id

        // Renderiza uma página que contém um formulário para redirecionar
        res.render('institutions/redirect', { institutionId });
    } catch (error) {
        console.error(error);

        // Verifica se há um erro específico retornado pela API
        if (error.response && error.response.data) {
            return res.status(400).send({ message: error.response.data.message });
        }

        // Em caso de erro desconhecido, retorna um erro genérico
        res.status(500).send({ message: 'Erro ao criar a instituição.' });
    }
};

const searchInstitutions = async (req, res) => {
    try {
        const query = req.query.query; 
        const response = await api.get(`/institutions/search?q=${query}`);
        const institutions = response.data.institutions;
        res.render('institutions/institutionList', { institutions });
    } catch (error) {
        console.error('Erro ao buscar instituições:', error);
        res.status(500).send('Erro ao buscar instituições');
    }
};

const getInstitutionById = async (req, res) => {

    const institutionId =  req.body.institution_id;

    console.log('ID da instituição recebido:', institutionId);
    console.log('Corpo da requisição (req.body):', req.body);

    if (!institutionId) {
        console.error('ID da instituição não foi fornecido.');
        return res.status(400).send({ message: 'ID da instituição não fornecido.' });
    }

    try {
        const response = await api.get(`/institutions/${institutionId}`);
        console.log('Resposta da API:', response.data);

        const institution = response.data.institution;
        if (!institution) {
            return res.status(404).send({ message: 'Instituição não encontrada.' });
        }

        res.render('institutions/institutionDetails', { institution });
    } catch (error) {
        console.error('Erro ao buscar detalhes da instituição:', error.message);
        res.status(500).send({ message: 'Erro ao obter os detalhes da instituição.' });
    }
};


const getEditInstitutionForm = async (req, res) => {
    const institutionId = req.body.institution_id; // Obtém o ID do instituição da rota

    try {
        // Busca o instituição pelo ID
        const response = await api.get(`/institutions/${institutionId}`);
        const responseCategories = await api.get('/categories');

        const categories = responseCategories.data.categories;
        const institution = response.data.institution;
        

        if (!institution) {
            return res.status(404).send({ message: 'Instituição não encontrado.' });
        }

        // Renderiza a página de edição da instituição
        res.render('institutions/institutionEdit', { institution, categories }); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao obter os detalhes da instituição para edição.' });
    }
};

const updateInstitution = async (req, res) => {
    // Extrai os dados do migrante do corpo da requisição
    const institutionId = req.params.id

    const {
        name,
        cnpj,
        email,
        main_phone,
        secondary_phone,
        website,
        institution_category,
        instagram,
        main_language,
        second_language,
        link_maps,
        description_pt,
        description_en,
        description_fr,
        description_es,
        service_hours_pt,
        service_hours_en,
        service_hours_fr,
        service_hours_es,
        target_populations_pt,
        target_populations_en,
        target_populations_fr,
        target_populations_es,
        requirements_restrictions_pt,
        requirements_restrictions_en,
        requirements_restrictions_fr,
        requirements_restrictions_es,
        services_offered_pt,
        services_offered_en,
        services_offered_fr,
        services_offered_es,
        service_costs_pt,
        service_costs_en,
        service_costs_fr,
        service_costs_es,
        cep,
        street,
        neighborhood,
        city,
        state,
        numero,
        complemento,
        category_name,
        responsible_name,
        responsible_position,
        responsible_sector,
        responsible_role,
    } = req.body;

    // Função para garantir que os campos sejam null se não forem informados
    const ensureNull = (value) => (value === undefined || value === null || value === '') ? null : value;

    // Cria um objeto migrante, substituindo valores não informados por null
    const institution = {
        name: ensureNull(name),
        cnpj: ensureNull(cnpj),
        email: ensureNull(email),
        main_phone: ensureNull(main_phone),
        secondary_phone: ensureNull(secondary_phone),
        website: ensureNull(website),
        institution_category: ensureNull(institution_category),
        instagram: ensureNull(instagram),
        main_language: ensureNull(main_language),
        second_language: ensureNull(second_language),
        link_maps: ensureNull(link_maps),
        address_number: ensureNull(numero),
        address_complement: ensureNull(complemento),
        category_id: ensureNull(institution_category),
    };

    const InstitutionDescription = {
        description_pt: ensureNull(description_pt),
        description_en: ensureNull(description_en),
        description_fr: ensureNull(description_fr),
        description_es: ensureNull(description_es),
    }

    const ServiceHour = {
        service_hours_pt: ensureNull(service_hours_pt),
        service_hours_en: ensureNull(service_hours_en),
        service_hours_fr: ensureNull(service_hours_fr),
        service_hours_es: ensureNull(service_hours_es),
    }

    const TargetPopulation = {
        target_populations_pt: ensureNull(target_populations_pt),
        target_populations_en: ensureNull(target_populations_en),
        target_populations_fr: ensureNull(target_populations_fr),
        target_populations_es: ensureNull(target_populations_es),
    }

    const RequirementRestriction = {
        requirements_restrictions_pt: ensureNull(requirements_restrictions_pt),
        requirements_restrictions_en: ensureNull(requirements_restrictions_en),
        requirements_restrictions_fr: ensureNull(requirements_restrictions_fr),
        requirements_restrictions_es: ensureNull(requirements_restrictions_es),
    }

    const ServicesOffered = {
        services_offered_pt: ensureNull(services_offered_pt),
        services_offered_en: ensureNull(services_offered_en),
        services_offered_fr: ensureNull(services_offered_fr),
        services_offered_es: ensureNull(services_offered_es),
    }

    const ServiceCost = {
        services_costs_pt: ensureNull(service_costs_pt),
        services_costs_en: ensureNull(service_costs_en),
        services_costs_fr: ensureNull(service_costs_fr),
        services_costs_es: ensureNull(service_costs_es),
    }

    const address = {
        cep: ensureNull(cep),
        street: ensureNull(street),
        neighborhood: ensureNull(neighborhood),
        city: ensureNull(city),
        state: ensureNull(state),
    };

    const newData = {
        institution,
        address,
        InstitutionDescription,
        ServiceHour,
        TargetPopulation,
        RequirementRestriction,
        ServicesOffered,
        ServiceCost,
    };


    try {
        // Faz a requisição para atualizar o migrante na API
        await api.put(`/institutions/${institutionId}`, newData); // Corrigido para enviar o id no URL

        // Redireciona para a página de detalhes do migrante recém-atualizado
       
       // Renderiza uma página que contém um formulário para redirecionar
       res.render('institutions/redirect', { institutionId });
    } catch (error) {
        console.error(error);

        // Verifica se há um erro específico retornado pela API
        if (error.response && error.response.data) {
            return res.status(400).send({ message: error.response.data.message });
        }

        // Em caso de erro desconhecido, retorna um erro genérico
        res.status(500).send({ message: 'Erro ao atualizar a instituição.' });
    }
};

const deleteInstitution = async (req, res) => {
    const institutiontId = req.body.institution_id; 

    try {
        await api.delete(`/institutions/${institutiontId}`);
        
        res.redirect('/admin/institutions'); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao deletar o migrante.' });
    }
};


const getRegisterInstitution = async (req, res) => {
    try {
        const responseCategories = await api.get('/categories');
        const categories = responseCategories.data.categories;
        res.render('institutions/institutionCreate', {categories}); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro no servidor.' });
    }
}

export default {
    getInstitutions,
    searchInstitutions,
    getInstitutionById,
    getEditInstitutionForm,
    updateInstitution,
    deleteInstitution,
    getRegisterInstitution,
    createInstitution,
}
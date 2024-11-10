// controllers/termControllerEjs.js
import { api } from '../config/config.js';  // Importa a variável api de config.js

// Função para renderizar a página de edição de termos
const editTermsPage = async (req, res) => {
    const { type } = req.params;  // O tipo de termo (exemplo: migrante, instituição

    try {
        // Fazendo uma requisição GET para buscar os termos pela API REST
        const response = await api.get(`/terms/${type}`);

        // Se o termo foi encontrado, renderiza a página EJS com os dados
        if (response.data.term) {
            res.render('editTerms', { 
                title: `Editar Termos para ${type}`,
                content: response.data.term.content,
                type: type,
            });
        } else {
            res.status(404).render('error', { message: `Termos não encontrados para ${type}` });
        }
    } catch (error) {
        console.error('Erro ao buscar os termos:', error);
        res.status(500).render('error', { message: 'Erro ao carregar os termos' });
    }
};


const getTermsPage = async (req, res) => {
   // Função para renderizar a página de edição de termos
    const { type } = req.params;  // O tipo de termo (exemplo: migrante, instituição)

    try {
        // Fazendo uma requisição GET para buscar os termos pela API REST
        const response = await api.get(`/terms/${type}`);
        const term = response.data.term;

        // Se o termo foi encontrado, renderiza a página EJS com os dados
        if (response.data.term) {
            res.render('terms', { term });
        } else {
            res.status(404).render('error', { message: `Termos não encontrados para ${type}` });
        }
    } catch (error) {
        console.error('Erro ao buscar os termos:', error);
        res.status(500).render('error', { message: 'Erro ao carregar os termos' });
    }
};

const getAllTerms = async (req, res) => {
    try {
        const response = await api.get('/terms');
        console.log(response.data);
        
        const terms = response.data.terms;

        if (terms.length === 0) {
            req.flash('errorMessage', 'Nenhum termo foi encontrado');
            return res.redirect('/dashboard/terms');
        }

        res.render('termList', { terms });

    } catch (error) {
        console.error('Erro ao buscar os termos:', error);
        req.flash('errorMessage', 'Erro ao carregar os termos. Tente novamente mais tarde.');
        res.status(500).render('error', { message: 'Erro ao carregar os termos, por favor, tente novamente mais tarde.' });
    }
};


const saveTermsPage = async (req, res) => {
    const { type } = req.body;
    const content = req.body.content;

    if (!content || !type) {
        return res.status(400).render('error', { message: 'Conteúdo ou tipo faltando' });
    }

    try {
        const response = await api.put('/terms', { content, type });

        if (response.status === 200) {
            req.flash("successMessage", "Alteração feita com sucesso!");
            return res.redirect(`/dashboard/edit-terms/${type}`)
        } else {
            res.status(500).render('error', { message: 'Falha ao salvar os termos' });
        }
    } catch (error) {
        console.error('Erro ao salvar os termos:', error);
        res.status(500).render('error', { message: 'Erro ao salvar os termos' });
    }
};

    


export default {
    editTermsPage,
    saveTermsPage,
    getTermsPage,
    getAllTerms,
};

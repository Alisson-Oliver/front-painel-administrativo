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

const saveTermsPage = async (req, res) => {
    const { type } = req.body;
    const content = req.body.content;

    // Verifique se o conteúdo e o tipo estão presentes
    if (!content || !type) {
        return res.status(400).render('error', { message: 'Conteúdo ou tipo faltando' });
    }

    try {
        // Chamada para a API que salva ou atualiza os termos
        const response = await api.put('/terms', { content, type });

        // Verifique a resposta da API
        if (response.status === 200) {

            req.flash("successMessage", "Alteração feita com sucesso!");
            // Redireciona para a página de edição dos termos com a mensagem de sucesso
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
    getTermsPage
};

import { api } from '../config/config.js';
import jwt from 'jsonwebtoken';

/*
*  Função de login, que autentica o usuário e redireciona para a página de dashboard.
*/
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await api.post('/login', { username, password });
        const authHeader = response.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
                req.session.user = decodedToken;
                req.session.token = token;

                const redirectUrl = req.session.returnTo || '/dashboard/migrants'; 
                delete req.session.returnTo; 

                return res.redirect(redirectUrl); 
            }
        }
        return res.render('login', { error: "Token inválido. Tente novamente." });
    } catch (error) {
        if(error.status === 401){
        return res.render('login', { error: 'Credenciais inválidas' });

        }                    
        return res.render('login', { error: 'Ocorreu um erro na autenticação. Tente novamente mais tarde.' });
    };
};

/*
*   Função de logout, que destroi a sessão do usuário e redireciona para a página de login.
*/
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard/migrants');
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/login');
    });
};

/*
*   Função que renderiza a página de login.
*/
const getLogin = (req, res) => {
    if(req.session && req.session.token){
        return res.redirect('/dashboard/migrants')
    }
    res.render('login');
};

/*
*   Função que renderiza a página inicial.
*/
const getHome = async (req, res) => {
    res.render('home');
};

const getManual = async (req, res) => {
    try {
        const response = await api.get('/pdfs');
        const pdfs = response.data.pdfs;
        res.render('manual', { pdfs });
    } catch (error) {
        console.error('Erro ao buscar o manual:', error);
        res.status(500).render('error', { message: 'Erro ao carregar o manual' });        
    }
};
const updateManual = async (req, res) => {
    try {
        const { pdf_id } = req.body;
        
        const name = req.body[`name_${pdf_id}`]; 
        const description = req.body[`description_${pdf_id}`];
        const url = req.body[`url_${pdf_id}`]; 
        const language = req.body.language;
        const updatePdf = { name, description, url, language };


        await api.put(`/pdfs/${pdf_id}`, updatePdf);

        req.flash('successMessage', 'Manual do Migrante atualizado com sucesso!');
        res.redirect('/dashboard/manual-migrante');  
    } catch (error) {
        console.error('Erro ao atualizar o manual:', error);
        req.flash('errorMessage', 'Erro ao atualizar o manual. Tente novamente mais tarde.');
        res.redirect('/dashboard/manual-migrante');
    };
};

export default {
    login, logout,
    getLogin, getHome,
    getManual,updateManual
}


import { api } from '../config/config.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Aqui você autentica o usuário e recebe o token
        const response = await api.post('/login', { username, password });
        const authHeader = response.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            // Decodificando o token para acessar as informações do usuário
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
                // Armazenando as informações do usuário na sessão
                req.session.user = decodedToken;

                 // Armazenando todas as informações do usuário
                req.session.token = token;

                // Redireciona para a página onde o usuário estava tentando acessar
                const redirectUrl = req.session.returnTo || '/dashboard/migrants'; 
                delete req.session.returnTo; // Remove a URL salva para evitar loops de redirecionamento

                return res.redirect(redirectUrl); // Redireciona para a página de destino
            }
        }
        // Caso não tenha token ou esteja inválido, retorna para a página de login
        return res.render('login', { error: "Token inválido. Tente novamente." });
    } catch (error) {
        return res.render('login', { error: 'Erro na autenticação.' });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard/migrants');
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/login');
    });
};


const getLogin = (req, res) => {
    if(req.session && req.session.token){
        return res.redirect('/dashboard/migrants')
    }
    res.render('login');
}

const getHome = async (req, res) => {
    res.render('home');
};

const getForms = async (req, res) => {
    try {
        const response = await api.get("/forms");
        const forms = response.data.forms;
        res.render('forms/formsList', { forms });
    } catch (error) {
        console.error('Erro ao buscar instituições:', error);
        res.status(500).render('error', { message: 'Erro ao buscar instituições' });
    }
}

export default {
    login,
    logout,
    getLogin,
    getHome,
    getForms,
}


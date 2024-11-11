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

export default {
    login, logout,
    getLogin, getHome,
}


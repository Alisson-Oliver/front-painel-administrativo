import { api } from '../config/config.js';
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await api.post('/admin/login', { userName: username, password });
        const token = response.headers['authorization'];

        if (token) {
            // Armazenar o token na sessão
            req.session.token = token;
            // Redirecionar para a página de migrantes
            return res.redirect('/admin/migrants');
        } else {
            // Renderizar a página de login com mensagem de erro
            return res.render('login', { error: "Token não recebido. Verifique suas credenciais." });
        }
    } catch (error) {
        // Tentar pegar a mensagem de erro da API
        let errorMessage = 'Credenciais inválidas ou erro na autenticação.'; // Mensagem padrão

        // Verifica se o erro tem uma resposta e se possui dados
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message; // Captura a mensagem de erro da API
        }

        // Renderizar a página de login com a mensagem de erro obtida
        return res.render('login', { error: errorMessage });
    }
};



const logout = (req, res) => {
    // Destruir a sessão do usuário
    req.session.destroy((err) => {
        if (err) {
            // Se ocorrer um erro ao destruir a sessão, você pode optar por redirecionar
            // o usuário de volta para a página de migrantes ou apresentar uma mensagem de erro.
            console.error("Erro ao destruir a sessão:", err); // Log do erro no console
            return res.redirect('/admin/migrants');
        }
        // Redirecionar para a página de login após destruir a sessão
        res.redirect('/login');
    });
};


const getLogin = (req, res) => {
    res.render('login');
}

export default {
    login,
    logout,
    getLogin
}


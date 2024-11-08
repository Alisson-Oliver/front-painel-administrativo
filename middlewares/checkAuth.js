import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
    const token = req.session.token;

    // Verificar se o token existe
    if (!token) {
        return res.redirect('/login');
    }

    // Verificar a validade do token
    try {
        // Decodificar o token usando a chave secreta do servidor
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adicionar o usuário decodificado à requisição
        next(); // Permitir que a requisição continue
    } catch (err) {
        // Caso o token seja inválido ou expirado
        return res.redirect('/login');
    }
};

export default {
    auth
};

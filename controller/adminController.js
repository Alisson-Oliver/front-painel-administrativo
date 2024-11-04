import { api } from '../config/config.js';

const getLoginAdmin = async (req, res) => {
    res.render('login');
};

export default {
    getLoginAdmin,
}
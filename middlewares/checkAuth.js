const auth = (req, res, next) => {
    if (!req.session.token) {
        return res.redirect('/login'); 
    }
    next();
};

export default {
    auth
}
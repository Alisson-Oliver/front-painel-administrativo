import express from 'express';
import dashboardRoutes from './routes/dashboardRoutes.js';
import loginRoutes from './routes/loginRoutes.js'
import config from './config/config.js';
import session from 'express-session';
import flash from 'connect-flash';
import publicRoutes from './routes/publicRoutes.js';
const app = express();

/* 
* Configuração do middleware para processar dados do corpo
*/
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

/* 
* Configuração do EJS
*/
app.set('view engine', 'ejs');
app.use(express.static('public')); 

/* 
* Configuração do middleware para sessão
*/
app.use(session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } ,
    secure: true,
    sameSite: 'Strict'  
}));

/* 
* Configuração do middleware para flash messages
*/
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null; 
    next();
});


app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    next();
});

/* 
* Middleware para verificar se o usuário está logado
*/
app.use((req, res, next) => {
    if (!req.session.user && req.originalUrl !== '/login' && req.originalUrl !== '/register') {
        req.session.returnTo = req.originalUrl; 
    }
    next();
});

/*
* Configuração das rotas
*/
app.use("/dashboard", dashboardRoutes);
app.use("/", loginRoutes, publicRoutes);

/* 
* Middleware para capturar páginas não encontradas (404)
*/
app.use((req, res, next) => {
    res.status(404).render('404');
});

/* 
* Inicia o servidor
*/
app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
});

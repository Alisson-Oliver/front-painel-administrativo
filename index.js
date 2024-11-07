import express from 'express';
import adminRoutes from './routes/adminRoutes.js';
import loginRoutes from './routes/loginRoutes.js'
import config from './config/config.js';
import session from 'express-session';
import flash from 'connect-flash';
import publicRoutes from './routes/publicRoutes.js';

const app = express();


app.use(session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));

app.use(flash());

// Middleware para enviar mensagens flash
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');  // Torna a mensagem acessível no template
    next();
});


// Configuração do middleware para processar dados do corpo
app.use(express.json()); // Para processar JSON
app.use(express.urlencoded({ extended: true })); // Para processar dados de formulários

app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'


// Configuração das rotas
app.use("/admin", adminRoutes);
app.use("/", loginRoutes, publicRoutes);

// Middleware para capturar páginas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Inicia o servidor
app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
});

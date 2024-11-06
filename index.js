import express from 'express';
import adminRoutes from './routes/adminRoutes.js';
import loginRoutes from './routes/loginRoutes.js'
import config from './config/config.js';
import session from 'express-session';

const app = express();


app.use(session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));

// Configuração do middleware para processar dados do corpo
app.use(express.json()); // Para processar JSON
app.use(express.urlencoded({ extended: true })); // Para processar dados de formulários

app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'


// Configuração das rotas
app.use("/admin", adminRoutes);
app.use("/", loginRoutes);

// Inicia o servidor
app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
});

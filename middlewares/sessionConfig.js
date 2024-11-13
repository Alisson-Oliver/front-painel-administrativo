import express from 'express';
import session from 'express-session';
import PgSession from 'connect-pg-simple';
import pkg from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

/* 
* Criação do Pool de Conexão PostgreSQL
*/
const pgPool = new Pool({
    user: process.env.DB_TEST_USER,
    host: process.env.DB_TEST_HOST,
    database: process.env.DB_TEST_NAME,
    password: process.env.DB_TEST_PWD,
    port: process.env.DB_TEST_PORT,
});

/*
* Criação do Store para armazenar as sessões no PostgreSQL
*/
const pgSessionStore = new PgSession(session);

/*
* Configuração do middleware de sessão
*/
const sessionMiddleware = session({
    store: new pgSessionStore({
        pool: pgPool,  
        tableName: 'sessions',  
        ttl: 60 * 60 * 24,  
        cleanInterval: 60 * 60 * 1000,  
    }),
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    },
});


export default sessionMiddleware;

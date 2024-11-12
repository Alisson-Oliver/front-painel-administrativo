import Sequelize from 'sequelize';
import pkg from 'pg';
const { Pool } = pkg;

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Create the database connection
// Configure the certificate later

const pgPool = new Pool({
    user: process.env.DB_TEST_USER,
    host: process.env.DB_TEST_HOST,
    database: process.env.DB_TEST_NAME,
    password: process.env.DB_TEST_PWD,
    port: process.env.DB_TEST_PORT,
});

export default pgPool;

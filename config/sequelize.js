import Sequelize from 'sequelize';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Create the database connection
// Configure the certificate later
const connection = new Sequelize(process.env.DB_TEST_NAME, process.env.DB_TEST_USER, process.env.DB_TEST_PWD, {
    host: process.env.DB_TEST_HOST,
    dialect: process.env.DB_TEST_DIALECT,
    port: process.env.DB_TEST_PORT,
    timezone: process.env.DB_TEST_TZ,
    logging: false
});

export default connection;
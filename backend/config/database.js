require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize with the MySQL connection details
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false 
    }
);

module.exports = sequelize;
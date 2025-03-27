const pg = require('pg');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
});

module.exports = sequelize;

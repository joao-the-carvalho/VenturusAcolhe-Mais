const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: 'false',
})

    sequelize.authenticate()
    .then(() => console.log('Conexão com banco de dados realizada'))
    .catch(err => console.error('Erro ao conectar com o banco de dados', err))
module.exports = sequelize
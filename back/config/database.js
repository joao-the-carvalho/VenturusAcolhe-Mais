// config/database.js
require('dotenv').config(); // Certifique-se de chamar o dotenv primeiro!

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,    // Nome do banco de dados
  process.env.DB_USER,    // Usuário do banco de dados
  process.env.DB_PASSWORD, // Senha do banco de dados
  {
    host: process.env.DB_HOST, // Endereço do banco
    dialect: 'mysql',         // Tipo de banco de dados
    logging: false,           // Desativa os logs de SQL (opcional)
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = sequelize;

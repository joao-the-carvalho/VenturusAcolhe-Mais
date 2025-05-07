// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // ou onde você está configurando o sequelize

const User = sequelize.define('User', {
  nome: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true  // Apenas isso já cria o índice único
  },
  senha: DataTypes.STRING,
  cargo: DataTypes.ENUM('usuario', 'psicologo')
});
module.exports = User;

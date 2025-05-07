// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // ou onde você está configurando o sequelize

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;

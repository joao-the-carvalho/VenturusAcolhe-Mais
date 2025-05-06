const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: True },
    password: DataTypes.STRING,
    role: DataTypes.ENUM('usuario', 'psicologo')
})
module.exports = User
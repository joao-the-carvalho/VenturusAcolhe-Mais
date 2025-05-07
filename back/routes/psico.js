module.exports = (sequelize, DataTypes) => {
    const psico = sequelize.define('psico', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      especialidade: DataTypes.STRING
    })
    return psico
  }
  
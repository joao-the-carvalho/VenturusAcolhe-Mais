module.exports = (sequelize, DataTypes) => {
    const psico = sequelize.define('psico', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      specialty: DataTypes.STRING
    })
    return psico
  }
  
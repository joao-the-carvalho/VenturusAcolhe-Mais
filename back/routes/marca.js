module.exports = (sequelize, DataTypes) => {
    const marcar = sequelize.define('marcar', {
      date: DataTypes.DATE,
      message: DataTypes.TEXT
    })
    return marcar
  }
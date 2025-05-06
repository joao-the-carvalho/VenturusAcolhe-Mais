const Sequelize = require('sequelize')
const config = require('../config/database').development

const sequelize = new Sequelize(config)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./user')(sequelize, Sequelize.DataTypes)
db.Psychologist = require('./psychologist')(sequelize, Sequelize.DataTypes)
db.Appointment = require('./appointment')(sequelize, Sequelize.DataTypes)

db.User.hasMany(db.Appointment)
db.Psychologist.hasMany(db.Appointment)
db.Appointment.belongsTo(db.User)
db.Appointment.belongsTo(db.Psychologist)

module.exports = db
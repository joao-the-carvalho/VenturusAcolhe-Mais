require('dotenv').config()
const app = require('.')
const { sequelize } = require('./models')

const PORT = process.env.PORT || 3000

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
})
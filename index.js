const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize = require('./config/database')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger/swagger.json')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// rotas
app.use('/api', require('./routes/authRotas'))
app.use('/api', require('./routes/user'))
app.use('/api', require('./routes/marca'))

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// iniciar servidor
const PORT = process.env.PORT || 3000

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`rodando na porta ${PORT}`))
})

sequelize.query('SELECT * FROM users').then(result => {
  console.log(result); // Mostra o resultado da query no terminal
});
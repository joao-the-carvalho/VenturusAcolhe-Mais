const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize = require('./config/database')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger/swagger.json')
const path = require('path')
const fs = require('fs')

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


app.use(express.static(path.join(__dirname, '../front')));


const frontDir = path.join(__dirname, '../front')

// Rota para o index.html
app.get('/list', (req, res) => {
  fs.readdir(frontDir, (err, files) => {
    if (err) {
      return res.status(500).send('Erro ao ler o diretório.')
    }

    res.send(`
      <h1>Conteúdo da pasta "front"</h1>
      <ul>
        ${files.map(file => `<li><a href="/${file}">${file}</a></li>`).join('')}
      </ul>
    `)
  })
})

app.use(express.static(frontDir))

// Rota para o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(frontDir, '/headerfooter/index.htm'))
})

// iniciar servidor
const PORT = process.env.PORT || 3000

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`rodando na porta ${PORT}`))
})

sequelize.query('SELECT * FROM users').then(result => {
  console.log(result); // Mostra o resultado da query no terminal
});

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
app.use(express.urlencoded({ extended: true })) // necessário pro form

// rotas
app.use('/api', require('./routes/authRotas')); 
app.use('/api', require('./routes/user'))  // Rota para o user
app.use('/api', require('./routes/marca'))

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Diretório front
const frontDir = path.join(__dirname, '../front')

// Serve arquivos estáticos do diretório 'front'
app.use(express.static(frontDir))

// Rota para listar os arquivos da pasta 'front'
app.get('/list', (req, res) => {
  fs.readdir(frontDir, (err, files) => {
    if (err) {
      return res.status(500).send('Erro ao ler o diretório.')
    }

    const fileLinks = files.map(file => {
      const fileUrl = `/front/${file}`
      return `<li><a href="${fileUrl}" target="_blank">${file}</a></li>`
    }).join('')

    res.send(`
      <h1>Conteúdo da pasta "front"</h1>
      <ul>
        ${fileLinks}
      </ul>
    `)
  })
})

// Rota para o arquivo index.html (verifique se o caminho está certo)
app.get('/', (req, res) => {
  res.sendFile(path.join(frontDir, 'headerfooter', 'index.htm'))  // Corrigido o caminho
})

// iniciar servidor
const PORT = process.env.PORT || 3000

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))
})

sequelize.query('SELECT * FROM users').then(result => {
  console.log(result) // Mostra o resultado da query no terminal
})

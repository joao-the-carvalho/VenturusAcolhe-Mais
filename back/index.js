const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger/swagger.json')
const path = require('path')
const fs = require('fs')
const { PrismaClient } = require('@prisma/client')

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use('/', require('./routes/authRotas'))

app.use(express.urlencoded({ extended: true }))

// Função para registrar o psicólogo
const createPsico = async (req, res) => {
  const { nome, email, telefone, senha } = req.body

  try {
    const novoPsicologo = await prisma.psicologo.create({
      data: {
        nome,
        email,
        telefone,
        senha
      }
    })

    return res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!', psicologo: novoPsicologo })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ mensagem: 'Erro ao cadastrar psicólogo, tente novamente.' })
  }
}

// Função de login
const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;  // Apenas email e senha

  try {
    // Consulta na tabela de usuários (pacientes)
    const usuario = await prisma.user.findUnique({
      where: { email }
    });

    // Se o usuário não for encontrado
    if (!usuario) {
      return res.status(400).json({ mensagem: 'Usuário não encontrado' });
    }

    // Verifica se a senha fornecida é a mesma que a armazenada
    if (usuario.senha !== senha) {
      return res.status(400).json({ mensagem: 'Senha incorreta' });
    }

    // Se tudo estiver certo, retorna sucesso
    return res.status(200).json({ mensagem: 'Login bem-sucedido', usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro ao realizar login' });
  }
}
const loginPsicologo = async (req, res) => {
  const { email, senha } = req.body;  // Apenas email e senha

  try {
    // Consulta na tabela de psicólogos
    const psicologo = await prisma.psicologos.findUnique({
      where: { email }
    });

    // Se o psicólogo não for encontrado
    if (!psicologo) {
      return res.status(400).json({ mensagem: 'Psicólogo não encontrado' });
    }

    // Verifica se a senha fornecida é a mesma que a armazenada
    if (psicologo.senha !== senha) {
      return res.status(400).json({ mensagem: 'Senha incorreta' });
    }

    // Se tudo estiver certo, retorna sucesso
    return res.status(200).json({ mensagem: 'Login bem-sucedido', psicologo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro ao realizar login' });
  }
}


// Rota no servidor para o cadastro de um usuário
app.post('/registro', (req, res) => {
  const { nome, email, telefone, senha } = req.body;

  // Lógica para salvar no banco de dados ou validar os dados
  res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' });
});


// Rota POST para login
app.post('/api/login', loginUsuario)  // Rota para login

// Rota POST para cadastro de psicólogos
app.post('/api/cadastro', createPsico)  // Confirme que você tem a função aqui!

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Diretório front
const frontDir = path.join(__dirname, '../front')
app.use(express.static(frontDir))

// Listar arquivos
app.get('/list', (req, res) => {
  fs.readdir(frontDir, (err, files) => {
    if (err) return res.status(500).send('Erro ao ler o diretório.')

    const fileLinks = files.map(file => {
      const fileUrl = `/front/${file}`
      return `<li><a href="${fileUrl}" target="_blank">${file}</a></li>`
    }).join('')

    res.send(`<h1>Conteúdo da pasta "front"</h1><ul>${fileLinks}</ul>`)
  })
})

// Rotas para o front
app.get('/', (req, res) => {
  res.sendFile(path.join(frontDir, 'headerfooter', 'index.htm'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(frontDir, 'testelogin.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(frontDir, 'testeregistro.html'))
})

app.get('/cadastrarpsicologo', (req, res) => {
  res.sendFile(path.join(frontDir, 'psicoregis.html'))
})

// Iniciar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))

// controllers/userControle.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createUser = async (req, res) => {
  const { nome, email, senha, cargo } = req.body

  if (!nome || !email || !senha || !cargo) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' })
  }

  try {
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha,
        cargo
      }
    })

    return res.status(201).json({ mensagem: 'Usuário criado com sucesso', user })
  } catch (erro) {
    console.error('erro detalhado:', erro)
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message || erro })
  }
}


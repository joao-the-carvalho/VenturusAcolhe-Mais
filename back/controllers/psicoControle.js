// controllers/userControle.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createPsico = async (req, res) => {
  const { nome, email, senha, especialidades, crp, termos } = req.body

  if (!nome || !email || !senha || !especialidades || !crp || !termos) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' })
  }

  try {
    const psico = await prisma.psicologos.create({
      data: {
        nome,
        email,
        senha,
        especialidades,
        crp,
        termsAccepted: termos
      }
    })

    return res.status(201).json({ mensagem: 'Usuário criado com sucesso', psico })
  } catch (erro) {
    console.error('erro detalhado:', erro)
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message || erro })
  }
}
 
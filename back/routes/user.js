// userRotas.js
const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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

// Rota POST para cadastro de psicólogos
router.post('/cadastro', createPsico)

module.exports = router

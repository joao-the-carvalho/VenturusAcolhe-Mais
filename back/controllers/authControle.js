const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const gerarToken = (id, tipo) => {
  return jwt.sign({ id, tipo }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

exports.register = async (req, res) => {
  const { nome, email, senha, tipo } = req.body

  if (!nome || !email || !senha || !tipo) return res.status(400).json({ msg: 'faltando dados' })

  try {
    const existe = await User.findOne({ where: { email } })
    if (existe) return res.status(400).json({ msg: 'email já usado' })

    const senhaHash = await bcrypt.hash(senha, 10)
    const user = await User.create({ nome, email, senha: senhaHash, tipo })

    const token = gerarToken(user.id, user.tipo)

    res.status(201).json({ user: { id: user.id, nome, email, tipo }, token })
  } catch (err) {
    res.status(500).json({ msg: 'erro ao registrar', erro: err.message })
  }
}

exports.login = async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) return res.status(400).json({ msg: 'faltando dados' })

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(400).json({ msg: 'email não encontrado' })

    const ok = await bcrypt.compare(senha, user.senha)
    if (!ok) return res.status(401).json({ msg: 'senha inválida' })

    const token = gerarToken(user.id, user.tipo)

    res.status(200).json({ user: { id: user.id, nome: user.nome, email, tipo: user.tipo }, token })
  } catch (err) {
    res.status(500).json({ msg: 'erro no login', erro: err.message })
  }
}

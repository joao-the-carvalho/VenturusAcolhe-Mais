const User = require('../models/User')

exports.login = async (req, res) => {
  const { email, senha } = req.body
  
console.log('Dados recebidos:', email, senha);

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' })
  }

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }

    // Comparando as senhas diretamente sem bcrypt
    if (user.senha !== senha) {
      return res.status(401).json({ mensagem: 'Senha incorreta' })
    }

    return res.status(200).json({
      mensagem: 'Login bem-sucedido',
      nome: user.nome,
      email: user.email,
      cargo: user.cargo
    })

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ mensagem: 'Erro no servidor' })
  }
}

exports.register = async (req, res) => {
  const { nome, email, senha, cargo } = req.body

  if (!nome || !email || !senha || !cargo) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' })
  }

  try {
    const userExistente = await User.findOne({ where: { email } })
    if (userExistente) {
      return res.status(409).json({ mensagem: 'Email já cadastrado' })
    }

    // Criando o novo usuário com a senha em texto puro
    const novoUser = await User.create({
      nome,
      email,
      senha,
      cargo
    })

    return res.status(201).json({ mensagem: 'Usuário registrado com sucesso' })

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ mensagem: 'Erro no servidor' })
  }
}

// controllers/userControle.js
const User = require('../models/User');  // Corrigir a importação

exports.createUser = async (req, res) => {
  const { nome, email, senha, cargo } = req.body;

  if (!nome || !email || !senha || !cargo) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' });
  }

  try {
    // Criando o usuário no banco de dados
    const user = await User.create({
      nome,
      email,
      senha,
      cargo
    });

    return res.status(201).json({ mensagem: 'Usuário criado com sucesso', user });
  } catch (erro) {
    console.error('erro detalhado:', erro)
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message || erro })
  }
  
};

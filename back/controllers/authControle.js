const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    if (user.senha !== senha) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    return res.status(200).json({
      mensagem: 'Login bem-sucedido',
      nome: user.nome,
      email: user.email,
      cargo: user.cargo
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};

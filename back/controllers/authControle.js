// controllers/authControle.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função de login
exports.login = async (req, res) => {
  const { email, senha, tipoUsuario, crp } = req.body;

  console.log('tentativa de login:', email, tipoUsuario);

  if (!email || !senha || !tipoUsuario) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios' });
  }

  try {
    let user;

    if (tipoUsuario === 'paciente') {
      user = await prisma.user.findUnique({ where: { email } });
    } else if (tipoUsuario === 'psicologo') {
      user = await prisma.psicologos.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ mensagem: 'Psicólogo não encontrado' });
      }

      if (user.crp !== crp) {
        return res.status(401).json({ mensagem: 'CRP incorreto' });
      }
    } else {
      return res.status(400).json({ mensagem: 'Tipo de usuário inválido' });
    }

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
      id: user.id
    });

  } catch (erro) {
    console.error('erro no login:', erro);
    return res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};

// Função de registro
exports.register = async (req, res) => {
  const { nome, email, senha, telefone } = req.body

  if (!nome || !email || !senha || !telefone) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' })
  }

  try {
    const userExistente = await prisma.user.findUnique({ where: { email } })

    if (userExistente) {
      return res.status(409).json({ mensagem: 'Email já cadastrado' })
    }

    await prisma.user.create({
      data: {
        nome,
        email,
        senha,
        telefone // adiciona esse campo no create também
      }
    })

    return res.status(201).json({ mensagem: 'Usuário registrado com sucesso' })

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ mensagem: 'Erro no servidor' })
  }
}


// Função de cadastrar psicólogo
exports.cadastrarPsicologo = async (req, res) => {
  console.log('Dados recebidos:', req.body); // Adicione isso para verificar os dados recebidos

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { nome, email, senha, especialidades, crp, termsAccepted } = req.body;

    if (!nome || !email || !senha || !crp || !termsAccepted) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const existingEmail = await prisma.psicologos.findUnique({
      where: { email }
    });

    if (existingEmail) {
      return res.status(400).json({ message: 'Este email já está cadastrado' });
    }

    const existingCRP = await prisma.psicologos.findUnique({
      where: { crp }
    });

    if (existingCRP) {
      return res.status(400).json({ message: 'Este CRP já está cadastrado' });
    }

    const novoPsicologo = await prisma.psicologos.create({
      data: {
        nome,
        email,
        senha,
        especialidades,
        crp,
        termsAccepted
      }
    });

    const { senha: _, ...psicologoData } = novoPsicologo;

    return res.status(201).json({
      message: 'Psicólogo cadastrado com sucesso!',
      data: psicologoData
    });
  } catch (error) {
    console.error('Erro ao cadastrar psicólogo:', error);
    return res.status(500).json({
      message: 'Erro interno do servidor',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
};
const { Psicologos } = require('../models')  // Verifique se você está importando corretamente os modelos

// Função de cadastro do psicólogo
const cadastrarPsicologo = async (req, res) => {
    const { nome, email, senha, especialidades, crp, termos } = req.body

    // Validação simples de campos obrigatórios
    if (!nome || !email || !senha || !especialidades || !crp || termos === undefined) {
        return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios." })
    }

    try {
        // Salva o psicólogo no banco
        const novoPsicologo = await Psicologos.create({ nome, email, senha, especialidades, crp, termos })
        res.status(201).json({ mensagem: "Psicólogo cadastrado com sucesso!" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ mensagem: "Erro ao cadastrar psicólogo. Tente novamente." })
    }
}

module.exports = { cadastrarPsicologo }
exports.loginPsicologo = async (req, res) => {
  const { email, senha, crp } = req.body

  if (!email || !senha || !crp) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios' })
  }

  try {
    const psicologo = await prisma.Psicologos.findFirst({
      where: {
        email,
        senha,
        crp
      }
    })

    if (!psicologo) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' })
    }

    res.status(200).json({ mensagem: 'Login realizado com sucesso', psicologo })
  } catch (err) {
    console.error(err)
    res.status(500).json({ mensagem: 'Erro ao realizar login' })
  }
}


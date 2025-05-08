const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControle');

router.post('/cadastro', authController.register)
router.post('/login', authController.login);
router.post('/auth/cadastrarpsicologo', authController.cadastrarPsicologo)
router.post('/auth/login-psicologo', authController.loginPsicologo)

module.exports = router;

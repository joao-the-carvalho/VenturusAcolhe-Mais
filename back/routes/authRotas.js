const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControle');  // Verifique se o caminho está correto

// Rota para login
router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router;

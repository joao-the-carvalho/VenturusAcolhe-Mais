// routes/user.js
const express = require('express');
const router = express.Router();
const userControle = require('../controllers/userControle'); // Certifique-se de que o caminho está correto

// Rota para criar um novo usuário
router.post('/user', userControle.createUser);

module.exports = router;

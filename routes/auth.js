// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Credenciales de usuario
const USER = {
  email: 'admin@admin.com',
  password: 'admin',
};

// Clave secreta para JWT
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Validar credenciales
  if (email === USER.email && password === USER.password) {
    // Generar token sin fecha de expiración
    const token = jwt.sign({ email }, SECRET_KEY);  // Sin expiresIn
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

module.exports = router;

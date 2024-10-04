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

  // Validar que el email y password estén presentes
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Validar credenciales
  if (email === USER.email && password === USER.password) {
    try {
      // Generar token sin fecha de expiración
      const token = jwt.sign({ email }, SECRET_KEY); // Sin expiresIn
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Error al generar el token' });
    }
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

module.exports = router;

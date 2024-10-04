// rutas/autenticacion.js
const express = require('express');
const enrutador = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Datos de usuario
const CREDENCIALES = {
  correo: 'admin@admin.com',
  contraseña: 'admin',
};

// Clave secreta para JWT
const CLAVE_SECRETA = process.env.SECRET_KEY;

enrutador.post('/', (req, res) => {
  const { correo, contraseña } = req.body;

  // Verificar credenciales
  if (correo === CREDENCIALES.correo && contraseña === CREDENCIALES.contraseña) {
    // Generar token sin fecha de expiración
    const tokenJWT = jwt.sign({ correo }, CLAVE_SECRETA);  // Sin expiresIn
    res.json({ token: tokenJWT });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

module.exports = enrutador;

// servidor.js
const express = require('express');
const aplicacion = express();
const rutasAutenticacion = require('./routes/auth');
const rutasClima = require('./routes/weather');
require('dotenv').config();

// Middleware
aplicacion.use(express.json());

// Configuración de rutas
aplicacion.use('/login', rutasAutenticacion);
aplicacion.use('/clima', rutasClima);

// Manejo de rutas no existentes
aplicacion.use((solicitud, respuesta) => {
  respuesta.status(404).json({ mensaje: 'La ruta solicitada no existe' });
});

// Iniciar el servidor
const PUERTO = process.env.PORT || 3000;
aplicacion.listen(PUERTO, () => {
  console.log(`El servidor está corriendo en el puerto ${PUERTO}`);
});

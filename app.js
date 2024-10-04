// server.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
require('dotenv').config();

// Validar que la clave secreta y el puerto estén definidos en el archivo .env
if (!process.env.SECRET_KEY) {
  throw new Error('Falta la clave secreta en las variables de entorno (SECRET_KEY)');
}

if (!process.env.PORT) {
  console.warn('El puerto no está definido en las variables de entorno. Usando el puerto por defecto: 3000');
}

// Middlewares
app.use(express.json());

// Rutas
app.use('/login', authRoutes);
app.use('/weather', weatherRoutes);

// Manejo de rutas no definidas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

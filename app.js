// server.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
require('dotenv').config();

// Middlewares
app.use(express.json());

// Validar que la clave secreta esté definida
if (!process.env.SECRET_KEY) {
  console.error('Falta la clave secreta en las variables de entorno (SECRET_KEY). El servidor no podrá manejar autenticaciones.');
}

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

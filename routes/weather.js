const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  const { latitude, longitude } = req.query;

  // Validar que los parámetros existan y sean números válidos
  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Se requieren los parámetros latitude y longitude' });
  }

  // Validar que latitude y longitude sean números válidos
  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Los parámetros latitude y longitude deben ser números válidos' });
  }

  try {
    // Realizar la solicitud a Open Meteo
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        current_weather: true,
      },
    });

    const temperature = response.data.current_weather.temperature;

    res.json({ temperature });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los datos meteorológicos' });
  }
});

module.exports = router;

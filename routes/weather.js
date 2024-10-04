// rutas/clima.js
const express = require('express');
const enrutador = express.Router();
const axios = require('axios');
const middlewareAutenticacion = require('../middleware/authMiddleware');

enrutador.get('/', middlewareAutenticacion, async (solicitud, respuesta) => {
  const { latitud, longitud } = solicitud.query;

  // Comprobar que los parámetros existen
  if (!latitud || !longitud) {
    return respuesta.status(400).json({ mensaje: 'Los parámetros latitud y longitud son necesarios' });
  }

  try {
    // Hacer la petición a Open Meteo
    const resultado = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: latitud,
        longitude: longitud,
        current_weather: true,
      },
    });

    const temperatura = resultado.data.current_weather.temperature;

    respuesta.json({ temperatura });
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({ mensaje: 'Error al obtener los datos del clima' });
  }
});

module.exports = enrutador;

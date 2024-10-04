// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: 'Se requiere autenticación' });
  }

  const token = authHeader.split(' ')[1];

  // Validar que el token no sea vacío o no definido
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Token no proporcionado o formato inválido' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;

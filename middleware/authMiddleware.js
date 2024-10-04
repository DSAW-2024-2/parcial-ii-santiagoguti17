// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(403).json({ message: 'Se requiere autenticación' });
  }
}

module.exports = authMiddleware;

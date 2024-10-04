const jwt = require('jsonwebtoken');

const CLAVE_SECRETA = process.env.SECRET_KEY;

function verificarToken(req, res, next) {
  const encabezadoAutorizacion = req.headers.authorization;

  if (!encabezadoAutorizacion) {
    return res.status(403).json({ mensaje: 'Se requiere autenticación' });
  }

  const partes = encabezadoAutorizacion.split(' ');
  const token = partes.length === 2 ? partes[1] : null;

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, CLAVE_SECRETA, (error, usuarioDecodificado) => {
    if (error) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
    req.usuario = usuarioDecodificado;
    next();
  });
}

module.exports = verificarToken;

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

module.exports = async (req, res, next) => {
  // Lê o token do cookie
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ error: 'Acesso negado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

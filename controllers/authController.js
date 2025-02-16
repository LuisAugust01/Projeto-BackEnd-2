const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarioModel');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).json({ error: 'Usuário não encontrado' });

  const isMatch = await bcrypt.compare(senha, usuario.senha);
  if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' });

  const token = jwt.sign({ id: usuario._id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  // Define o cookie com o token
  res.cookie('token', token, {
    httpOnly: true, // não permite acesso via JavaScript no cliente
    secure: process.env.NODE_ENV === 'production', // somente envia via HTTPS em produção
    maxAge: 3600000 // 1 hora em milissegundos
  });
  
  // Você pode optar por não enviar o token no corpo também
  res.json({ sucesso: true });
};


exports.registro = async (req, res) => {
  const { nome, email, senha, role } = req.body;
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) return res.status(400).json({ error: 'Usuário já existe' });

  const usuario = new Usuario({ nome, email, senha, role });
  await usuario.save();
  res.status(201).json(usuario);
};

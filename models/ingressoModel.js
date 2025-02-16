const mongoose = require('mongoose');

const ingressoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  quantidadeDisponivel: { type: Number, required: true },
});

const Ingresso = mongoose.model('Ingresso', ingressoSchema);

module.exports = Ingresso;

const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  ingressos: [
    {
      ingressoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingresso', required: true },
      quantidade: { type: Number, required: true },
    },
  ],
  data: { type: Date, default: Date.now },
});

const Compra = mongoose.model('Compra', compraSchema);

module.exports = Compra;

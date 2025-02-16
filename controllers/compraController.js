const Ingresso = require('../models/ingressoModel');
const Compra = require('../models/compraModel');

exports.comprarIngresso = async (req, res) => {
  try {
    const { ingressoIds, quantidades } = req.body;

    if (!ingressoIds || !quantidades || ingressoIds.length !== quantidades.length) {
        return res.status(400).json({ sucesso: false, mensagem: 'Dados inválidos para a compra.' });
    }

    let total = 0;
    const ingressosComprados = [];

    for (let i = 0; i < ingressoIds.length; i++) {
        const ingressoId = ingressoIds[i];
        const quantidade = parseInt(quantidades[i], 10);

        if (isNaN(quantidade)) {
            return res.status(400).json({ sucesso: false, mensagem: 'Quantidade inválida para um ingresso.' });
        }

        const ingresso = await Ingresso.findById(ingressoId);
        if (!ingresso || ingresso.quantidadeDisponivel < quantidade) {
            return res.status(400).json({ sucesso: false, mensagem: 'Estoque insuficiente ou ingresso não encontrado.' });
        }

        ingresso.quantidadeDisponivel -= quantidade;
        await ingresso.save();

        total += ingresso.preco * quantidade;
        ingressosComprados.push({ ingressoId, quantidade });
    }

    const compra = new Compra({
        usuarioId: req.user.id,
        ingressos: ingressosComprados,
        total
    });

    await compra.save();
    res.render('sucesso', {mensagem: 'compra feita com sucesso.'})

} catch (error) {
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao processar a compra.', erro: error.message });
}};
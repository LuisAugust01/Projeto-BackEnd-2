const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const authMiddleware = require('../middlewares/authMiddleware');
const Ingresso = require('../models/ingressoModel');

// Rota para verificar o estoque
router.post('/verificar-estoque', async (req, res) => {
  const compras = req.body.compras; // Compras é um array de objetos { id, quantidade }

  try {
    // Verificar cada ingresso
    for (let compra of compras) {
      const ingresso = await Ingresso.findById(compra.id);
      if (!ingresso) {
        return res.status(400).json({ sucesso: false, mensagem: `Ingresso com ID ${compra.id} não encontrado.` });
      }

      // Verificar se há estoque suficiente
      if (ingresso.quantidadeDisponivel < compra.quantidade) {
        return res.status(400).json({ sucesso: false, mensagem: `Não há estoque suficiente para o ingresso ${ingresso.nome}.` });
      }
    }

    // Chama a função de compra no controller (não mais dentro da verificação)
    // Passamos os dados necessários para o controller de compra
    await compraController.comprarIngresso(req, res, { ingressos:compras });

  } catch (error) {
    console.error('Erro ao verificar estoque:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor ao verificar o estoque.' });
  }
});

router.post('/resumo', async (req, res) => {
  const { ingressos } = req.body; // Espera um array de objetos com ingressoId e quantidade
  let total = 0;
  const ingressosResumo = [];

  // Itera pelos itens enviados para buscar dados do banco e calcular subtotais
  for (const item of ingressos) {
    const quantidade = parseInt(item.quantidade);
    if (quantidade <= 0) continue; // Pula se nenhuma unidade foi selecionada

    const ingresso = await Ingresso.findById(item.ingressoId);
    if (!ingresso) continue; // Você pode tratar o erro se desejar

    const subtotal = ingresso.preco * quantidade;
    total += subtotal;
    ingressosResumo.push({
      ingressoId: ingresso._id,
      nome: ingresso.nome,
      preco: ingresso.preco,
      quantidade,
      subtotal: subtotal.toFixed(2)
    });
  }

  // Renderiza o template com os dados do resumo
  res.render('resumo', { ingressos: ingressosResumo, total: total.toFixed(2) });
});


// Rota de comprar ingresso
router.post('/comprar', authMiddleware, compraController.comprarIngresso);

module.exports = router;

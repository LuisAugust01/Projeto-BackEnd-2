const express = require('express');
const router = express.Router();
const ingressoController = require('../controllers/ingressoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/criar', authMiddleware, ingressoController.criarIngresso);
router.get('/', ingressoController.listarIngressos);
router.get('/historico', authMiddleware, ingressoController.listarIngressosPorUsuario);
router.get('/:id', ingressoController.listarIngressoPorId);
router.put('/atualizar/:id', authMiddleware, ingressoController.atualizarIngresso);
router.delete('/deletar/:id', authMiddleware, ingressoController.deletarIngresso);

// Rota de verificação de estoque
router.post('/verificar-estoque', async (req, res) => {
  // Lógica de verificação de estoque
  const { compras } = req.body;

  for (const { id, quantidade } of compras) {
    const ingresso = await Ingresso.findById(id);
    if (!ingresso || ingresso.quantidadeDisponivel < quantidade) {
      return res.status(400).json({ sucesso: false, mensagem: `Estoque insuficiente para o ingresso "${ingresso.nome}".` });
    }
  }

  res.json({ sucesso: true });
});

module.exports = router;

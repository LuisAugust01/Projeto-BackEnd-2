const Ingresso = require('../models/ingressoModel');
const Compra = require('../models/compraModel')

exports.criarIngresso = async (req, res) => {
  if (req.user.role !== 'administrador') {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const { nome, preco, quantidadeDisponivel } = req.body;
  const ingresso = new Ingresso({ nome, preco, quantidadeDisponivel });
  await ingresso.save();
  res.status(201).json(ingresso);
};

exports.atualizarIngresso = async (req, res) => {
  if (req.user.role !== 'administrador') {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  const { ingressoId } = req.params;
  const { nome, preco, quantidadeDisponivel } = req.body;
  const ingresso = await Ingresso.findByIdAndUpdate(ingressoId, { nome, preco, quantidadeDisponivel }, { new: true });
  res.status(200).json(ingresso);
};

exports.deletarIngresso = async (req, res) => {
  if (req.user.role !== 'administrador') {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  const { ingressoId } = req.params;
  await Ingresso.findByIdAndDelete(ingressoId);
  res.status(200).json({ message: 'Ingresso excluído com sucesso' });
};

exports.listarIngressos = async (req, res) => {
  try {
      const pesquisa = req.query.pesquisa; // Pega o parâmetro da URL
      let ingressos;

      if (pesquisa) {
          ingressos = await Ingresso.find({ nome: { $regex: pesquisa, $options: 'i' } }); 
      } else {
          ingressos = await Ingresso.find(); // Retorna todos se não houver pesquisa
      }

      res.render('ingressos', { ingressos, pesquisa });
  } catch (error) {
      res.status(500).send('Erro ao buscar ingressos.');
  }
};

exports.listarIngressoPorId = async (req, res) => {
  try {
    const ingresso = await Ingresso.findById(req.params.id);
    if (!ingresso) return res.status(404).json({ error: 'Ingresso não encontrado' });
    res.status(200).json(ingresso);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ingresso' });
  }
};

exports.listarIngressosPorUsuario = async (req, res) => {
  try {
    const userId = req.user.id;

    const compras = await Compra.find({ usuarioId: userId }).populate('ingressos.ingressoId');

    if (compras.length === 0) {
      return res.status(404).render('erro', { mensagem: 'Nenhum ingresso encontrado para este usuário' });
    }

    const comprasFormatadas = compras.flatMap((compra) =>
      compra.ingressos
      .filter((item) => item.quantidade > 0)
      .map((item) => ({
        item: item.ingressoId.nome,
        quantidade: item.quantidade,
        valor: item.ingressoId.preco.toFixed(2),
        total: (item.quantidade * item.ingressoId.preco).toFixed(2),
      }))
    );

    res.render('historico', { compras: comprasFormatadas });
  } 

  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar ingresso aaaaaaaaaaaaaaaaaaaaaaa' });
  }
};
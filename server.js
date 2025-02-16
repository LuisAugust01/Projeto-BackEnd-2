const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const ingressoRoutes = require('./routes/ingressoRoutes');
const compraRoutes = require('./routes/compraRoutes');
const mustacheExpress = require('mustache-express');
const path = require('path');
const cookieParser = require('cookie-parser');

const Usuario = require('./models/usuarioModel');
require('dotenv').config();

// Configurar Mustache como engine de visualização
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Conectar ao banco de dados
mongoose.connect('mongodb://localhost/sistema_venda_ingressos', {})
  .then(async () => {
    console.log('Conectado ao MongoDB');
    await criarAdminSeNecessario();
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Função para criar o admin se não existir (usa pre-save do schema para criptografia, se configurado)
async function criarAdminSeNecessario() {
  try {
    const adminExists = await Usuario.findOne({ role: 'administrador' });
    if (!adminExists) {
      const admin = new Usuario({
        nome: 'Administrador',
        email: 'admin@email.com',
        senha: 'admin123',  // senha em texto simples; o pre-save do schema cuidará da criptografia
        role: 'administrador'
      });
      await admin.save();
      console.log('Administrador criado automaticamente!');
    } else {
      console.log('Administrador já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar administrador automaticamente:', error);
  }
}

// Middleware para interpretar JSON
app.use(cookieParser());
app.use(express.json()); // Para lidar com JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Para lidar com dados de formulários

// Rotas de API
app.use('/api/auth', authRoutes);
app.use('/api/ingressos', ingressoRoutes);
app.use('/api/compras', compraRoutes);

// Rotas de visualização
app.get('/', (req, res) => res.render('login'));
app.get('/registro', (req, res) => res.render('registro'));
app.get('/home', (req, res) => res.render('home'));
app.get('/ingressos', (req, res) => res.render('ingressos', { ingressos: [] }));
app.get('/historico', (req, res) => res.render('historico', { compras: [] }));
app.get('/logout', (req, res) => {
  res.redirect('/');
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const tarefaRoutes = require('./src/routes/tarefaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware para processar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', tarefaRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
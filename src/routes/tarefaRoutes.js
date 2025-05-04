const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/tarefaController');

// Rotas para gerenciamento de tarefas
// GET - Listar todas as tarefas (página inicial)
router.get('/', TarefaController.listarTarefas);

// POST - Criar uma nova tarefa
router.post('/tarefas', TarefaController.criarTarefa);

// GET - Renderizar formulário de edição
router.get('/tarefas/:id/editar', TarefaController.formEditarTarefa);

// POST - Atualizar uma tarefa (usando POST em vez de PUT para suportar formulários)
router.post('/tarefas/:id', TarefaController.atualizarTarefa);

// POST - Excluir uma tarefa (usando POST em vez de DELETE para suportar formulários)
router.post('/tarefas/:id/excluir', TarefaController.excluirTarefa);

// POST - Alterar status de uma tarefa (usando POST em vez de PATCH para suportar formulários)
router.post('/tarefas/:id/status', TarefaController.alterarStatusTarefa);

// Nova rota para filtrar tarefas por categoria
router.get('/tarefas/filtro/:filtro', TarefaController.filtrarTarefas);

module.exports = router;
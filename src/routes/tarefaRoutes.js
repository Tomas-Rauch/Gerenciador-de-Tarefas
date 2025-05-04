const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/tarefaController');

router.get('/', TarefaController.listarTarefas);

router.post('/tarefas', TarefaController.criarTarefa);

router.get('/tarefas/:id/editar', TarefaController.formEditarTarefa);

router.post('/tarefas/:id', TarefaController.atualizarTarefa);

router.post('/tarefas/:id/excluir', TarefaController.excluirTarefa);

router.post('/tarefas/:id/status', TarefaController.alterarStatusTarefa);

router.get('/tarefas/filtro/:filtro', TarefaController.filtrarTarefas);

module.exports = router;
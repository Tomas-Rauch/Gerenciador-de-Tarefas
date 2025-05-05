const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/tarefaController');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

/**
 * @swagger
 * components:
 *   schemas:
 *     Tarefa:
 *       type: object
 *       required:
 *         - titulo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da tarefa
 *         titulo:
 *           type: string
 *           description: Título da tarefa
 *         descricao:
 *           type: string
 *           description: Descrição detalhada da tarefa
 *         dataVencimento:
 *           type: string
 *           format: date
 *           description: Data de vencimento da tarefa
 *         concluida:
 *           type: boolean
 *           description: Status de conclusão da tarefa
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação da tarefa
 *       example:
 *         id: 1
 *         titulo: Completar relatório
 *         descricao: Finalizar o relatório mensal de vendas
 *         dataVencimento: 2025-05-15
 *         concluida: false
 *         dataCriacao: 2025-05-01T12:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: API para gerenciamento de tarefas
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags: [Tarefas]
 *     responses:
 *       200:
 *         description: Página HTML com a lista de tarefas
 */
router.get('/', TarefaController.listarTarefas);

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título da tarefa
 *               descricao:
 *                 type: string
 *                 description: Descrição detalhada da tarefa
 *               dataVencimento:
 *                 type: string
 *                 format: date
 *                 description: Data de vencimento da tarefa
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post('/tarefas', TarefaController.criarTarefa);

/**
 * @swagger
 * /tarefas/{id}/editar:
 *   get:
 *     summary: Exibe o formulário de edição de uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Página HTML com formulário de edição
 *       404:
 *         description: Tarefa não encontrada
 */
router.get('/tarefas/:id/editar', TarefaController.formEditarTarefa);

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataVencimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/tarefas/:id', TarefaController.atualizarTarefa);
router.post('/tarefas/:id', TarefaController.atualizarTarefa);

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Exclui uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/tarefas/:id', TarefaController.excluirTarefa);
router.post('/tarefas/:id/excluir', TarefaController.excluirTarefa);

/**
 * @swagger
 * /tarefas/{id}/status:
 *   patch:
 *     summary: Altera o status de conclusão de uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               concluida:
 *                 type: boolean
 *                 description: Status de conclusão da tarefa
 *     responses:
 *       200:
 *         description: Status da tarefa alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       404:
 *         description: Tarefa não encontrada
 */
router.patch('/tarefas/:id/status', TarefaController.alterarStatusTarefa);
router.post('/tarefas/:id/status', TarefaController.alterarStatusTarefa);

/**
 * @swagger
 * /tarefas/filtro/{filtro}:
 *   get:
 *     summary: Filtra tarefas por status ou data
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: filtro
 *         schema:
 *           type: string
 *           enum: [todas, concluidas, pendentes, atrasadas]
 *         required: true
 *         description: Tipo de filtro a ser aplicado
 *     responses:
 *       200:
 *         description: Lista de tarefas filtradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarefa'
 */
router.get('/tarefas/filtro/:filtro', TarefaController.filtrarTarefas);

module.exports = router;
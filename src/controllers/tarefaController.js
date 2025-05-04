const TarefaModel = require('../models/tarefaModel');

class TarefaController {
  static listarTarefas(req, res) {
    const tarefas = TarefaModel.obterTodas();
    res.render('index', { tarefas });
  }

  static criarTarefa(req, res) {
    const { titulo, descricao, dataVencimento } = req.body;
    
    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ erro: 'O título da tarefa é obrigatório' });
    }
    
    const novaTarefa = TarefaModel.criar(titulo, descricao, dataVencimento);
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(201).json(novaTarefa);
    } else {
      return res.redirect('/');
    }
  }

  static formEditarTarefa(req, res) {
    const tarefa = TarefaModel.obterPorId(req.params.id);
    
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada');
    }
    
    res.render('index', { 
      tarefas: TarefaModel.obterTodas(),
      tarefaEdit: tarefa 
    });
  }

  static atualizarTarefa(req, res) {
    const { id } = req.params;
    const { titulo, descricao, dataVencimento } = req.body;
    
    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ erro: 'O título da tarefa é obrigatório' });
    }
    
    const tarefaAtualizada = TarefaModel.atualizar(id, { titulo, descricao, dataVencimento });
    
    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json(tarefaAtualizada);
    } else {
      return res.redirect('/');
    }
  }

  static excluirTarefa(req, res) {
    const { id } = req.params;
    const tarefaExcluida = TarefaModel.excluir(id);
    
    if (!tarefaExcluida) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ mensagem: 'Tarefa excluída com sucesso', tarefa: tarefaExcluida });
    } else {
      return res.redirect('/');
    }
  }

  static alterarStatusTarefa(req, res) {
    const { id } = req.params;
    const { concluida } = req.body;
    
    const concluidaBoolean = concluida === 'true' || concluida === true;
    
    const tarefaAtualizada = TarefaModel.alterarStatus(id, concluidaBoolean);
    
    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json(tarefaAtualizada);
    } else {
      return res.redirect('/');
    }
  }
  
  static filtrarTarefas(req, res) {
    const { filtro } = req.params;
    let tarefas = TarefaModel.obterTodas();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    switch(filtro) {
      case 'concluidas':
        tarefas = tarefas.filter(tarefa => tarefa.concluida);
        break;
      case 'pendentes':
        tarefas = tarefas.filter(tarefa => !tarefa.concluida);
        break;
      case 'atrasadas':
        tarefas = tarefas.filter(tarefa => {
          if (!tarefa.concluida && tarefa.dataVencimento) {
            const dataVencimento = new Date(tarefa.dataVencimento);
            dataVencimento.setHours(0, 0, 0, 0);
            return dataVencimento < hoje;
          }
          return false;
        });
        break;
    }
    
    res.json(tarefas);
  }
}

module.exports = TarefaController;
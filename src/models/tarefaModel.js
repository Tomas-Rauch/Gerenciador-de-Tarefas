let tarefas = [];
let proximoId = 1;

class TarefaModel {
  static obterTodas() {
    return [...tarefas].sort((a, b) => {
      if (a.concluida !== b.concluida) {
        return a.concluida ? 1 : -1;
      }

      if (!a.concluida && !b.concluida) {
        if (!a.dataVencimento) return 1;
        if (!b.dataVencimento) return -1;
        
        return new Date(a.dataVencimento) - new Date(b.dataVencimento);
      }

      return new Date(b.dataCriacao) - new Date(a.dataCriacao);
    });
  }

  static obterPorId(id) {
    return tarefas.find(tarefa => tarefa.id === parseInt(id));
  }

  static criar(titulo, descricao, dataVencimento) {
    const novaTarefa = {
      id: proximoId++,
      titulo,
      descricao,
      dataVencimento: dataVencimento || null,
      concluida: false,
      dataCriacao: new Date()
    };
    
    tarefas.push(novaTarefa);
    return novaTarefa;
  }

  static atualizar(id, dadosTarefa) {
    const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));
    
    if (index !== -1) {
      tarefas[index] = {
        ...tarefas[index],
        ...dadosTarefa
      };
      return tarefas[index];
    }
    
    return null;
  }

  static excluir(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));
    
    if (index !== -1) {
      const tarefaExcluida = tarefas[index];
      tarefas = tarefas.filter(tarefa => tarefa.id !== parseInt(id));
      return tarefaExcluida;
    }
    
    return null;
  }

  static alterarStatus(id, concluida) {
    const tarefa = this.obterPorId(id);
    
    if (tarefa) {
      tarefa.concluida = concluida;
      return tarefa;
    }
    
    return null;
  }
}

module.exports = TarefaModel;
// Array para armazenar as tarefas em memória
let tarefas = [];
let proximoId = 1;

// Modelo para gerenciar tarefas
class TarefaModel {
  // Obter todas as tarefas
  static obterTodas() {
    // Ordenar tarefas por prioridade (data de vencimento) e depois por não concluídas primeiro
    return [...tarefas].sort((a, b) => {
      // Primeiro critério: tarefas não concluídas vêm antes das concluídas
      if (a.concluida !== b.concluida) {
        return a.concluida ? 1 : -1;
      }
      
      // Segundo critério: se ambas não concluídas, ordenar por data de vencimento
      if (!a.concluida && !b.concluida) {
        // Se não tem data de vencimento, vai para o final
        if (!a.dataVencimento) return 1;
        if (!b.dataVencimento) return -1;
        
        return new Date(a.dataVencimento) - new Date(b.dataVencimento);
      }
      
      // Para tarefas concluídas, manter a ordem de criação (mais novas primeiro)
      return new Date(b.dataCriacao) - new Date(a.dataCriacao);
    });
  }

  // Obter uma tarefa específica pelo ID
  static obterPorId(id) {
    return tarefas.find(tarefa => tarefa.id === parseInt(id));
  }

  // Criar uma nova tarefa
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

  // Atualizar uma tarefa existente
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

  // Excluir uma tarefa
  static excluir(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));
    
    if (index !== -1) {
      const tarefaExcluida = tarefas[index];
      tarefas = tarefas.filter(tarefa => tarefa.id !== parseInt(id));
      return tarefaExcluida;
    }
    
    return null;
  }

  // Marcar uma tarefa como concluída ou não concluída
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
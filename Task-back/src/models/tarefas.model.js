//----------------------------------------------------------------------------------------------------------------------------
// Tarefas
//----------------------------------------------------------------------------------------------------------------------------

let tarefas = [
    { id: 1, texto: 'Estudar Node', prioridade: 'alta', coluna: 'afazer', usuarioId: 2, projetoId: 1},
    { id: 2, texto: 'Criar API', prioridade: 'alta', coluna: 'andamento', usuarioId: 3, projetoId: 2},
    { id: 3, texto: 'Testar Postman',prioridade: 'media', coluna: 'concluido', usuarioId: 1, projetoId: 1},
];
let proximoId = 4

module.exports = {
    listar: () => tarefas,

    listarPorColuna: (coluna) => tarefas.filter (t => t.coluna === coluna),

    buscar: (id) => tarefas.find(t => t.id === id),

    adicionar: ({ texto, prioridade, coluna, usuarioId, projetoId }) => {
                const novaTarefa = { 
            id: proximoId++,
            texto,
            prioridade: prioridade || 'media',
            coluna: coluna || 'afazer',
            usuarioId: usuarioId,
            projetoId: projetoId
        }
        tarefas.push(novaTarefa);
        return novaTarefa
     },

    atualizar: (id, dados) => {
        const indice = tarefas.findIndex(t => Number(t.id) === Number(id));
        if (indice === -1) {
            return null;
        }
        tarefas[indice] = {
            id,
            ...dados
        };
        return tarefas[indice];
    },

    remover: (id) => {
        const indice = tarefas.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        return tarefas.splice(indice, 1)[0];
    },

    estatisticas: () => {
        const porColuna = {
            afazer: tarefas.filter(t => t.coluna === 'afazer').length,
            andamento: tarefas.filter(t => t.coluna === 'andamento').length,
            concluido: tarefas.filter(t => t.coluna === 'concluido').length,
        };
        return {total: tarefas.length, porColuna};
    }
};
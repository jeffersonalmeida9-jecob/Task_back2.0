//----------------------------------------------------------------------------------------------------------------------------
// Projetos
//----------------------------------------------------------------------------------------------------------------------------

let projetos = [
    { id: 1, descriçao: 'teste', ativo: true,},
    { id: 2, descriçao: 'task-flow', ativo: true,},
    { id: 3, descriçao: 'O.D.L', ativo: false,},
];
let proximoId = 4

module.exports = {
    listar: () => projetos,

    buscar: (id) => projetos.find(t => t.id === id),

    adicionar: ({ descriçao, ativo }) => {
                const novoProjeto = { 
            id: proximoId++, 
            descriçao: descriçao,
            ativo: ativo || true     
        }
        tarefas.push(novoProjeto);
        return novoProjeto
    },

    atualizar: (id, dados) => {
        const indice = projetos.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        projetos[indice] = {
            id,
            ...dados
        };
        return projetos[indice];
    },

    remover: (id) => {
        const indice = projetos.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        return projetos.splice(indice, 1)[0];
    }
};
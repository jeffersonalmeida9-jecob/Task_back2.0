//----------------------------------------------------------------------------------------------------------------------------
// Projetos
//----------------------------------------------------------------------------------------------------------------------------

const prisma = require('../database/prisma')

module.exports = {
    listar: async () => {
      const result = await prisma.projetos.findMany({
            select: {
              id: true,
              nome: true,
              descricao: true,
              usuario_id: true,
              criado_em: true,
              atualizado_em: true,
            }
        })
        return result
    },

    buscar: async (id) => {
        const result = await prisma.projetos.findUnique({
            where: {id},
        });
        return result
    },

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
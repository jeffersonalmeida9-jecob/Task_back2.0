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

    adicionar: async ({ nome, descricao, usuario_id, /*ativo*/ }) => {
        const result = await prisma.projetos.create({
            data: {
                nome: nome,
                descricao: descricao,
                usuario_id: usuario_id,
                /*ativo: ativo || true*/  
            }
        })
        return result
    },

    atualizar: async (id, dados) => {
        const ProjetoNow = await prisma.projetos.findUnique ({
            where: { id } });
        if (!ProjetoNow) return null 
            
        const result = await prisma.projetos.update({
            data: {
                nome: dados.nome,
                descricao: dados.descricao,
                usuario_id: dados.usuario_id,        
            }
           });
        return result
    },

    remover: (id) => {
        const indice = projetos.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        return projetos.splice(indice, 1)[0];
    }
};
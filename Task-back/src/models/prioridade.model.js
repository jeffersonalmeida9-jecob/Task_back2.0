//----------------------------------------------------------------------------------------------------------------------------
// Tarefas
//----------------------------------------------------------------------------------------------------------------------------
 const pool = require('../database/db');
const prisma = require('../database/prisma')

module.exports = {

    listar: async () => {const result = await prisma.prioridade.findMany({
        select: {
            id: true, 
            descricao: true, 
            ativo: true, 
            //cor:true
        },
        where:{ativo: true},
        orderBy: {id: 'asc'},
    }); 
        return result; 
    },

    buscar: async (id) => {
        const prioridade = await prisma.prioridade.findUnique({
            where: {id},
        });
        return prioridade
    },

    adicionar: async ({ descricao, ativo }) => {
        const result = await prisma.prioridade.create({
            data: {
                descricao: descricao,
                ativo: ativo
            }
        });
        return result
    },
    
    atualizar: async (id, dados) => {
        const prioridadeNow = await prisma.prioridade.findUnique({
            where: { id }
        });
        if (!prioridadeNow) return null;

        const result = await prisma.prioridade.update({
            where: { id },
            data: {
                texto: dados.descricao,
                ativo: dados.ativo
            },
        })
        return result
    },

    remover: async (id) => {
        const result = await pool.query('DELETE FROM tarefas WHERE id=$1 RETURNING *',[id]);
        return result.rows[0] || null;
    },
};
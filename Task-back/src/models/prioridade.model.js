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

    adicionar: async ({ texto, coluna, ordem, usuario_id, projeto_id, }) => {
        console.log('adicionar:', { texto, coluna, ordem, usuario_id, projeto_id })
        const result = await pool.query(
            'INSERT INTO tarefas (texto,coluna,ordem,usuario_id,projeto_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [texto, coluna||'afazer', ordem || 0, usuario_id, projeto_id]
        );
        return result.rows[0] || null
    },
    
    atualizar: async (id, dados) => {
        const { texto, prioridade_id, coluna, usuarioId } = dados;
        const result = await pool.query(
            'UPDATE tarefas SET texto=$1,prioridade_id=$2,coluna=$3,usuario_id=$4 WHERE id=$5 RETURNING *',
            [texto, prioridade_id, coluna, usuarioId, id]
        );
        return result.rows[0] || null;
    },

    remover: async (id) => {
        const result = await pool.query('DELETE FROM tarefas WHERE id=$1 RETURNING *',[id]);
        return result.rows[0] || null;
    },
};
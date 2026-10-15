//----------------------------------------------------------------------------------------------------------------------------
// Tarefas
//----------------------------------------------------------------------------------------------------------------------------
const pool = require('../database/db');

module.exports = {
    listar: async () => {const result = await pool.query (
            'SELECT * FROM tarefas ORDER BY id'
        );
        return result.rows; 
    },

    listarPorColuna: (coluna) => tarefas.filter (t => t.coluna === coluna),

    buscar: async (id) => {
        const result = await pool.query(
            'SELECT * FROM tarefas WHERE id = $1',
            [id]
        );
        return result.rows[0] || null
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

    estatisticas: () => {
        const porColuna = {
            afazer: tarefas.filter(t => t.coluna === 'afazer').length,
            andamento: tarefas.filter(t => t.coluna === 'andamento').length,
            concluido: tarefas.filter(t => t.coluna === 'concluido').length,
        };
        return {total: tarefas.length, porColuna};
    }
};
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
            [texto, coluna || 'afazer', ordem || 0, usuario_id, projeto_id]
        );
        return result.rows[0] || null
    },

     async atualizar(id, dados) {
        const tarefaAtual = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
        const concluidaEm = dados.coluna === 'concluida' ? new Date() : null;

        const iniciadoEm = tarefaAtual.rows[0].iniciada_em

        if(tarefaAtual.rows[0].coluna === 'andamento' && dados.coluna === 'afazer') {}
        else if (tarefaAtual.rows[0].coluna === 'afazer' && dados.coluna === 'andamento') {};
        
        const resultado = await pool.query(
            `UPDATE tarefas SET
            texto = $1,
            coluna = $2,
            usuario_id= $3,
            projeto_id = $4,
            prioridade_id = $5,
            concluido_em = $6,
            iniciada_em = $7
            WHERE id = $8
            RETURNING *`,
            [dados.texto, dados.coluna, dados.usuario_id, dados.projeto_id, dados.prioridade_id, concluidaEm, iniciadoEm, id]
        )
            return resultado.rows[0] || null
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
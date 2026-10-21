//----------------------------------------------------------------------------------------------------------------------------
// Usuários
//----------------------------------------------------------------------------------------------------------------------------
const pool = require('../database/db');


module.exports = {
    listar: async () => {const result = await pool.query (
            'SELECT * FROM usuarios ORDER BY id'
        );
        return result.rows; 
    },

    buscar: async (id) => {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [id]
        );
        return result.rows[0] || null
    },

    adicionar: async ({ nome, email, senha }) => {
        const result = await pool.query(
            'INSERT INTO tarefas (nome,email,senha_hash) VALUES ($1,$2,$3) RETURNING *',
            [nome, email, senha]
        );
        return result.rows[0] || null
    },
 
    atualizar: (id, dados) => {
        const indice = usuarios.findIndex(t => t.id === id);
        if (indice === -1) {
            return null;
        }
        usuarios[indice] = {
            id,
            ...dados
        };
        return usuarios[indice];
    },

    remover: async (id) => {
         const result = await pool.query('DELETE FROM usuarios WHERE id=$1 RETURNING *',[id]);
        return result.rows[0] || null;
    },

    buscarPorEmail: (email) => usuarios.find(t => t.email === email),
};
//----------------------------------------------------------------------------------------------------------------------------
// Usuários
//----------------------------------------------------------------------------------------------------------------------------
const pool = require('../database/db');
const prisma = require('../database/prisma');


module.exports = {
    listar: async () => {
        const result = await prisma.usuarios.findMany ({
            select: {
                id: true,
                nome: true,
                email: true,
                criado_em: true,
                atualizado_em: true,
            }
        });
        return result; 
    },

    buscar: async (id) => {
        const result = await prisma.usuarios.findUnique({
            where: {id},
            select: {
                id: true,
                nome: true,
                email: true,
                criado_em: true,
                atualizado_em: true,
            }
        });
        return result
    },

    adicionar: async ({ nome, email, senha }) => {
        const result = await pool.query(
            'INSERT INTO tarefas (nome,email,senha_hash) VALUES ($1,$2,$3) RETURNING *',
            [nome, email, senha]
        );
        return result.rows[0] || null
    },
 
    atualizar: async (id, { nome, email, senha_hash }) => {
        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha_hash = $3 WHERE id = $4 RETURNING *',
            [nome, email, senha_hash, id]
        );
        return result.rows[0] || null;
    },

    remover: async (id) => {
         const result = await pool.query('DELETE FROM usuarios WHERE id=$1 RETURNING *',[id]);
        return result.rows[0] || null;
    },

    buscarPorEmail: async (email) => {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );
        return result.rows[0] || null;
    },
};
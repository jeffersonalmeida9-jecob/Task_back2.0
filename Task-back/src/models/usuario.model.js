//----------------------------------------------------------------------------------------------------------------------------
// Usuários
//----------------------------------------------------------------------------------------------------------------------------

let usuarios = [
    { id: 6, nome: 'Admin', email: 'adimin@gmail.com', senha: "15483"},
    { id: 2, nome: 'Jeff', email: 'jeff@gmail.com', senha: "15487"},
    { id: 3, nome: 'Jecob',email: 'jecob@gmail.com', senha: "15489"},
    { id: 6, nome: 'admin',email: 'admin@email.com', senha: "1234"},
];
let proximoId = 4
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

    adicionar: async ({ nome, email }) => {
        const result = await pool.query(
            'INSERT INTO tarefas (nome,email,) VALUES ($1,$2) RETURNING *',
            [nome, email]
        );
        return result.rows[0] || null
    },
    //            const novousuario = { 
    //         id: proximoId++, 
    //         nome: nome,
    //         email: email    
    //     }
    //     usuarios.push(novousuario);
    //     return novousuario
    // },

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
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
        const result = await prisma.usuarios.create({
            data: {
                nome: nome,
                email: email,
                senha: senha
            }
        });
        return result
    },
 
    atualizar: async (id, nome, email, senha_hash ) => {
        const UsuarioNow = await prisma.usuarios.findUnique({
            where: { id } });
        if (!UsuarioNow) return null;

        const result = await prisma.usuarios.update({
            where: { id },
            data: {
                nome:nome,
                email: email,
                senha_hash: senha_hash,
            }
        });
        return result
    },

    remover: async (id) => {
          try {
            const result = await prisma.usuarios.delete({
              where: {id},
            })
            return result
          } catch (erro) {
            if (erro.code === 'P2025') {return null};
            throw erro;
          }
        },

    //buscarPorEmail: async (email) => {
    //    const result = await pool.query(
    //        'SELECT * FROM usuarios WHERE email = $1',
    //        [email]
    //    );
    //    return result.rows[0] || null;
    //},
};
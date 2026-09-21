const usuarioModel = require("../models/usuario.model");
const tarefaModel = require("../models/tarefas.model")

const usuariosControler = {

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 - Listar todos os usuários
//----------------------------------------------------------------------------------------------------------------------------

    listar(req, res) {
        const resultado = usuarioModel.listar ()
        res.json(resultado)
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar usuário por ID
//----------------------------------------------------------------------------------------------------------------------------

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const usuario = usuarioModel.buscar(id);
        if (!usuario) return res.status(404).json({ erro: 'usuario não encontrado'});
        res.json(usuario)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  ROTA 3 — Adicionar usuário 
//----------------------------------------------------------------------------------------------------------------------------

    criar(req, res) {
        const { nome, email,} = req.body;
        const novoUsuario = usuarioModel.adicionar ({
            nome,
            email
        });
        res.status(201).json(novoUsuario);
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 4 — Atualizar usuário
//----------------------------------------------------------------------------------------------------------------------------

    atualizar(req, res) {
        const id = Number(req.params.id);
        const { nome, email } = req.body;
        const usuarioAtualizado = usuarioModel.atualizar(id, {
            nome,
            email
        });
        if (!usuarioAtualizado) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(usuarioAtualizado);
        },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 5 — Deletar usuarios
//----------------------------------------------------------------------------------------------------------------------------

    remover(req, res) {
        const id = parseInt(req.params.id);
        const usuario = usuarioModel.remover(id);
        const usuario_t = tarefaModel.listar().filter(t => t.usuarioId === id)
        if (usuario_t) {
            return res.status(400).json({erro: 'Usuário possui tarefas. Remova as tarefas antes.'})
        }
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado', usuario_t });
        }
        res.json({ mensagem: 'Usuario removido com sucesso', id });
    },
}

module.exports = usuariosControler
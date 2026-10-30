const prioridadeModel = require("../models/prioridade.model");

const prioridadeController = {

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 - Listar todos os usuários
//----------------------------------------------------------------------------------------------------------------------------

    async listar(req, res) {
        const resultado = await prioridadeModel.listar ()
        res.json(resultado)
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar usuário por ID
//----------------------------------------------------------------------------------------------------------------------------

    async buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const prioridade = await prioridadeModel.buscar(id);
        if (!prioridade) return res.status(404).json({ erro: 'Prioridade não encontrado.'});
        res.json(prioridade)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  ROTA 3 — Adicionar usuário 
//----------------------------------------------------------------------------------------------------------------------------

    async criar(req, res) {
        try {
            const { descricao, ativo} = req.body;
            const novoPrioridade = await prioridadeModel.adicionar ({
                descricao,
                ativo
            });
            res.status(201).json(novoPrioridade);
        }   catch (erro) {
            console.log("Erro ao criar prioridade:", erro)
        }
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 4 — Atualizar usuário
//----------------------------------------------------------------------------------------------------------------------------

    async atualizar(req, res) {
        const id = Number(req.params.id);
        const { nome, email } = req.body;
        const usuarioAtualizado =  await prioridadeModel.atualizar(id, {
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

    async remover(req, res) {
        const id = parseInt(req.params.id);
        const usuario = await prioridadeModel.remover(id);
//        const usuario_t = tarefaModel.listar().filter(t => t.usuarioId === id)
//        if (usuario_t) {
//            return res.status(400).json({erro: 'Usuário possui tarefas. Remova as tarefas antes.'})
//        
        if (!usuario) {
            return res.status(404).json({ erro: 'Prioridade não encontrada', /*usuario_t*/ });
        }
        res.json({ mensagem: 'Usuario removido com sucesso', id });
    },
}

module.exports = prioridadeController
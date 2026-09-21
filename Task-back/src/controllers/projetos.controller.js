const projetosModel = require('../models/projetos.model')
const projetosControler = {

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 - Listar todos os Projetos
//----------------------------------------------------------------------------------------------------------------------------

    listar(req, res) {
        const resultado = projetosModel.listar ()
        res.json(resultado)
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar Projeto por ID
//----------------------------------------------------------------------------------------------------------------------------

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const projeto = projetosModel.buscar(id);
        if (!projeto) return res.status(404).json({ erro: 'projeto não encontrado'});
        res.json(projeto)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  ROTA 3 — Adicionar Projeto 
//----------------------------------------------------------------------------------------------------------------------------

    criar(req, res) {
        const { descriçao, ativo,} = req.body;
        const novoProjeto = {
            descriçao,
            ativo
        };
        res.status(201).json(novoProjeto);
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 4 — Atualizar Projeto
//----------------------------------------------------------------------------------------------------------------------------

    atualizar(req, res) {
        const id = Number(req.params.id);
        const { descriçao, ativo } = req.body;
        const projetoAtualizado = { 
            id,
            descriçao,
            ativo, 
        };
        if (!projetoAtualizado) {
            return res.status(404).json({ erro: 'Projeto não encontrado' });
        }
        res.json(projetoAtualizado);
        },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 5 — Deletar Projeto
//----------------------------------------------------------------------------------------------------------------------------

    remover(req, res) {
        const id = parseInt(req.params.id);
        const usuario = projetosModel.remover(id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Projeto não encontrado' });
        }
        res.json({ mensagem: 'Projeto removido com sucesso', id });
    },
}

module.exports = projetosControler
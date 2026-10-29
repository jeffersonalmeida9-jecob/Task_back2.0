const projetosModel = require('../models/projetos.model')
const projetosControler = {

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 - Listar todos os Projetos
//----------------------------------------------------------------------------------------------------------------------------

    async listar(req, res) {
        const resultado =  await projetosModel.listar ()
        res.json(resultado)
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar Projeto por ID
//----------------------------------------------------------------------------------------------------------------------------

    async buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const projeto = await projetosModel.buscar(id);
        if (!projeto) return res.status(404).json({ erro: 'projeto não encontrado'});
        res.json(projeto)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  ROTA 3 — Adicionar Projeto 
//----------------------------------------------------------------------------------------------------------------------------

    async criar(req, res) {
        const { nome, descricao, usuario_id, /*ativo,*/} = req.body;
        const novoProjeto = await projetosModel.adicionar ({
            nome,
            descricao,
            usuario_id,
            /*ativo*/
        });
        res.status(201).json(novoProjeto);
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 4 — Atualizar Projeto
//----------------------------------------------------------------------------------------------------------------------------

    async atualizar(req, res) {
        const id = Number(req.params.id);
        const { nome, descricao, usuario_id, /*ativo*/ } = req.body;
        const projetoAtualizado = await projetosModel.atualizar(id, { 
            nome,
            descricao,
            usuario_id
            /*ativo,*/ 
        });
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
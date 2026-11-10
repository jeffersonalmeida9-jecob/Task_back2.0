const projetosModel = require('../models/projetos.model')
const criarErro = require('../utils/criarErros')
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
        if (!projeto) {
            throw criarErro(404,'Projeto não encontrado');
        }
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
            throw criarErro(404,'Projeto não encontrado');
        }
        res.json(projetoAtualizado);
        },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 5 — Deletar Projeto
//----------------------------------------------------------------------------------------------------------------------------

    async remover(req, res) {
        const id = parseInt(req.params.id);
        const usuario = await projetosModel.remover(id);
        if (!usuario) {
            throw criarErro(404,'Projeto não encontrado');
        }
        res.json({ mensagem: 'Projeto removido com sucesso', id });
    },
}

module.exports = projetosControler
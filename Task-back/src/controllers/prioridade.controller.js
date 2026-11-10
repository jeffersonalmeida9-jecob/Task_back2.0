
const prioridadeModel = require("../models/prioridade.model");
const criarErro = require('../utils/criarErros')

const prioridadeController = {

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 - Listar todas as prioridades
//----------------------------------------------------------------------------------------------------------------------------

    async listar(req, res) {
            const resultado = await prioridadeModel.listar();
            res.json(resultado);
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 - Buscar prioridade por ID
//----------------------------------------------------------------------------------------------------------------------------

    async buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const prioridade = await prioridadeModel.buscar(id);
        if (!prioridade) {
            throw criarErro(404,'Prioridade não encontrada');
        }
        res.json(prioridade);
    },

    

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 3 - Adicionar prioridade
//----------------------------------------------------------------------------------------------------------------------------

    async criar(req, res) {
            const { descricao, ativo } = req.body;
            const novoPrioridade = await prioridadeModel.adicionar({
                descricao,
                ativo
            });
            res.status(201).json(novoPrioridade);
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 4 - Atualizar prioridade
//----------------------------------------------------------------------------------------------------------------------------

    async atualizar(req, res) {
        const id = Number(req.params.id);
        const { descricao, ativo } = req.body;

        const prioridadeAtualizada = await prioridadeModel.atualizar(id, {
            descricao,
            ativo
        });

        if (!prioridadeAtualizada) {
            throw criarErro(404,'Prioridade não encontrada');
        }
        res.json(prioridadeAtualizada);
    },

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 5 - Deletar prioridade
//----------------------------------------------------------------------------------------------------------------------------

    async remover(req, res) {
            const id = parseInt(req.params.id);
            const prioridade = await prioridadeModel.remover(id);

            if (!prioridade) {
                throw criarErro(404,'Prioridade não encontrada');
            }
            res.json({
                mensagem: 'Prioridade removida com sucesso',
                id
            });

    },
}

module.exports = prioridadeController;

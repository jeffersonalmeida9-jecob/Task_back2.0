const tarefasModel = require('../models/tarefas.model');
const usuariosModel = require('../models/usuario.model')

const tarefasController = {

//----------------------------------------------------------------------------------------------------------------------------
//  1 — Listar todas
//----------------------------------------------------------------------------------------------------------------------------

    listar(req, res) {
        const {coluna} = req.query;
        const usuarioId = req.usuario.id;

        const resultado = coluna
            ? tarefasModel.listarPorColuna(coluna)
            : tarefasModel.listar();
        const resultadoFiltrado = usuarioId
            ? resultado.filter(t => t.usuarioId === parseInt(usuarioId))
            : resultado
        res.json(resultadoFiltrado);
    },

//----------------------------------------------------------------------------------------------------------------------------
//  2 — Buscar tarefa por ID
//----------------------------------------------------------------------------------------------------------------------------

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const tarefa = tarefasModel.buscar(id)
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada'});
        res.json(tarefa)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  3 — Criar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    criar(req, res) {
        const { texto, prioridade, coluna, projetoId} = req.body;
        const usuarioId = req.usuario.id;

        //if (!projetoId) return res.status (400).json({erro: 'Projeto obrigatório'})

        const tarefas_andameto = tarefasModel.listar().filter(t => t.coluna === 'andamento' && t.usuarioId === usuarioId);
        if (tarefas_andameto.length >= 2) return res.status(400).json({erro: 'Limite de 2 tarefas em andamento por usuário atingido'})

        const id_u = usuariosModel.buscar(usuarioId)
        if (!id_u) return res.status (400).json({erro: 'Usuário não encontrado'})
        const novaTarefa = tarefasModel.adicionar ({
            texto,
            prioridade,
            coluna,
            usuarioId
        });
        res.status(201).json(novaTarefa);
    },

//----------------------------------------------------------------------------------------------------------------------------
//  5 — Atualizar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    atualizar(req, res) {
        const id = Number(req.params.id);
        const { texto, prioridade, coluna, cidade } = req.body;
        const usuarioId = req.usuario.id;

        if (coluna === "andamento") {
        const tarefasAndamento = tarefasModel
            .listar()
            .filter(t => t.coluna === "andamento" 
                && t.usuarioId === usuarioId
                && t.id !== id
            );

            if (tarefasAndamento.length >= 2) {
                window.alert('Limite de 2 tarefas em andamento por usuário atingido');
                return res.status(400).json({erro: 'Limite de 2 tarefas em andamento por usuário atingido'})
            }
        }

        let tarefaAtualizada
        if (coluna === "concluida") {
            tarefaAtualizada = tarefasModel.atualizar(id, {
                texto,
                prioridade,
                coluna,
                usuarioId,
                concluidaEm: new Date().toISOString()
            });
        }    else {
            tarefaAtualizada = tarefasModel.atualizar(id, {
                texto,
                prioridade,
                coluna,
                usuarioId,
            });
        }
            if (!tarefaAtualizada) {
                return res.status(404).json({ erro: 'Tarefa não encontrada' });
            }
            res.json(tarefaAtualizada);  
    },
        
//----------------------------------------------------------------------------------------------------------------------------
//  6 — Deletar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    remover(req, res) {
        const id = parseInt(req.params.id);
        const removida = tarefasModel.remover(id);
        if (!removida) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        //const {projetoId} = req.body;
        //if (projetoId !== null) {
        //    return res.status(400).json({erro: 'Projeto possui tarefas associadas. Remova as tarefas antes.'})
        //}
        res.json({ mensagem: 'Tarefa removida com sucesso', tarefa: removida });
    },

//----------------------------------------------------------------------------------------------------------------------------
//  7 — Estatisticas tarefa
//----------------------------------------------------------------------------------------------------------------------------

    estatisticas(req, res) {
        const {coluna} = req.query;
        res.json(coluna ? tarefasModel.listar() : tarefasModel.estatisticas())
    },
};

module.exports = tarefasController
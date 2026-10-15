const tarefasModel = require('../models/tarefas.model');
const usuariosModel = require('../models/usuario.model')
const criarErro = require('../utils/criarErros')

const tarefasController = {

//----------------------------------------------------------------------------------------------------------------------------
//  1 — Listar todas
//----------------------------------------------------------------------------------------------------------------------------

    listar: async (req, res) => {
        const {coluna} = req.query;
        const usuarioId = req.usuario.id;

        const resultado = coluna
            ? await tarefasModel.listarPorColuna(coluna)
            : await tarefasModel.listar();
        const resultadoFiltrado = usuarioId
            ? resultado.filter(t => t.usuario_id === parseInt(usuarioId))
            : resultado
    },

//----------------------------------------------------------------------------------------------------------------------------
//  2 — Buscar tarefa por ID
//----------------------------------------------------------------------------------------------------------------------------

    async buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const tarefa = await tarefasModel.buscar(id)
         if (!tarefa) {
            throw criarErro(404,'Tarefa não encontrada');
        }
        res.json(tarefa)
    },

//----------------------------------------------------------------------------------------------------------------------------
//  3 — Criar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    async criar(req, res) {
        const { texto, prioridade, coluna, ordem, usuario_id, projeto_id } = req.body;
        const usuarioId = req.usuario.id;

        //if (!projetoId) return res.status (400).json({erro: 'Projeto obrigatório'})

        //const tarefas_andameto = tarefasModel.listar().filter(t => t.coluna === 'andamento' && t.usuarioId === usuarioId);
        //if (tarefas_andameto.length >= 2) return res.status(400).json({erro: 'Limite de 2 tarefas em andamento por usuário atingido'})

        const id_u = usuariosModel.buscar(usuarioId)
        if (!id_u) return res.status (400).json({erro: 'Usuário não encontrado'})
            
        res.status(201).json(await tarefasModel.adicionar(req.body));
    },

//----------------------------------------------------------------------------------------------------------------------------
//  5 — Atualizar tarefa
//----------------------------------------------------------------------------------------------------------------------------

    async atualizar(req, res) {
        const id = Number(req.params.id);
        const { texto, prioridade_id, coluna, cidade } = req.body;
        const usuarioId = req.usuario.id;

        // if (coluna === "andamento") {
        // const tarefasAndamento = tarefasModel
        //     .listar()
        //     .filter(t => t.coluna === "andamento" 
        //         && t.usuarioId === usuarioId
        //         && t.id !== id
        //     );

        //     if (tarefasAndamento.length >= 2) {
        //         //window.alert('Limite de 2 tarefas em andamento por usuário atingido');
        //         return res.status(400).json({erro: 'Limite de 2 tarefas em andamento por usuário atingido'})
        //     }
        // }

        let tarefaAtualizada
        if (coluna === "concluida") {
            tarefaAtualizada = await tarefasModel.atualizar(id, {
                texto,
                prioridade_id,
                coluna,
                usuarioId,
                concluidaEm: new Date().toISOString()
            });
        }    else {
            tarefaAtualizada = await tarefasModel.atualizar(id, {
                texto,
                prioridade_id,
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

    async remover(req, res) {
        const id = parseInt(req.params.id);
        const removida = await tarefasModel.remover(id);
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
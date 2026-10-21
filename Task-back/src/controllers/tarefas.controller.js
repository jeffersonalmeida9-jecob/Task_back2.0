const tarefasModel = require('../models/tarefas.model');
const usuariosModel = require('../models/usuario.model')
const criarErro = require('../utils/criarErros')

const tarefasControler = {

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
        res.json(resultadoFiltrado)
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
    try {
        //const tarefas_andameto = tarefasModel.listar().filter(t => t.coluna === 'andamento' && t.usuarioId === usuarioId);
        //if (tarefas_andameto.length >= 2) return res.status(400).json({erro: 'Limite de 2 tarefas em andamento por usuário atingido'})
        
        const novaTarefa = await tarefasModel.adicionar(req.body);
        return res.status(201).json(novaTarefa);
    } catch (error) {
        // O console.log vai te mostrar no terminal o REAL motivo de ter falhado
        console.error("Erro ao criar tarefa:", error); 
        
        // Retorna o erro amigável para o cliente sem quebrar o servidor
        return res.status(500).json({ erro: 'Não foi possível adicionar a tarefa', detalhes: error.message });
    }
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
            throw criarErro(404,'Tarefa não encontrada');
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
            throw criarErro(404, 'Tarefa não encontrada')
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

module.exports = tarefasControler
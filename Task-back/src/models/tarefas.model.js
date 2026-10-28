//----------------------------------------------------------------------------------------------------------------------------
// Tarefas
//----------------------------------------------------------------------------------------------------------------------------
const pool = require('../database/db');
const prisma = require('../database/prisma')
const incluirNomes = {
    projetos: { select: { nome: true}},
    usuarios: { select: { nome: true}},
    prioridade: { select: { descricao: true } },
}

function formatarTarefas(tarefa) {
    const { projetos, usuarios, prioridades, ...resto} = tarefa
    return {
      ...resto,
      projeto: projetos?.nome,
      usuario: usuarios?.nome,
      prioridade: prioridades?.descricao,
      prioridade_cor: prioridades?.cor,
    };
}

module.exports = {
    listar: async () => {
      const result = await prisma.tarefas.findMany({
        select: {
          id: true,
          texto: true,
          coluna: true,
          usuario_id: true,
          projeto_id: true,
          prioridade_id: true,
          concluida_em: true,
          iniciada_em: true,
          ordem: true,
          prioridade: {
            select: {
              descricao: true,
              // cor: true 
            }
          },
          projetos: {
            select: {
              nome: true
            }
          },
          usuarios: {
            select: {
              nome: true
            }
          }
        }
        });
    
      return result;
    },


    //listarPorColuna: (coluna) => tarefas.filter (t => t.coluna === coluna),

    buscar: async (id) => {
        const tarefa = await prisma.tarefas.findUnique({
            where: {id},
            include: incluirNomes,
        });
        return tarefa ? formatarTarefas(tarefa) : null;
    },

    adicionar: async ({ texto, coluna, usuario_id, projeto_id, prioridade_id, ordem }) => {
        const result = await prisma.tarefas.create({
          data: {
            texto: texto,
            coluna: coluna || 'afazer',
            usuario_id: usuario_id,
            projeto_id: projeto_id,
            prioridade_id: prioridade_id || 2,
            ordem: ordem || 0,
          },
          include: incluirNomes,
        });
        return formatarTarefas(result)
    },

      atualizar: async (id, dados) => {
        const tarefaAtual = await prisma.tarefas.findUnique({
          where: { id } });
        if (!tarefaAtual) return null;

        const concluidaEm = dados.coluna === 'concluida' ? new Date() : null;

        const iniciadoEm = dados.iniciada_em

        //if(tarefaAtual.rows[0].coluna === 'andamento' && dados.coluna === 'afazer') {}
        //else if (tarefaAtual.rows[0].coluna === 'afazer' && dados.coluna === 'andamento') {};
        
        const result = await prisma.tarefas.update({
          where: { id },
          data: {
            texto: dados.texto,
            coluna: dados.coluna,
            usuario_id: Number(dados.usuario_id),
            projeto_id: Number(dados.projeto_id),
            prioridade_id: Number(dados.prioridade_id),
            concluido_em: dados.concluido_em,
            iniciada_em: dados.iniciada_em
          },
          include: incluirNomes
        });
        return formatarTarefas(result)
      },

    

    //estatisticas: () => {
    //    const porColuna = {
    //        afazer: tarefas.filter(t => t.coluna === 'afazer').length,
    //        andamento: tarefas.filter(t => t.coluna === 'andamento').length,
    //        concluido: tarefas.filter(t => t.coluna === 'concluido').length,
    //    };
    //    return {total: tarefas.length, porColuna};
    //}
};
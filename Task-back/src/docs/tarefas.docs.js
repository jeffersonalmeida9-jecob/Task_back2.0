const schemas = {
    Tarefa: { type: 'object', properties: {
        id: { type: 'integer', example: 1 },
        texto: { type: 'string', example: 'Revisar layout' },
        coluna: { type: 'string', enum: ['afazer', 'andamento', 'concluido'] },
        iniciada_em: { type: 'string', format: 'date-time', nullable: true },
    }},
};

const paths = {
    '/tarefas': {
        get: {
            tags: ['Tarefas'],
            summary: 'Lista todas as tarefas',
            responses: {
                '200': { description: 'Lista de tarefas' },
            },
        },
    },
};

module.exports = { paths, schemas };






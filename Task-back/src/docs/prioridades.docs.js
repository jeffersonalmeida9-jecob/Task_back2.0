
const { json, parametroId } = require('./comum');

const schemas = {
    Prioridade: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1
            },
            descricao: {
                type: 'string',
                example: 'Urgente'
            },
            ativo: {
                type: 'boolean',
                example: true
            },
        },
    },

    PrioridadeEntrada: {
        type: 'object',
        required: ['descricao', 'ativo'],
        properties: {
            descricao: {
                type: 'string',
                example: 'Urgente'
            },
            ativo: {
                type: 'boolean',
                example: true
            },
        },
    },

    PrioridadeLista: {
        type: 'array',
        items: {
            $ref: '#/components/schemas/Prioridade'
        },
    },
};

const paths = {
    '/prioridades': {
        get: {
            tags: ['Prioridades'],
            summary: 'Lista todas as prioridades ativas',
            responses: {
                '200': {
                    description: 'Lista de prioridades',
                    content: json('PrioridadeLista'),
                },
                '500': {
                    description: 'Erro ao listar prioridades',
                    content: json('Erro'),
                },
            },
        },

        post: {
            tags: ['Prioridades'],
            summary: 'Cadastra uma nova prioridade',
            requestBody: {
                required: true,
                content: json('PrioridadeEntrada'),
            },
            responses: {
                '201': {
                    description: 'Prioridade cadastrada com sucesso',
                    content: json('Prioridade'),
                },
                '500': {
                    description: 'Erro ao criar prioridade',
                    content: json('Erro'),
                },
            },
        },
    },

    '/prioridades/{id}': {
        get: {
            tags: ['Prioridades'],
            summary: 'Busca uma prioridade pelo ID',
            parameters: [parametroId],
            responses: {
                '200': {
                    description: 'Prioridade encontrada',
                    content: json('Prioridade'),
                },
                '400': {
                    description: 'ID inválido',
                    content: json('Erro'),
                },
                '404': {
                    description: 'Prioridade não encontrada',
                    content: json('Erro'),
                },
                '500': {
                    description: 'Erro ao buscar prioridade',
                    content: json('Erro'),
                },
            },
        },

        put: {
            tags: ['Prioridades'],
            summary: 'Atualiza uma prioridade',
            parameters: [parametroId],
            requestBody: {
                required: true,
                content: json('PrioridadeEntrada'),
            },
            responses: {
                '200': {
                    description: 'Prioridade atualizada com sucesso',
                    content: json('Prioridade'),
                },
                '400': {
                    description: 'ID inválido',
                    content: json('Erro'),
                },
                '404': {
                    description: 'Prioridade não encontrada',
                    content: json('Erro'),
                },
                '500': {
                    description: 'Erro ao atualizar prioridade',
                    content: json('Erro'),
                },
            },
        },

        delete: {
            tags: ['Prioridades'],
            summary: 'Exclui uma prioridade',
            parameters: [parametroId],
            responses: {
                '200': {
                    description: 'Prioridade removida com sucesso',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    mensagem: {
                                        type: 'string',
                                        example: 'Prioridade removida com sucesso'
                                    },
                                    id: {
                                        type: 'integer',
                                        example: 1
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'ID inválido',
                    content: json('Erro'),
                },
                '404': {
                    description: 'Prioridade não encontrada',
                    content: json('Erro'),
                },
                '500': {
                    description: 'Erro ao remover prioridade',
                    content: json('Erro'),
                },
            },
        },
    },
};

module.exports = { paths, schemas };


const { json, parametroId } = require('./comum');

const schemas = {
    Projeto: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1
            },
            nome: {
                type: 'string',
                example: 'TaskFlow'
            },
            descricao: {
                type: 'string',
                example: 'Sistema de gerenciamento de tarefas e projetos'
            },
            usuario_id: {
                type: 'integer',
                example: 1
            },
            criado_em: {
                type: 'string',
                format: 'date-time',
                example: '2026-10-20T10:00:00.000Z'
            },
            atualizado_em: {
                type: 'string',
                format: 'date-time',
                example: '2026-10-20T10:00:00.000Z'
            },
        },
    },

    ProjetoEntrada: {
        type: 'object',
        required: ['nome', 'descricao', 'usuario_id'],
        properties: {
            nome: {
                type: 'string',
                example: 'TaskFlow'
            },
            descricao: {
                type: 'string',
                example: 'Sistema de gerenciamento de tarefas e projetos'
            },
            usuario_id: {
                type: 'integer',
                example: 1
            },
        },
    },

    ProjetoLista: {
        type: 'array',
        items: {
            $ref: '#/components/schemas/Projeto'
        },
    },
};

const paths = {
    '/projetos': {
        get: {
            tags: ['Projetos'],
            summary: 'Lista todos os projetos',
            responses: {
                '200': {
                    description: 'Lista de projetos',
                    content: json('ProjetoLista'),
                },
            },
        },

        post: {
            tags: ['Projetos'],
            summary: 'Cria um novo projeto',
            requestBody: {
                required: true,
                content: json('ProjetoEntrada'),
            },
            responses: {
                '201': {
                    description: 'Projeto criado com sucesso',
                    content: json('Projeto'),
                },
                '400': {
                    description: 'Dados inválidos',
                    content: json('Erro'),
                },
            },
        },
    },

    '/projetos/{id}': {
        get: {
            tags: ['Projetos'],
            summary: 'Busca um projeto pelo ID',
            parameters: [parametroId],
            responses: {
                '200': {
                    description: 'Projeto encontrado',
                    content: json('Projeto'),
                },
                '404': {
                    description: 'Projeto não encontrado',
                    content: json('Erro'),
                },
            },
        },

        put: {
            tags: ['Projetos'],
            summary: 'Atualiza um projeto',
            parameters: [parametroId],
            requestBody: {
                required: true,
                content: json('ProjetoEntrada'),
            },
            responses: {
                '200': {
                    description: 'Projeto atualizado com sucesso',
                    content: json('Projeto'),
                },
                '404': {
                    description: 'Projeto não encontrado',
                    content: json('Erro'),
                },
            },
        },

        delete: {
            tags: ['Projetos'],
            summary: 'Exclui um projeto',
            parameters: [parametroId],
            responses: {
                '200': {
                    description: 'Projeto removido com sucesso',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    mensagem: {
                                        type: 'string',
                                        example: 'Projeto removido com sucesso'
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
                '404': {
                    description: 'Projeto não encontrado',
                    content: json('Erro'),
                },
            },
        },
    },
};

module.exports = { paths, schemas };

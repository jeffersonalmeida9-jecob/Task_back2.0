
const { json, parametroId } = require('./comum');

const schemas = {
    Usuario: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1
            },
            nome: {
                type: 'string',
                example: 'João Silva'
            },
            email: {
                type: 'string',
                format: 'email',
                example: 'joao@email.com'
            },
        },
    },

    UsuarioEntrada: {
        type: 'object',
        required: ['nome', 'email', 'senha'],
        properties: {
            nome: {
                type: 'string',
                example: 'João Silva'
            },
            email: {
                type: 'string',
                format: 'email',
                example: 'joao@email.com'
            },
            senha: {
                type: 'string',
                format: 'password',
                example: 'Senha@123'
            },
        },
    },

    UsuarioAtualizacao: {
        type: 'object',
        required: ['nome', 'email'],
        properties: {
            nome: {
                type: 'string',
                example: 'João Silva'
            },
            email: {
                type: 'string',
                format: 'email',
                example: 'joao@email.com'
            },
        },
    },

    UsuarioLista: {
        type: 'array',
        items: {
            $ref: '#/components/schemas/Usuario'
        },
    },
};

const paths = {
    '/usuarios': {
        get: {
            tags: ['Usuários'],
            summary: 'Lista todos os usuários',
            responses: {
                '200': {
                    description: 'Lista de usuários',
                    content: json('UsuarioLista'),
                },
                '401': {
                    description: 'Token ausente ou inválido',
                    content: json('Erro'),
                },
            },
        },

        post: {
            tags: ['Usuários'],
            summary: 'Cadastra um novo usuário',
            requestBody: {
                required: true,
                content: json('UsuarioEntrada'),
            },
            responses: {
                '201': {
                    description: 'Usuário cadastrado com sucesso',
                    content: json('Usuario'),
                },
                '400': {
                    description: 'Dados inválidos',
                    content: json('Erro'),
                },
                '401': {
                    description: 'Token ausente ou inválido',
                    content: json('Erro'),
                },
            },
        },
    },

    '/usuarios/{id}': {
        get: {
            tags: ['Usuários'],
            summary: 'Busca um usuário pelo ID',
            parameters: [parametroId],
            responses: {
                '200': {
                    description: 'Usuário encontrado',
                    content: json('Usuario'),
                },
                '400': {
                    description: 'ID inválido',
                    content: json('Erro'),
                },
                '401': {
                    description: 'Token ausente ou inválido',
                    content: json('Erro'),
                },
                '404': {
                    description: 'Usuário não encontrado',
                    content: json('Erro'),
                },
            },
        },

        put: {
            tags: ['Usuários'],
            summary: 'Atualiza os dados de um usuário',
            parameters: [parametroId],
            requestBody: {
                required: true,
                content: json('UsuarioAtualizacao'),
            },
            responses: {
                '200': {
                    description: 'Usuário atualizado com sucesso',
                    content: json('Usuario'),
                },
                '400': {
                    description: 'Dados inválidos',
                    content: json('Erro'),
                },
                '401': {
                    description: 'Token ausente ou inválido',
                    content: json('Erro'),
                },
                '404': {
                    description: 'Usuário não encontrado',
                    content: json('Erro'),
                },
            },
        },

        delete: {
            tags: ['Usuários'],
            summary: 'Exclui um usuário',
            parameters: [parametroId],
            responses: {
                '200': {
                    description: 'Usuário removido com sucesso',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    mensagem: {
                                        type: 'string',
                                        example: 'Usuario removido com sucesso'
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
                '401': {
                    description: 'Token ausente ou inválido',
                    content: json('Erro'),
                },
                '404': {
                    description: 'Usuário não encontrado',
                    content: json('Erro'),
                },
            },
        },
    },
};

module.exports = { paths, schemas };

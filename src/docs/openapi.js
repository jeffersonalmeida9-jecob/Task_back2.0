const tarefas = require('./tarefas.docs');
const usuarios = require('./usuarios.docs');
const projetos = require('./projetos.docs');
const prioridade = require('./prioridades.docs');
const comum = require('./comum')

module.exports = {
    openapi: '3.0.3',
    info: {
        title: 'TaskFlow API',
        version: '1.0.0',
        description: 'API do TaskFlow SENAI CTGAS-ER',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local' }],
    security: [{ bearerAuth: [] }],
    paths: { ...tarefas.paths,
             ...usuarios.paths,
             ...projetos.paths,
             ...prioridade.paths
             
     },

    components: {
        schemas: { ...comum.schemas, ...tarefas.schemas, ...usuarios.schemas, ...projetos.schemas, ...prioridade.schemas
         },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
}
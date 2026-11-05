
require('dotenv').config();

const autenticar = require('./Task-back/src/middlewares/autenticar');
const express = require('express');
const tarefasRoutes = require('./Task-back/src/routes/tarefas.routes');
const usuariosRoutes = require('./Task-back/src/routes/usuarios.routes');
const projetosRoutes = require('./Task-back/src/routes/projetos.routes');
const prioridadesRoutes = require('./Task-back/src/routes/prioridade.routes');
const cors = require('cors');
const authRoutes = require('./Task-back/src/routes/auth.routes');
const tratarErros = require('./Task-back/src/middlewares/erro.middleware');
const validarContentType = require('./Task-back/src/middlewares/validarContentType');
const logger = require('./Task-back/src/middlewares/logger');
const criarErro = require('./Task-back/src/utils/criarErros');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./Task-back/src/docs/openapi');

const app = express();

app.use(express.json());
app.use(validarContentType);
app.use(logger);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
}));

app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'TaskFlow API funcionando!'
    });
});

app.use('/auth', authRoutes);
app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/usuarios', autenticar, usuariosRoutes);
app.use('/projetos', autenticar, projetosRoutes);
app.use('/prioridades', autenticar, prioridadesRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use((req, res, next) => {
    next(criarErro(404, 'Rota não encontrada'));
});

app.use(tratarErros);

module.exports = app;

if (require.main === module) {
    const PORTA = process.env.PORTA || 3000;

    app.listen(PORTA, () => {
        console.log(`Servidor rodando em http://localhost:${PORTA}`);
    });
}

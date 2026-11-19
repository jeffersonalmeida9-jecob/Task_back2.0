require('dotenv').config();

const autenticar = require('./src/middlewares/autenticar')
const express = require('express');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');
const prioridadeRoutes = require('./src/routes/prioridade.routes')
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const tratarErros = require ('./src/middlewares/erro.middleware');
const validarContentType = require('./src/middlewares/validarContentType');
const logger = require('./src/middlewares/logger');
const criarErro = require('./src/utils/criarErros');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./src/docs/openapi');
//const corsMiddleware = require('./src/middlewares/cors')

const app = express();

app.use(express.json());
app.use(validarContentType);
app.use(logger);
//app.use(corsMiddleware);
//app.use(cors());
app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
}));

app.use('/auth', authRoutes);
app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/usuarios', autenticar, usuariosRoutes);
app.use('/projetos', autenticar, projetosRoutes);
app.use('/prioridades', autenticar, prioridadeRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'TaskFlow API funcionando!' });
});

app.use((req, res) => {
    throw criarErro (404, "Rota não encontrada")
   // res.status(404).json({ erro: 'Rota não encontrada' });});
})

app.use ((req, res) => {
    const rota = `${req.method} ${req.url}`;
    throw criarErro(400, `Rota ${rota} não encontrada`)
});

app.use(tratarErros);

module.exports = app;
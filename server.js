require('dotenv').config();

// const pool = require('./Task-back/src/database/db')
const autenticar = require('./Task-back/src/middlewares/autenticar')
const express = require('express');
const tarefasRoutes = require('./Task-back/src/routes/tarefas.routes');
const usuariosRoutes = require('./Task-back/src/routes/usuarios.routes');
const projetosRoutes = require('./Task-back/src/routes/projetos.routes');
const prioridadeRoutes = require('./Task-back/src/routes/prioridade.routes')
const cors = require('cors');
const authRoutes = require('./Task-back/src/routes/auth.routes');
const tratarErros = require ('./Task-back/src/middlewares/erro.middleware');
const validarContentType = require('./Task-back/src/middlewares/validarContentType');
const logger = require('./Task-back/src/middlewares/logger');
const criarErro = require('./Task-back/src/utils/criarErros');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./Task-back/src/docs/openapi');
//const corsMiddleware = require('./Task-back/src/middlewares/cors')

const app = express();
const PORTA = process.env.PORTA || 3000;

// pool.query('SELECT NOW()', (err,res) => {
//     if (err) console.error('Erro ao conectar:', err.message);
//     else console.log ('Banco conectado:', res.rows[0].now)
// })

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
app.use('/prioridade', autenticar, prioridadeRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use((req, res) => {
    throw criarErro (404, "Rota não encontrada")
   // res.status(404).json({ erro: 'Rota não encontrada' });});
})

app.use ((req, res) => {
    const rota = `${req.method} ${req.url}`;
    throw criarErro(400, `Rota ${rota} não encontrada`)
});

app.use(tratarErros);
app.listen(PORTA, () => console.log(`Servidor rodando em  http://localhost:${PORTA}`));
require('dotenv').config();

const autenticar = require('./Task-back/src/middlewares/autenticar')
const express = require('express');
const tarefasRoutes = require('./Task-back/src/routes/tarefas.routes');
const usuariosRoutes = require('./Task-back/src/routes/usuarios.routes');
const projetosRoutes = require('./Task-back/src/routes/projetos.routes');
const cors = require('cors');
const authRoutes = require('./Task-back/src/routes/auth.routes');

const validarContentType = require('./Task-back/src/middlewares/validarContentType');
const logger = require('./Task-back/src/middlewares/logger')
const corsMiddleware = require('./Task-back/src/middlewares/cors')

const app = express();
const PORTA = process.env.PORTA || 3000;

app.use(express.json());
app.use(validarContentType);
app.use(logger);
app.use(corsMiddleware);
//app.use(cors());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
}));

app.use('/auth', authRoutes);
app.use('/tarefas', autenticar, tarefasRoutes);
app.use('/usuarios', autenticar, usuariosRoutes);
app.use('/projetos', autenticar, projetosRoutes);
app.use((req, res) => {res.status(404).json({ erro: 'Rota não encontrada' });});

app.listen(PORTA, () => console.log(`Servidor rodando em  http://localhost:${PORTA}`));
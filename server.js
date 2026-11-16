require('dotenv').config();

const prisma = require('./Task-back/src/database/prisma')
const app = require('./app');
const PORTA = process.env.PORTA || 3000;

 prisma.$connect()
.then(() => console.log('Banco conectado'))
.catch((err) => console.error('Erro ao conectar:', err.message));

app.listen(PORTA, () => console.log(`Servidor rodando em  http://localhost:${PORTA}`));
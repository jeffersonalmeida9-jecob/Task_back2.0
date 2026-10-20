const express = require('express');
const prioridadeControler = require('../controllers/prioridade.controller');
const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');

const router = express.Router ();
const idValido = validar(schemas.id, "params")

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 1 - Listar todos os prioridades
//----------------------------------------------------------------------------------------------------------------------------

router.get('/', prioridadeControler.listar)

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 2 — Buscar prioridade por ID
//----------------------------------------------------------------------------------------------------------------------------

router.get('/:id', idValido, prioridadeControler.buscarPorId)

//----------------------------------------------------------------------------------------------------------------------------
//ROTA 3 — Adicionar prioridade 
//----------------------------------------------------------------------------------------------------------------------------

router.post('/', validar(schemas.usuario), prioridadeControler.criar)

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 4 — Atualizar prioridade
//----------------------------------------------------------------------------------------------------------------------------

router.put('/:id', idValido, validar(schemas.usuario), prioridadeControler.atualizar)

//----------------------------------------------------------------------------------------------------------------------------
// ROTA 5 — Deletar prioridade
//----------------------------------------------------------------------------------------------------------------------------

router.delete('/:id', idValido, prioridadeControler.remover)

module.exports = router;
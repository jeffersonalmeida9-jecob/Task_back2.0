const traduzirErrosPrisma = require('../utils/traduzirErroPrisma');

const erroP2002 = { code: 'P2002', meta: { target: ['email'] } };
const erroP2003 = { code: 'P2003'};

test ('P2002 (valor repetido) vira 409 e diz o campo repetido', () => {
    const erro = traduzirErrosPrisma(erroP2002, 'POST');
    expect (erro.status).toBe(409);
    expect (erro.detalhes).toEqual(['Valor repetido em: email']);
});

test ('P2003 ao gravar (POST) vira 400', () => {
    expect(traduzirErrosPrisma(erroP2003, 'post').status).toBe(400);
});

test ('P2004 ao excluir (DELETE) vira 409', () => {
    expect(traduzirErrosPrisma(erroP2003, 'DELETE').status).toBe(409);
});

//test ('P2025 ()')
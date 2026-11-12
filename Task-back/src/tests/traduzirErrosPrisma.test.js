const traduzirErrosPrisma = require('../utils/traduzirErroPrisma');

const erroP2002 = { code: 'P2002', meta: { target: ['email'] } };
const erroP2003 = { code: 'P2003'};
const erroP2025 = { code: 'P2025' };

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

test('P2003 ao atualizar (PUT) vira 400 com mensagem de id inexistente', () => {
    const erro = traduzirErrosPrisma(erroP2003, 'PUT');
    expect(erro.status).toBe(400);
    expect(erro.message).toBe('Um dos ids informados não existe');
});

test('P2025 retorna a mensagem Registro não encontrado', () => {
    const erro = traduzirErrosPrisma(erroP2025, 'DELETE');
    expect(erro.message).toBe('Registro não encontrado');
});

test('P2003 ao excluir (DELETE) tem a mensagem Não é possível excluir: existem registros ligados a este projeto', () => {
    const erro = traduzirErrosPrisma(erroP2003, 'DELETE');
    expect(erro.message).toBe('Não é possível excluir: existem registros ligados a este projeto');
});
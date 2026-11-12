const criarErro = require('../utils/criarErros')

describe('criarErro', () => {
    test('devolve um Error com o status e a mensagem', () => {
        const erro = criarErro(404, 'Tarefa não encontrada');
        expect (erro.status).toBe(404)
        expect (erro.message).toBe('Tarefa não encontrada')
    })
    test('guarda a lista de detalhes quando informada', () => {
        const detalhes = ["O campo 'texto' é obrigatório"];
        const erro = criarErro(400, 'Dados inválidos', detalhes);
        expect(erro.detalhes[0]).toBe("O campo 'texto' é obrigatório");
    });
    test('devolve status 500 e detalhes undefined quando não informados', () => {
        const erro = criarErro(500, 'Erro interno no servidor');
        expect(erro.status).toBe(500);
        expect(erro.message).toBe('Erro interno no servidor');
        expect(erro.detalhes).toBeUndefined();
    });
})


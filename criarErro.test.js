const criarErro = require('./Task-back/src/utils/criarErros')

describe('criarErro', () => {
    test('devolve um Error com o status e a mensagem', () => {
        const erro = criarErro(404, 'Tarefa não encontrada');
        expect (erro).toBeInstanceOf(Error)
        expect (erro.status).title(404)
    })
})
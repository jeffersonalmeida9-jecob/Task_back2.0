const jwt = require('jsonwebtoken')
const usuarioModel = require('../models/usuario.model')

const authController = {
    async login(req, res) {
        console.log("Dados recebidos no corpo da requisição:", req.body);

        const { email,senha } = req.body;
    
        if (!email || !senha)
            return res.status(400).json({ erro: 'Email e senha são obrigatórios' });

        const usuario = await usuarioModel.buscarPorEmail(email);
        if (!usuario)
            return res.status(401).json({ erro: 'Credenciais inválidas 1' });

        if (usuario.senha_hash !== senha){
            console.log(usuario.senha)
        return res.status(401).json({ erro: 'Credenciais inválidas 2' });
        }
        
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            token,
            usuario: { id: usuario.id, nome: usuario.nome}
        });
    },
};

module.exports = authController;
const jwt = require('jsonwebtoken')
const chaveSecreta = require('../chaveSecreta')

const autenticacao = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ mensagem: "Para acessar este recurso, um token de autenticação válido deve ser enviado no cabeçalho de autorização." });
        }

        const tokenBearer = authorization.split(' ')[1];

        const verificaToken = jwt.verify(tokenBearer, chaveSecreta);

        const { id } = verificaToken;

        req.usuario = id;

        next();
    } catch (erro) {
        console.error({ 'mensagem': erro.message });
        return res.status(401).json({ mensagem: "Token de autenticação inválido ou expirado." });
    }
}

module.exports = {
    autenticacao,
}

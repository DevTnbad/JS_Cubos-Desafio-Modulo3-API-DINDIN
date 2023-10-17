const { Router } = require('express');
const usuario = require('./controladores/usuario');
const swaggerUsuario = require('./documentacao/swaggerUsuario');
const categoria = require('./controladores/categoria');
const swaggerCategoria = require('./documentacao/swaggerCategoria')
const { autenticacao } = require('./intermediarios/autenticacao');
const transacao = require('./controladores/transacao');
const swaggerTransacao = require('./documentacao/swaggerTransacao');

const rotas = Router();

rotas.post('/usuario', usuario.cadastrar);
rotas.post('/login', usuario.login);


rotas.use(autenticacao);


rotas.get('/usuario', usuario.detalhar);
rotas.put('/usuario', usuario.atualizar);

rotas.get('/categoria', categoria.listar);

rotas.get('/transacao/extrato', transacao.extrato);
rotas.get('/transacao', transacao.listar);
rotas.get('/transacao/:id', transacao.transacaoUsuarioPorId);
rotas.post('/transacao', transacao.cadastrar);
rotas.put('/transacao/:id', transacao.atualizar);
rotas.delete('/transacao/:id', transacao.excluir);


module.exports = rotas;
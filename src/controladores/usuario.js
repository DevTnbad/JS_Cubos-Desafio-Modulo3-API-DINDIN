const bcrypt = require('bcrypt');
const pool = require('../conexao');
const jwt = require('jsonwebtoken');
const chaveSecreta = require('../chaveSecreta');



const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'É obrigatório o preencimento de: email e senha' });
        }

        const consulta = `select * from usuarios where email = $1`
        const usuarioEncontrado = await pool.query(consulta, [email]);

        if (usuarioEncontrado.rowCount == 0) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const validaSenha = await bcrypt.compare(senha, usuarioEncontrado.rows[0].senha);

        if (!validaSenha) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const { senha: senhaCriptografada, ...usuarioSemSenha } = usuarioEncontrado.rows[0];
        const { id } = usuarioEncontrado.rows[0];

        const token = jwt.sign({ id }, chaveSecreta, { expiresIn: '8h' });

        // //teste
        // res.header('Authorization', `Bearer ${token}`);
        // //teste

        return res.status(200).json({ usuario: usuarioSemSenha, token });
    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}

const cadastrar = async (req, res) => {
    try {
        let { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: 'É obrigatório o preencimento de: nome, email e senha'
            });
        }

        const consulta = `select * from usuarios where email = $1`
        const usuarioEncontrado = await pool.query(consulta, [email]);

        if (usuarioEncontrado.rowCount > 0) {
            return res.status(400).json({
                mensagem: "Já existe usuário cadastrado com o e-mail informado."
            })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const emailFormatado = email.toLowerCase();
        const cadastro = `insert into usuarios (nome, email, senha) 
        values ($1, $2, $3) returning id, nome, email`;
        const usuarioCriado = await pool.query(cadastro, [nome, emailFormatado, senhaCriptografada]);

        return res.status(201).json(usuarioCriado.rows[0]);
    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}


const detalhar = async (req, res) => {
    const idUsuario = req.usuario;
    try {
        const query = `select * from usuarios where id = $1`;
        const consulta = await pool.query(query, [idUsuario]);
        
        const { senha, ...saida } = consulta.rows[0];
        return res.status(200).json(saida);
    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}


const atualizar = async (req, res) => {
    try {
        let { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'É obrigatório o preencimento de: nome, email e senha' });
        }
        const query = `select * from usuarios where email = $1`;
        const consulta = await pool.query(query, [email]);

        const idAutenticado = req.usuario;

        const idConsulta = consulta.rowCount > 0 ? consulta.rows[0].id : 'inexistente';

        if (consulta.rowCount > 0 && idAutenticado !== idConsulta) {
            return res.status(400).json({ "mensagem": "O e-mail informado já está sendo utilizado por outro usuário." });
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const emailFormatado = email.toLowerCase();
        const atalizaCadastro = `update usuarios set nome = $1, email = $2, senha = $3 where id = $4`;
        await pool.query(atalizaCadastro, [nome, emailFormatado, senhaHash, idAutenticado]);

        return res.status(204).send();
    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });;
    }
}

module.exports = {
    login,
    cadastrar,
    detalhar,
    atualizar
}

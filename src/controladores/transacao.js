const pool = require("../conexao");

const listar = async (req, res) => {
    try {
        const idUsuario = req.usuario;
        const query = `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, 
        c.descricao as categoria_nome from transacoes t left join categorias c on t.categoria_id = c.id 
        where t.usuario_id = $1 `;
        const listaTransacoes = await pool.query(query, [idUsuario]);
        const { filtro: filtroEncontrado } = req.query;

        //test
        const filtro = filtroEncontrado ?
            (Array.isArray(filtroEncontrado) ? filtroEncontrado : [filtroEncontrado]) :
            [];
        //test

        console.log(filtro);
        if (filtro) {
            const filtroRegex = new RegExp(filtro.join("|"), "i");
            const saida = listaTransacoes.rows.filter(transacao => {
                return filtroRegex.test(transacao.categoria_nome);
            });

            return res.status(200).json(saida);
        }
        return res.status(200).json(listaTransacoes.rows);
    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}

const transacaoUsuarioPorId = async (req, res) => {
    try {
        const idUsuario = req.usuario;
        const idTransacao = req.params.id;

        const transacaoUsuario = await pool.query(`select t.id, t.tipo, t.descricao, t.valor, t.data, 
        t.usuario_id, t.categoria_id, c.descricao as categoria_nome from categorias c join transacoes t 
        on c.id = t.categoria_id where t.usuario_id = $1 and t.id = $2;`, [idUsuario, idTransacao]);
        if (transacaoUsuario.rowCount < 1) {
            return res.status(400).json({ "mensagem": "Transação não encontrada." })
        }

        return res.status(200).json(transacaoUsuario.rows[0]);

    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}

const cadastrar = async (req, res) => {
    try {
        const idUsuario = req.usuario;
        const { tipo, descricao, valor, data, categoria_id } = req.body;
        const tipoValido = ['entrada', 'saida'];

        if (!tipo || !descricao || !valor || !data || !categoria_id) {
            return res.status(404).json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
        }

        const respostaCategoria = await pool.query(`select * from categorias where id = $1 `, [categoria_id]);

        if (respostaCategoria.rowCount < 1) {
            return res.status(404).json({ mensagem: `Não existe categoria para o categoria_id informado.` });
        }

        if (!tipoValido.includes(tipo)) {
            return res.status(400).json({ mensagem: "O tipo de transacao deve ser 'entrada' ou 'saida'." })
        }
        const cadastro = `insert into transacoes (tipo, descricao, valor, data, categoria_id, usuario_id)
        values ($1, $2, $3, $4, $5, $6) returning *, 
        (SELECT descricao FROM categorias WHERE id = $5) AS categoria_nome;`
        const parametros = [tipo, descricao, valor, data, categoria_id, idUsuario];
        const saida = await pool.query(cadastro, parametros);

        return res.status(201).json(saida.rows[0])

    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}

const atualizar = async (req, res) => {
    try {
        const { tipo, descricao, valor, data, categoria_id } = req.body;
        const idUsuario = req.usuario;
        const idTransacao = req.params.id;
        const tipoValido = ['entrada', 'saida'];

        // verificando se existe transacao com o id recebido do params.
        const validarTransacao = await pool.query(`select * from transacoes 
        where usuario_id = $1 and id = $2`, [idUsuario, idTransacao]);
        if (validarTransacao.rowCount < 1) {
            return res.status(404).json({ mensagem: `Não existe transacao para o id informado.` });
        }

        if (!tipo || !descricao || !valor || !data || !categoria_id) {
            return res.status(404).json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
        }

        const respostaCategoria = await pool.query(`select * from categorias where id = $1 `, [categoria_id]);
        //validando se existe categoria para o id enviado no corpo (body) da requisição.
        if (respostaCategoria.rowCount < 1) {
            return res.status(404).json({ mensagem: `Não existe categoria para o categoria_id informado.` });
        }

        if (!tipoValido.includes(tipo)) {
            return res.status(400).json({ mensagem: "O tipo de transacao deve ser 'entrada' ou 'saida'." })
        }
        const atualizaTransacao = `update transacoes set descricao = $1, valor = $2, data = $3, 
        categoria_id = $4, tipo = $5 where id = $6`
        const parametros = [descricao, valor, data, categoria_id, tipo, idTransacao];
        await pool.query(atualizaTransacao, parametros);

        return res.status(204).send();


    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}

const excluir = async (req, res) => {
    try {
        const idTransacao = req.params.id;
        const idUsuario = req.usuario;

        const validarTransacao = await pool.query(`select * from transacoes 
        where usuario_id = $1 and id = $2`, [idUsuario, idTransacao]);
        if (validarTransacao.rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }

        await pool.query(`delete from transacoes where id = $1`, [idTransacao]);

        return res.status(200).send();

    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}


const extrato = async (req, res) => {
    try {
        const idUsuario = req.usuario;

        const query = `select tipo, sum(valor) as valorsomado from transacoes
            where usuario_id = $1 group by tipo order by tipo asc`;

        const extrato = await pool.query(query, [idUsuario]);

        let entrada = 0;
        let saida = 0;

        extrato.rows.forEach((linha) => {
            if (linha.tipo === 'entrada') {
                entrada = Number(linha.valorsomado);
            } else if (linha.tipo === 'saida') {
                saida = Number(linha.valorsomado);
            }
        });

        return res.status(200).json({ entrada, saida });


    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        });
    }
}

module.exports = {
    listar,
    transacaoUsuarioPorId,
    cadastrar,
    atualizar,
    excluir,
    extrato,
}

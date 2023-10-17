const pool = require("../conexao");
const fs = require('fs');

const listar = async (req, res) => {
    try {
        const listaCategorias = await pool.query(`select * from categorias`);
        // const dadoPreparado = JSON.stringify(listaCategorias.rows);
        // fs.writeFileSync('./src/log/registro.json', dadoPreparado);
        return res.status(200).json(listaCategorias.rows);

    } catch (erro) {
        console.log({ 'mensagem': erro.message });
        return res.status(500).json({
            "mensagem": "Erro interno do Servidor."
        })
    }
}

module.exports = {
    listar,
}

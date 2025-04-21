const { pool } = require('../../config');
const Pais = require('../entities/pais');

const getPaisPorCodigoDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM pais
        WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id}`;
        } else {
            const pais = results.rows[0];
            return new Pais(pais.id, pais.nome);
        }
    } catch (err) {
        throw "Erro ao recuperar o país: " + err;
    }
}

module.exports = {
    getPaisPorCodigoDB
}
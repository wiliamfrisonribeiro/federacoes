const { pool } = require('../../config');
const Estado = require('../entities/estado');

const getEstadoPorCodigoDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM estado
        WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id}`;
        } else {
            const estado = results.rows[0];
            return new Estado(estado.id, estado.nome, estado.pais_id);  
        }
    } catch (err) {
        throw "Erro ao recuperar o estado: " + err;   
    }
}

module.exports = {
    getEstadoPorCodigoDB
}
const { pool } = require('../../config');
const Estado = require('../entities/estado');

const getEstadosDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT e.*, p.nome as pais_nome 
            FROM estado e
            LEFT JOIN pais p ON e.pais_id = p.id
            ORDER BY e.id
        `);
        return rows.map((estado) => new Estado(estado.id, estado.nome, estado.pais_id, estado.pais_nome));   
    } catch (err) {
        throw "Erro: " + err;
    }
}

module.exports = {
    getEstadosDB
}
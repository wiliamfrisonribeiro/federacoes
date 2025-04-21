const { pool } = require('../../config');
const Pais = require('../entities/pais');

const updatePaisDB = async (objeto) => {
    try {
        const { id, nome } = objeto;    
        console.log("id: " + id);
        console.log("nome: " + nome);
        const results = await pool.query(`UPDATE pais set nome = $2
        WHERE id = $1`, [id, nome]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;    
        }
    } catch (err) {
        throw "Erro ao alterar o país: " + err;
    }
}

module.exports = {
    updatePaisDB
}
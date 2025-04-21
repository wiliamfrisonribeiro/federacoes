const { pool } = require('../../config');
const Estado = require('../entities/estado');

const updateEstadoDB = async (objeto) => {    
    try {
        const { id, nome, pais_id } = objeto;    
        
        const results = await pool.query(`UPDATE estado set nome = $2, pais_id = $3
        WHERE id = $1`, [id, nome, pais_id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;    
        }
    } catch (err) {
            throw "Erro ao alterar o estado: " + err;   
    }
}

module.exports = {
    updateEstadoDB
}
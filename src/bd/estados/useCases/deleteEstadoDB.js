const { pool } = require('../../config');
const Estado = require('../entities/estado');

const deleteEstadoDB = async (id) => {
    try {
        console.log("federation");
        const results = await pool.query(`DELETE FROM estado WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return `Estado de código ${id} removido com sucesso!`;
        } 
    } catch (err) {
        
        throw "Erro: " + err;

  
    }
}

module.exports = {
    deleteEstadoDB
}
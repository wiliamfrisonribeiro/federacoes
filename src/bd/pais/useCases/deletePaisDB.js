const { pool } = require('../../config');
const Pais = require('../entities/pais');

const deletePaisDB = async (id) => {
    try {
        console.log("federation");
        const results = await pool.query(`DELETE FROM pais WHERE id = $1`, [id]);
        console.log("results", results.rowCount);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return `Pais de código ${id} removido com sucesso!`;
        } 
    } catch (err) {
        
        throw "Erro: " + err;

  
    }
}

module.exports = {
    deletePaisDB
}
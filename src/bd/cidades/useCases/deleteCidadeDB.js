const { pool } = require('../../config');
const Cidade = require('../entities/cidade');   

const deleteCidadeDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM cidade WHERE id = $1`, [id]);
        console.log("results", results.rowCount);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return `Cidade de código ${id} removida com sucesso!`;
        } 
    } catch (err) {
        
        throw "Erro: " + err;

  
    }
}

module.exports = {
    deleteCidadeDB
}
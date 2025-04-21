const { pool } = require('../../config');
const Cidade = require('../entities/cidade');

const updateCidadeDB = async (objeto) => {    
    try {
        const { id, nome, estado_id } = objeto;    
        
        const results = await pool.query(`UPDATE cidade set nome = $2, estado_id = $3
        WHERE id = $1`, [id, nome, estado_id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;    
        }
    } catch (err) {
        throw "Erro ao alterar a cidade: " + err;   
    }
}

module.exports = {
    updateCidadeDB
}
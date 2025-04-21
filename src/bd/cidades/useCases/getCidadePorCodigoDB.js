const { pool } = require('../../config');

const getCidadePorCodigoDB = async (id) => {
    try {
        const results = await pool.query(`
            SELECT c.*, 
                   e.nome as estado_nome,
                   p.id as pais_id,
                   p.nome as pais_nome
            FROM cidade c
            LEFT JOIN estado e ON c.estado_id = e.id
            LEFT JOIN pais p ON e.pais_id = p.id
            WHERE c.id = $1
        `, [id]);
        
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id}`;
        } else {
            return results.rows[0];  
        }
    } catch (err) {
        throw "Erro ao recuperar a cidade: " + err;   
    }
}

module.exports = {
    getCidadePorCodigoDB
}
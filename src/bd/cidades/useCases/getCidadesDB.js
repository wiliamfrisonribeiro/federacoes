const { pool } = require('../../config');

const getCidadesDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT c.*, 
                   e.nome as estado_nome,
                   p.id as pais_id,
                   p.nome as pais_nome
            FROM cidade c
            LEFT JOIN estado e ON c.estado_id = e.id
            LEFT JOIN pais p ON e.pais_id = p.id
            ORDER BY c.id
        `);
        // Retornar objetos planos em vez de instâncias da classe Cidade
        return rows;   
    } catch (err) {
        throw "Erro: " + err;
    }
}

module.exports = {
    getCidadesDB
}
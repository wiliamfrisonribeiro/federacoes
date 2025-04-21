const { pool } = require('../../config');

const getUsuarioLogadoDB = async (email) => {
    try {
        const results = await pool.query(
            `SELECT * FROM usuarios WHERE email = $1`, 
            [email]
        );
        
        if (results.rowCount === 0) {
            throw "Usuário não encontrado";
        }
        
        return results.rows[0];
    } catch (err) {
        throw "Erro ao buscar usuário: " + err;
    }
}

module.exports = {
    getUsuarioLogadoDB
} 
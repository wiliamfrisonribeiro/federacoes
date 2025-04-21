const { pool } = require('../../config');

const updateUsuarioLogadoDB = async (objeto) => {
    try {
        const { email, nome, telefone, senha } = objeto;
        
        // Verificar se o usuário existe
        const checkUser = await pool.query(
            `SELECT * FROM usuarios WHERE email = $1`, 
            [email]
        );
        
        if (checkUser.rowCount === 0) {
            throw "Usuário não encontrado";
        }
        
        // Atualizar usuário
        if (senha) {
            // Se a senha foi fornecida, atualiza todos os campos
            await pool.query(
                `UPDATE usuarios SET nome = $1, telefone = $2, senha = $3 WHERE email = $4`, 
                [nome, telefone, senha, email]
            );
        } else {
            // Se a senha não foi fornecida, atualiza apenas nome e telefone
            await pool.query(
                `UPDATE usuarios SET nome = $1, telefone = $2 WHERE email = $3`, 
                [nome, telefone, email]
            );
        }
        
        return { success: true, message: "Usuário atualizado com sucesso" };
    } catch (err) {
        throw "Erro ao atualizar usuário: " + err;
    }
}

module.exports = {
    updateUsuarioLogadoDB
} 
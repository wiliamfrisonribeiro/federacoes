const { pool } = require('@/bd/config');
const Usuario = require('@/bd/usuarios/entities/Usuario')

const autenticaUsuarioDB = async (objeto) => {
    try {
        const { email, senha } = objeto;
        console.log('Email: ' + email + " Senha: " + senha)
        const results = await pool.query(`SELECT * FROM usuarios 
            WHERE email = $1 AND senha = $2`, [email, senha]);
        if (results.rowCount == 0){
            throw "Usuário ou senha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.tipo,
                            usuario.telefone, usuario.nome);
    } catch(err){
        throw "Erro ao autenticar o usuário: " + err;
    }
}

const addUsuarioDB = async (objeto) => {
    try {
        const { email, senha, nome, telefone, tipo } = objeto;
        
        // Verificar se o email já existe
        const checkEmail = await pool.query(
            `SELECT * FROM usuarios WHERE email = $1`, 
            [email]
        );
        
        if (checkEmail.rowCount > 0) {
            throw "Email já cadastrado";
        }
        
        // Inserir novo usuário
        await pool.query(
            `INSERT INTO usuarios (email, senha, nome, telefone, tipo) 
             VALUES ($1, $2, $3, $4, $5)`, 
            [email, senha, nome, telefone, tipo || 'user']
        );
        
        return { success: true, message: "Usuário cadastrado com sucesso" };
    } catch(err) {
        throw "Erro ao cadastrar usuário: " + err;
    }
}

module.exports = { autenticaUsuarioDB, addUsuarioDB }
const { pool } = require('../../config');
const Cidade = require('../entities/cidade');

const addCidadeDB = async (objeto) => {   
    try {
        const { nome, estado_id } = objeto;
        await pool.query(`INSERT INTO cidade (nome, estado_id) VALUES ($1, $2)`, [nome, estado_id]);        
    } catch (err) {
        throw "Erro ao inserir a cidade: " + err;
    }
}

module.exports = {
    addCidadeDB
}
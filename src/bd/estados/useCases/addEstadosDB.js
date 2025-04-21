const { pool } = require('../../config');
const Estado = require('../entities/estado');

const addEstadoDB = async (objeto) => {   
    try {
        const { nome, pais_id } = objeto;
        await pool.query(`INSERT INTO estado (nome, pais_id) VALUES ($1, $2)`, [nome, pais_id]);        
    } catch (err) {
        throw "Erro ao inserir o país: " + err;
    }
}

module.exports = {
    addEstadoDB
}
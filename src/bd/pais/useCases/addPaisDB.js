const { pool } = require('../../config');
const Pais = require('../entities/pais');

const addPaisDB = async (objeto) => {   
    try {
        const { nome } = objeto;
        await pool.query(`INSERT INTO pais (nome) VALUES ($1)`, [nome]);        
    } catch (err) {
        throw "Erro ao inserir o país: " + err;
    }
}

module.exports = {
    addPaisDB
}
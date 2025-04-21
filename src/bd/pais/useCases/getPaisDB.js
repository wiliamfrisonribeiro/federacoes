const { pool } = require('../../config');
const Pais = require('../entities/pais');

const getPaisDB = async () => {
    try {
        console.log("federation");
        const { rows } = await pool.query(`SELECT * FROM pais ORDER BY id`);
        console.log("rows", rows);


        console.log("federation", rows);
        return rows.map((pais) => new Pais(pais.id, pais.nome));   
    } catch (err) {
        
        throw "Erro: " + err;

  
    }
}

module.exports = {
    getPaisDB
}
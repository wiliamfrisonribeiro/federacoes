const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

let pool = null;
if (isProduction) {

      console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);  
  debugger
  pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl: {
      rejectUnauthorized: false,
    }
  })
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  console.log("process.env.DATABASE_URL", pool);
}

// Testar a conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  }
});

module.exports = { pool }
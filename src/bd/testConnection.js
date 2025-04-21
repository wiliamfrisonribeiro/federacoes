const { pool } = require('./config');

async function testConnection() {
    try {
        console.log('Tentando conectar ao banco de dados...');
        const result = await pool.query('SELECT NOW()');
        console.log('Conexão bem-sucedida!');
        console.log('Data/hora do servidor:', result.rows[0].now);
        
        // Verificar se a tabela pais existe
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'pais'
            );
        `);
        
        console.log('Tabela pais existe:', tableCheck.rows[0].exists);
        
        if (tableCheck.rows[0].exists) {
            // Verificar a estrutura da tabela
            const tableStructure = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'pais';
            `);
            
            console.log('Estrutura da tabela pais:');
            tableStructure.rows.forEach(column => {
                console.log(`- ${column.column_name}: ${column.data_type}`);
            });
            
            // Verificar se há dados na tabela
            const rowCount = await pool.query('SELECT COUNT(*) FROM pais;');
            console.log('Número de registros na tabela pais:', rowCount.rows[0].count);
        }
        
        return true;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return false;
    } finally {
        // Fechar o pool de conexões
        await pool.end();
    }
}

// Executar o teste se este arquivo for executado diretamente
if (require.main === module) {
    testConnection()
        .then(success => {
            if (success) {
                console.log('Teste de conexão concluído com sucesso.');
            } else {
                console.log('Teste de conexão falhou.');
            }
            process.exit(success ? 0 : 1);
        })
        .catch(err => {
            console.error('Erro durante o teste de conexão:', err);
            process.exit(1);
        });
}

module.exports = { testConnection }; 
import { testConnection } from '@/bd/testConnection';

export default async function TestDB() {
    try {
        const connectionResult = await testConnection();
        console.log("connectionResult", connectionResult);
        return (
            <div style={{ padding: '20px' }}>
                <h1>Teste de Conexão com o Banco de Dados</h1>
                <div className={`alert ${connectionResult ? 'alert-success' : 'alert-danger'}`}>
                    <p>Status da conexão: <strong>{connectionResult ? 'CONECTADO' : 'FALHA NA CONEXÃO'}</strong></p>
                    <p>Verifique o console do servidor para mais detalhes.</p>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div style={{ padding: '20px' }}>
                <h1>Erro ao Testar a Conexão com o Banco de Dados</h1>
                <div className="alert alert-danger">
                    <p>Ocorreu um erro ao testar a conexão:</p>
                    <pre>{error.message}</pre>
                </div>
            </div>
        );
    }
} 
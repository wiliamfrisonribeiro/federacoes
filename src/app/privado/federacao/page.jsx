import { getFederacaoDB } from '@/bd/federacao/useCases/getFederacaoDB';
import { deleteFederacaoDB } from '@/bd/federacao/useCases/deleteFederacaoDB';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Federacao() {
    const federacoes = await getFederacaoDB();

    const deleteFederacao = async (id) => {
        'use server';
        try {
            await deleteFederacaoDB(id);
        } catch (err) {
            console.log(err);
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/federacao/');
    };

    return (
        <div className="container mt-4">
            <h2>Federações</h2>
            <Link href="/privado/federacao/0/formulario" className="btn btn-primary mb-3">Nova Federação</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>País</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {federacoes.map((federacao) => (
                        <tr key={federacao.id}>
                            <td>{federacao.id}</td>
                            <td>{federacao.nome}</td>
                            <td>{federacao.pais_nome}</td>
                            <td>
                                <Link href={`/privado/federacao/${federacao.id}/formulario`} className="btn btn-sm btn-primary me-2">Editar</Link>
                                <form action={deleteFederacao.bind(null, federacao.id)} className="d-inline">
                                    <button type="submit" className="btn btn-sm btn-danger">Excluir</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 
import { getPaisDB } from '@/bd/pais/useCases/getPaisDB';
import { deletePaisDB } from '@/bd/pais/useCases/deletePaisDB';
import { redirect } from 'next/navigation';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
export default async function Pais() {
    const paises = await getPaisDB();

    const deletePais = async (id) => {
        'use server';
        try {
            await deletePaisDB(id);
        } catch (err) {
            console.log(err);
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/pais/');
    };

    return (
        <div className="container mt-4">
            <h2>Países</h2>
            <Link href="/privado/pais/0/formulario" className="btn btn-primary mb-3">Novo País</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {paises.map((pais) => (
                        <tr key={pais.id}>
                            <td>{pais.id}</td>
                            <td>{pais.nome}</td>
                            <td>
                                <Link href={`/privado/pais/${pais.id}/formulario`} className="btn btn-sm btn-primary me-2">Editar</Link>
                                <form action={deletePais.bind(null, pais.id)} className="d-inline">
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
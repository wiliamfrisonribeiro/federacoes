import { getCidadesDB } from '@/bd/cidades/useCases/getCidadesDB';
import { deleteCidadeDB } from '@/bd/cidades/useCases/deleteCidadeDB';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';

export const dynamic = 'force-dynamic';

export default async function Cidades() {
    const cidades = await getCidadesDB();
    
    const deleteCidade = async (id) => {
        'use server';
        try {
            await deleteCidadeDB(id);
        } catch (err) {
            console.log(err);
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/cidades/');     
    };

    return (
        <div className="container mt-4">
            <Suspense fallback={<Loading />}>
                <h2>Cidades</h2>
                <Link href="/privado/cidades/0/formulario" className="btn btn-primary mb-3">Nova Cidade</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Estado</th>
                            <th>País</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cidades.map((cidade) => (
                            <tr key={cidade.id}>
                                <td>{cidade.id}</td>
                                <td>{cidade.nome}</td>
                                <td>{cidade.estado_nome} (ID: {cidade.estado_id})</td>
                                <td>{cidade.pais_nome} (ID: {cidade.pais_id})</td>
                                <td>
                                    <Link href={`/privado/cidades/${cidade.id}/formulario`} className="btn btn-sm btn-primary me-2">Editar</Link>       
                                    <form action={deleteCidade.bind(null, cidade.id)} className="d-inline">
                                        <button type="submit" className="btn btn-sm btn-danger">Excluir</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Suspense>
        </div>
    );
} 
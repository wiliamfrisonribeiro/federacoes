import { getEstadosDB } from '@/bd/estados/useCases/getEstadosDB';
import { deleteEstadoDB } from '@/bd/estados/useCases/deleteEstadoDB';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';
export const dynamic = 'force-dynamic';
export default async function Estados() {
    const estados = await getEstadosDB();
    const deleteEstado = async (id) => {
        'use server';
        try {
            await deleteEstadoDB(id);
        } catch (err) {
            console.log(err);
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/estados/');     
    };
    return (
        <div className="container mt-4">
            <Suspense fallback={<Loading />}>
                <h2>Estados</h2>
                <Link href="/privado/estados/0/formulario" className="btn btn-primary mb-3">Novo Estado</Link>
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
                    {estados.map((estado) => (
                        <tr key={estado.id}>
                            <td>{estado.id}</td>
                            <td>{estado.nome}</td>
                            <td>{estado.pais_nome || 'Não definido'}</td>
                            <td>
                                <Link href={`/privado/estados/${estado.id}/formulario`} className="btn btn-sm btn-primary me-2">Editar</Link>
                                <form action={deleteEstado.bind(null, estado.id)} className="d-inline">
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
import { notFound, redirect } from 'next/navigation';
import { getPaisPorCodigoDB } from '@/bd/pais/useCases/getPaisPorCodigoDB';
import { updatePaisDB } from '@/bd/pais/useCases/updatePaisDB';
import { addPaisDB } from '@/bd/pais/useCases/addPaisDB'; 
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';

const FormularioPage = async ({ params }) => {
    let pais = null;
    // capturando os parametros
    const { codigo } = await params;
    if (codigo == 0) {
        pais = { id: 0, nome: "" };
    } else {
        try {                        
            pais = await getPaisPorCodigoDB(codigo);   
            
            console.log("pais: " + pais.id);
        } catch (err) {
            return notFound();
        }
    }

    const salvarPais = async (formData) => {
        'use server';
        console.log("formData: " + formData);
        const objeto = {
            id: formData.get('id'),
            nome: formData.get('nome')
        }
        try {
            console.log("objeto: " + objeto.id);
            if (objeto.id == 0) {
                await addPaisDB(objeto)
            } else {
                console.log("objeto.id: " + objeto.id);
                debugger
                await updatePaisDB(objeto)
            }

        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/pais/');
    };

    return (
        <div className="container mt-4">
            <Suspense fallback={<Loading />}>
                <h2>{codigo == 0 ? 'Novo País' : 'Editar País'}</h2>
                <form action={salvarPais}>
                    <div className="mb-3">
                    <label htmlFor="id" className="form-label">Código</label>
                    <input type="number" className="form-control" id="id" name="id" defaultValue={pais.id} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" name="nome" defaultValue={pais.nome} required />
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
            </Suspense>
        </div>
    );
};

export default FormularioPage;
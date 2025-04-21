import { notFound, redirect } from 'next/navigation';
import { getEstadosDB } from '@/bd/estados/useCases/getEstadosDB';
import { getCidadePorCodigoDB } from '@/bd/cidades/useCases/getCidadePorCodigoDB';
import { addCidadeDB } from '@/bd/cidades/useCases/addCidadeDB';
import { updateCidadeDB } from '@/bd/cidades/useCases/updateCidadeDB';
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';
const FormularioPage = async ({ params }) => {
    let cidade = null;

    const estados = await getEstadosDB();
    console.log("estados: " + estados);
    // capturando os parametros
    const { codigo } = await params;
    if (codigo == 0) {
        cidade = { id: 0, nome: "", estado_id: 0 };
    } else {
        try {                        
            cidade = await getCidadePorCodigoDB(codigo);   
            console.log("cidade: " + cidade);
    
        } catch (err) {
            return notFound();
        }
    }

    const salvarCidade = async (formData) => {
        'use server';
        console.log("formData: " + formData);
        const objeto = {
            id: formData.get('id'),
            nome: formData.get('nome'),
            estado_id: formData.get('estado_id')
        }
        try {
            console.log("objeto: " + objeto.id);
            if (objeto.id == 0) {
                await addCidadeDB(objeto)
            } else {
                console.log("objeto.id: " + objeto.id);
            
                await updateCidadeDB(objeto)
            }

        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/cidades/');
    };

    return (
        <div className="container mt-4">
            <Suspense fallback={<Loading />}>
                <h2>{codigo == 0 ? 'Nova Cidade' : 'Editar Cidade'}</h2>
                <form action={salvarCidade}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Código</label>
                    <input type="number" className="form-control" id="id" name="id" defaultValue={cidade.id} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" name="nome" defaultValue={cidade.nome} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="estado_id" className="form-label">Estado</label>
                    <select className="form-select" id="estado_id" name="estado_id" defaultValue={cidade.estado_id} required>
                        <option value="">Selecione um estado</option>
                        {estados.map((estado) => (
                            <option key={estado.id} value={estado.id}>
                                {estado.nome}
                            </option>
                        ))}
                    </select>
                </div>
                
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
            </Suspense>
        </div>
    );
};

export default FormularioPage;
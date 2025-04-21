import { notFound, redirect } from 'next/navigation';
import { getEstadoPorCodigoDB } from '@/bd/estados/useCases/getEstadoPorCodigoDB';
import { updateEstadoDB } from '@/bd/estados/useCases/updateEstadoDB';
import { addEstadoDB } from '@/bd/estados/useCases/addEstadosDB';
import { getPaisDB } from '@/bd/pais/useCases/getPaisDB';   
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';


const FormularioPage = async ({ params }) => {
    let estado = null;

    const paises = await getPaisDB();
    console.log("paises: " + paises);
    // capturando os parametros
    const { codigo } = await params;
    if (codigo == 0) {
        estado = { id: 0, nome: "", pais_id: 0 };
    } else {
        try {                        
            estado = await getEstadoPorCodigoDB(codigo);   
            
            console.log("estado: " + estado.id);
        } catch (err) {
            return notFound();
        }
    }

    const salvarEstado = async (formData) => {
        'use server';
        console.log("formData: " + formData);
        const objeto = {
            id: formData.get('id'),
            nome: formData.get('nome'),
            pais_id: formData.get('pais_id')
        }
        try {
            console.log("objeto: " + objeto.id);
            if (objeto.id == 0) {
                await addEstadoDB(objeto)
            } else {
                console.log("objeto.id: " + objeto.id);
            
                await updateEstadoDB(objeto)
            }

        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/estados/');
    };

    return (
        <div className="container mt-4">
            <Suspense fallback={<Loading />}>
                <h2>{codigo == 0 ? 'Novo Estado' : 'Editar Estado'}</h2>
                <form action={salvarEstado}>
                    <div className="mb-3">
                    <label htmlFor="id" className="form-label">Código</label>
                    <input type="number" className="form-control" id="id" name="id" defaultValue={estado.id} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" name="nome" defaultValue={estado.nome} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="pais_id" className="form-label">País</label>
                    <select className="form-select" id="pais_id" name="pais_id" defaultValue={estado.pais_id} required>
                        <option value="">Selecione um país</option>
                        {paises.map((pais) => (
                            <option key={pais.id} value={pais.id}>
                                {pais.nome}
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
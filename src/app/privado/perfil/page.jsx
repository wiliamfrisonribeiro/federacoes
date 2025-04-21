import { getUsuarioLogadoDB } from '@/bd/usuarios/useCases/getUsuarioLogadoDB';
import { updateUsuarioLogadoDB } from '@/bd/usuarios/useCases/updateUsuarioLogadoDB';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Perfil() {
    // Obter o email do usuário logado do cookie
    const cookieStore = cookies();
    const email = cookieStore.get('email')?.value;
    
    if (!email) {
        redirect('/login');
    }
    
    // Obter os dados do usuário
    const usuario = await getUsuarioLogadoDB(email);
    
    const salvarPerfil = async (formData) => {
        'use server';
        
        const objeto = {
            email: formData.get('email'),
            nome: formData.get('nome'),
            telefone: formData.get('telefone'),
            senha: formData.get('senha') || null
        };
        
        try {
            await updateUsuarioLogadoDB(objeto);
            redirect('/privado/perfil?success=true');
        } catch (err) {
            console.error(err);
            redirect('/privado/perfil?error=' + encodeURIComponent(err.message));
        }
    };

    return (
        <div className="container mt-4">
            <Suspense fallback={<Loading />}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <h3 className="mb-0">Editar Perfil</h3>
                                <Link href="/privado/perfil/visualizar" className="btn btn-light btn-sm">
                                    Ver Perfil
                                </Link>
                            </div>
                            <div className="card-body">
                                <form action={salvarPerfil}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            name="email" 
                                            defaultValue={usuario.email} 
                                            readOnly 
                                        />
                                        <div className="form-text">O email não pode ser alterado.</div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="nome" 
                                            name="nome" 
                                            defaultValue={usuario.nome} 
                                            required 
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="telefone" className="form-label">Telefone</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="telefone" 
                                            name="telefone" 
                                            defaultValue={usuario.telefone} 
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="senha" className="form-label">Nova Senha (deixe em branco para manter a atual)</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="senha" 
                                            name="senha" 
                                        />
                                    </div>
                                    
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                                        <Link href="/privado/perfil/visualizar" className="btn btn-outline-secondary">
                                            Cancelar
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
} 
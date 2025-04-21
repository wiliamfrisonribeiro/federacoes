'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Loading from '@/components/comuns/Loading';
import { useRouter } from 'next/navigation';
import { buscarUsuarioLogado, atualizarUsuarioLogado } from './actions';

export default function User() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    
    const fetchUsuario = async () => {
      try {
        const email = session.user.email;
        console.log("email: " + email);
        const result = await buscarUsuarioLogado(email);
        
        if (result.error) {
          throw new Error(result.error);
        }
        
        setUsuario(result.usuario);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setMessage({ type: 'error', text: error.message || 'Erro ao carregar dados do usuário' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsuario();
  }, [session, status, router]);

  const salvarPerfil = async (formData) => {
    try {
        const email = session.user.email;
        console.log("email: " + email);
      const result = await atualizarUsuarioLogado(formData, email);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setUsuario(result.usuario);
      setMessage({ type: 'success', text: result.message || 'Perfil atualizado com sucesso!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || 'Erro ao atualizar perfil' });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!usuario) {
    return <div className="container mt-4">Usuário não encontrado</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Editar Meu Perfil</h3>
            </div>
            <div className="card-body">
              {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-3`}>
                  {message.text}
                </div>
              )}
              
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
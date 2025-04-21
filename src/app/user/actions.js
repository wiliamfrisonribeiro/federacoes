'use server';

import { getUsuarioLogadoDB } from '@/bd/usuarios/useCases/getUsuarioLogadoDB';
import { updateUsuarioLogadoDB } from '@/bd/usuarios/useCases/updateUsuarioLogadoDB';


export async function buscarUsuarioLogado(email) {
  try {
    console.log("email: " + email);

    if (!email) {
      return { error: 'Usuário não autenticado' };
    }
    const usuario = await getUsuarioLogadoDB(email);
    
    if (!usuario) {
      return { error: 'Usuário não encontrado' };
    }
    
    return { usuario };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { error: 'Erro ao buscar dados do usuário' };
  }
}

export async function atualizarUsuarioLogado(formData, email) {
  try {
    console.log("email: " + email);
    
    if (!email) {
      return { error: 'Usuário não autenticado' };
    }
    
    const objeto = {
      email: email,
      nome: formData.get('nome'),
      telefone: formData.get('telefone'),
      senha: formData.get('senha') || null
    };
    
    await updateUsuarioLogadoDB(objeto);
    
    // Buscar os dados atualizados
    const usuario = await getUsuarioLogadoDB(email);
    
    return { 
      message: 'Perfil atualizado com sucesso',
      usuario 
    };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return { error: 'Erro ao atualizar dados do usuário' };
  }
} 
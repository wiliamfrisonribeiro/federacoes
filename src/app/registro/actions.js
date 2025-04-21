'use server';

import { addUsuarioDB } from '@/bd/usuarios/useCases/usuarioUseCases';

export async function registrarUsuario(formData) {
  try {
    // Extrair os dados do FormData
    const nome = formData.get('nome');
    const email = formData.get('email');
    const senha = formData.get('senha');
    const telefone = formData.get('telefone');
    
    // Validação básica
    if (!email || !senha || !nome) {
      return { error: 'Email, senha e nome são obrigatórios' };
    }
    
    // Registrar o usuário
    await addUsuarioDB({
      nome,
      email,
      senha,
      telefone,
      tipo: 'U'
    });
    
    return { success: true, message: 'Usuário registrado com sucesso' };
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return { error: error.message || 'Erro ao registrar usuário' };
  }
} 
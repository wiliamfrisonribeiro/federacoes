import { getUsuarioLogadoDB } from '@/bd/usuarios/useCases/getUsuarioLogadoDB';
import { updateUsuarioLogadoDB } from '@/bd/usuarios/useCases/updateUsuarioLogadoDB';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get('email')?.value;
    
    if (!email) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    
    const usuario = await getUsuarioLogadoDB(email);
    
    if (!usuario) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados do usuário' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get('email')?.value;
    
    if (!email) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Garantir que o email não seja alterado
    const objeto = {
      email: email,
      nome: data.nome,
      telefone: data.telefone,
      senha: data.senha || null
    };
    
    await updateUsuarioLogadoDB(objeto);
    
    // Buscar os dados atualizados
    const usuario = await getUsuarioLogadoDB(email);
    
    return NextResponse.json({ 
      message: 'Perfil atualizado com sucesso',
      usuario 
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json({ error: 'Erro ao atualizar dados do usuário' }, { status: 500 });
  }
} 
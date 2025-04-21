'use server';

import { getCidadesDB } from '@/bd/cidades/useCases/getCidadesDB';

export async function buscarCidades() {
  try {
    const cidades = await getCidadesDB();
    return { success: true, data: cidades };
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return { error: error.message || 'Erro ao buscar cidades' };
  }
} 
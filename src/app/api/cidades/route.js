import { getCidadesDB } from '@/bd/cidades/useCases/getCidadesDB';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const cidades = await getCidadesDB();
        return NextResponse.json(cidades);
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar cidades' },
            { status: 500 }
        );
    }
} 
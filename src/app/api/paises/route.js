import { NextResponse } from 'next/server';

// Simulando um banco de dados em memória
let paises = [
    { id: 1, nome: 'Brasil', sigla: 'BR' },
    { id: 2, nome: 'Argentina', sigla: 'AR' },
    { id: 3, nome: 'Chile', sigla: 'CL' }
];

export async function GET() {
    return NextResponse.json(paises);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const novoPais = {
            id: paises.length + 1,
            nome: body.nome,
            sigla: body.sigla
        };
        paises.push(novoPais);
        return NextResponse.json(novoPais, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar país' },
            { status: 500 }
        );
    }
} 
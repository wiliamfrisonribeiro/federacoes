'use client';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { buscarCidades } from './actions';

export default function Home() {
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const result = await buscarCidades();
        console.log("result: " + result);
        if (result.error) {
          throw new Error(result.error);
        }
        
        setCidades(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCidades();
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm border-0 mt-5">
            <Card.Body className="p-5">
            <h1 className="display-4 mb-4">Sistema de Federações</h1>
              <p className="lead mb-4">
                Bem-vindo ao sistema de gerenciamento de federações. 
                Este sistema permite gerenciar países, estados e cidades.
              </p>
              <hr className="my-4" />
              <h2 className="text-center mb-4">Cidades Cadastradas</h2>
            
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                  <p className="mt-3">Carregando cidades...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : cidades.length === 0 ? (
                <div className="alert alert-info" role="alert">
                  Nenhuma cidade cadastrada.
                </div>
              ) : (
                <Row className="g-4">
                  {cidades.map((cidade) => (
                    <Col key={cidade.id} md={4}>
                      <Card className="h-100 shadow-sm hover-card">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <Card.Title className="mb-0">{cidade.nome}</Card.Title>
                            <span className="badge bg-primary rounded-pill">ID: {cidade.id}</span>
                          </div>
                          <Card.Text>
                            <div className="mb-2">
                              <i className="bi bi-map-fill text-success me-2"></i>
                              <strong>Estado:</strong> {cidade.estado_nome || 'Não definido'}
                            </div>
                            <div>
                              <i className="bi bi-globe text-primary me-2"></i>
                              <strong>País:</strong> {cidade.pais_nome || 'Não definido'}
                            </div>
                          </Card.Text>
                          <div className="mt-3 d-flex justify-content-between">
                            <Link 
                              href={`/privado/cidades/${cidade.id}/formulario`} 
                              className="btn btn-outline-primary btn-sm"
                            >
                              <i className="bi bi-pencil-square me-1"></i> Editar
                            </Link>
                            <Link 
                              href={`/privado/cidades`} 
                              className="btn btn-outline-secondary btn-sm"
                            >
                              <i className="bi bi-list me-1"></i> Ver Todas
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
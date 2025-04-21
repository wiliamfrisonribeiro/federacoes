'use client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Sobre() {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">Sobre o Sistema</h3>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <i className="bi bi-info-circle display-1 text-primary"></i>
                                <h2 className="mt-3">Sistema de Federações</h2>
                                <p className="lead">Desenvolvido com NextJS 15</p>
                            </div>
                            
                            <hr className="my-4" />
                            
                            <h4 className="mb-3">Funcionalidades</h4>
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Gerenciamento de Países
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Gerenciamento de Estados
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Gerenciamento de Cidades
                                </li>
                            </ul>
                            
                            <h4 className="mb-3">Tecnologias Utilizadas</h4>
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                <span className="badge bg-primary">NextJS 15</span>
                                <span className="badge bg-success">React 19</span>
                                <span className="badge bg-info">PostgreSQL</span>
                                <span className="badge bg-warning text-dark">Bootstrap 5</span>
                                <span className="badge bg-danger">React Bootstrap</span>
                            </div>
                            
                            <div className="alert alert-info">
                                <i className="bi bi-lightbulb me-2"></i>
                                Este sistema foi desenvolvido como parte do estudo da disciplina de LPE (Laboratório de Programação para Web).
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
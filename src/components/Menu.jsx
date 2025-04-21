'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
function Menu() {
    const { data: session } = useSession();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Link className="navbar-brand" href="/">
                    Federações
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" href="/">
                            Home
                        </Link>
                        <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                            <Link className="dropdown-item" href="/privado/pais">
                                Paises
                            </Link>
                            <Link className="dropdown-item" href="/privado/estados">
                                Estados
                            </Link>
                            <Link className="dropdown-item" href="/privado/cidades">
                                Cidades
                            </Link>
                        </NavDropdown>
                        <Link className="nav-link" href="/sobre">
                            Sobre
                        </Link>
                        <Link className="nav-link" href="/privado/test-db">
                            Testar DB
                        </Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown className="bg-white text-amber-50 " title={session == null ? 'Login' : 'Autenticado como: ' + session.user.name} id="basic-nav-dropdown">
                        {session == null &&
                            <>
                                <form action={signIn}>
                                    <button type="submit" className="dropdown-item">Login</button>
                                </form>
                                <Link className="dropdown-item" href="/registro">Registrar</Link>
                            </>
                        }
                        {session != null &&
                            <>
                        <Link className="dropdown-item" href="/user">Meus Dados</Link>
                              
                                <form action={() => signOut({ callbackUrl: '/' })}>
                                    <button type="submit" className="dropdown-item">Logout</button>
                                </form>
                            </>
                        }

                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
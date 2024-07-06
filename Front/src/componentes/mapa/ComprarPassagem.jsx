import React from 'react';
import Map from './Map.jsx';
import "../../styles/ComprarPassagem.css";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaLock } from 'react-icons/fa'; // Importando o ícone de cadeado

function ComprarPassagem() {

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/home">Site de viagens</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Alguma coisa ai</Nav.Link>
                            <Nav.Link href="/admin" className="link-with-icon">
                            <FaLock className='cadeado'/> Admin
                            </Nav.Link>
                            <NavDropdown title="Outras funções" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Logado como: <a href="/">Nome do usuário</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Map apikey={"El7O8U0SD-D3gBWpF7O9aiaWQErLIqPljaEgGRXhuSE"} />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque vero repudiandae ut aut harum tempora ex nisi velit perspiciatis rem. Aliquid debitis aliquam repellat quam, cumque eius velit! Sequi, sint! Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione sapiente ea doloribus provident? Similique magnam recusandae a iusto cumque natus atque quidem, obcaecati adipisci fuga est amet eaque delectus.</p>

            <footer>
                
            </footer>

        </>
    
    );
}

export default ComprarPassagem;

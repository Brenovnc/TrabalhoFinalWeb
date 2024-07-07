import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa'; // Importando o ícone de cadeado
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function NavCustom() {
  return (
    <Navbar className="bg-dark-green sticky-top">
        <Container>
          <Navbar.Brand className="text-light montserrat-bold" href="/home">Site de viagens</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/perfil" className="link-with-icon text-light-green">
                Perfil
              </Nav.Link>
              <Nav.Link href="/admin" className="link-with-icon text-light-green">
                <FaLock className='cadeado text-light-green' /> Admin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="danger text-light" href='/'>Sair</Button>
              {/* <a href="/">Nome do usuário</a> */}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  )
}

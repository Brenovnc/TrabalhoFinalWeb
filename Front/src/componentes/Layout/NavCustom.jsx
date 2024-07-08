import React, { useEffect, useState } from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';

export default function NavCustom() {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/usuario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userData = response.data;
        setUserData(prevUserData => ({ ...prevUserData, role: userData.role, nome: userData.username }));        
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Navbar className="bg-dark-green sticky-top">
      <Container>
        <Navbar.Brand className="text-light montserrat-bold" href="/home">
          Site de viagens
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/perfil" className="link-with-icon text-light-green">
              Perfil
            </Nav.Link>
            {userData?.role === "admin" && (
              <Nav.Link href="/admin" className="link-with-icon text-light-green">
                <FaLock className="cadeado text-light-green" /> Admin
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {userData?.nome ? (
              <>
                <span className="text-light me-5">Bem-vindo, {userData.nome}!</span>
              </>
            ) : null}
            <Button variant="danger text-light" href="/">
              Sair
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

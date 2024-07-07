import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';

// Placeholder image URL
const placeholderImg = 'https://via.placeholder.com/150';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState({ nome: 'Nome do Usuário', passagens: [] });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return formattedDate;
  };

  const handleExcluirPassagem = async (passagemId) => {
    try {
      const token = sessionStorage.getItem('token'); // Assumindo que o token está no sessionStorage
      await axios.delete(`http://localhost:3000/api/passagens/${passagemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Atualiza localmente as passagens do usuário após a exclusão
      const updatedPassagens = usuario.passagens.filter(passagem => passagem.id !== passagemId);
      setUsuario(prevUsuario => ({ ...prevUsuario, passagens: updatedPassagens }));
    } catch (error) {
      console.error('Erro ao excluir passagem:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Assumindo que o token está no sessionStorage
        const response = await axios.get('http://localhost:3000/api/passagens', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const tickets = response.data;
        setUsuario(prevUsuario => ({ ...prevUsuario, passagens: tickets }));
      } catch (error) {
        console.error('Erro ao buscar passagens do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
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

      <div className="container mt-4">
        <Row>
          <Col xs={12} md={4} className="mb-4 d-flex justify-content-center align-items-center">
            <div className="bg-white p-3 rounded shadow text-center">
              <h2 className="h5 mb-4">Perfil do Usuário</h2>
              <Image
                src={usuario.nome ? `https://via.placeholder.com/150` : placeholderImg}
                roundedCircle
                fluid
                className="mb-3"
              />
              <h4 className="h6 mb-3">{usuario.nome}</h4>
              <p className="text-muted mb-3">Detalhes aleatórios do usuário</p>
              <Button variant="outline-primary" className="me-2">Editar Perfil</Button>
              <Button variant="outline-danger">Excluir Conta</Button>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <div className="bg-white p-3 rounded shadow">
              <h2 className="h5 mb-4">Passagens Compradas</h2>
              <ul className="list-group">
                {usuario.passagens.map(passagem => (
                  <li key={passagem.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{passagem.location}</h6>
                      <small className="text-muted">{`Comprada em ${formatDate(passagem.date)}`}</small>
                    </div>
                    <Button variant="outline-danger" onClick={() => handleExcluirPassagem(passagem.id)}>Excluir Compra Efetuada</Button>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 mb-0 mt-2 border-top h-50 bg">
        <p className="col-md-3 mb-0 text-body-secondary">© 2024 Company, Inc</p>

        <ul className="nav col-md-5 justify-content-end me-5">
          <li className="nav-item"><a href="https://github.com/pdrVenancio" className="nav-link px-2 text-body-secondary" target='_blank'>Pedro Venancio</a></li>
          <li className="nav-item"><a href="https://github.com/Pedroca2005BR" className="nav-link px-2 text-body-secondary" target='_blank'>Pedro de Paula</a></li>
          <li className="nav-item"><a href="https://github.com/Brenovnc" className="nav-link px-2 text-body-secondary" target='_blank'>Breno</a></li>
          <li className="nav-item"><a href="https://github.com/RyanForward" className="nav-link px-2 text-body-secondary" target='_blank'>Ryan</a></li>
        </ul>
      </footer>
    </>
  );
};

export default PerfilUsuario;

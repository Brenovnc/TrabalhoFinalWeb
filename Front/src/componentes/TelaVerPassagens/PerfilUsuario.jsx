import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Placeholder image URL
const placeholderImg = 'https://via.placeholder.com/150';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [passagens, setPassagens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3000/api/user/profile');
        setUsuario(userResponse.data);

        const ticketsResponse = await axios.get('http://localhost:3000/api/tickets');
        setPassagens(ticketsResponse.data);
      } catch (error) {
        console.error('Error fetching user data or tickets:', error);
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
              <Button variant="danger text-light" onClick={() => navigate('/')}>Sair</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        {usuario ? (
          <Row>
            <Col xs={12} md={4} className="mb-4 d-flex justify-content-center align-items-center">
              <div className="bg-white p-3 rounded shadow text-center">
                <h2 className="h5 mb-4">Perfil do Usuário</h2>
                <Image
                  src={usuario.foto ? usuario.foto : placeholderImg}
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
                  {passagens.length > 0 ? (
                    passagens.map(passagem => (
                      <li key={passagem.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">{passagem.origem} - {passagem.destino}</h6>
                          <small className="text-muted">{passagem.data}</small>
                        </div>
                        <Button variant="outline-info">Detalhes</Button>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-center">Nenhuma passagem comprada</li>
                  )}
                </ul>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="text-center mt-5">
            <p>Carregando dados do usuário...</p>
          </div>
        )}
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

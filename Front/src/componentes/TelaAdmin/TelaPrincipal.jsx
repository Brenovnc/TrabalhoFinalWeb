import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa'; // Importando o ícone de cadeado
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import InserirNovoLocal from './InserirNovoLocal';
import AtualizarLocal from './AtualizarLocal';
import RemoverLocal from './RemoverLocal';

import '../../styles/TelaPrincipal.css';

const TelaPrincipal = () => {
  const [componenteSelecionado, setComponenteSelecionado] = useState('inserir'); // Estado para controlar o componente exibido

  const handleSelecionarComponente = (componente) => {
    setComponenteSelecionado(componente);
  };

  const handleAtualizar = () => {
    handleSelecionarComponente('atualizar');
    toast.info('Atualizar local existente', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleRemover = () => {
    handleSelecionarComponente('remover');
    toast.warn('Remover local existente', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = (event) => {
    // Lógica para manipular o envio do formulário (se necessário)
    event.preventDefault();
    // Aqui você pode adicionar lógica adicional conforme necessário
  };

  const renderizarComponenteSelecionado = () => {
    switch (componenteSelecionado) {
      case 'inserir':
        return <InserirNovoLocal />;
      case 'atualizar':
        return <AtualizarLocal />;
      case 'remover':
        return <RemoverLocal />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar className="bg-dark-green sticky-top">
        <Container>
          <Navbar.Brand className='text-light montserrat-bold' href="/home">Site de viagens</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin" className="link-with-icon text-light-green">
                <FaLock className="cadeado text-light-green" /> Admin
              </Nav.Link>
            </Nav>
            {/* <Navbar.Text>
              <Button variant="danger text-light" href='/'>Sair</Button>
            </Navbar.Text> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="conteudo-principal">
        {renderizarComponenteSelecionado()}

        <div className="buttons-container mt-3">
          <Button variant="dark" className="ms-2" onClick={() => handleSelecionarComponente('inserir')}>
            Inserir Novo Local
          </Button>

          <Button variant="dark" className="ms-2" onClick={handleAtualizar}>
            Atualizar Local Existente
          </Button>

          <Button variant="dark" className="ms-2" onClick={handleRemover}>
            Remover Local Existente
          </Button>
        </div>
      </div>

      <footer className="footer">{/* Conteúdo do footer */}</footer>
    </>
  );
};

export default TelaPrincipal;

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa'; // Importando o ícone de cadeado
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
          <Nav className="me-auto ">
            <Nav.Link href="/perfil" className="link-with-icon text-light-green">
                  Perfil
              </Nav.Link>
              <Nav.Link href="/admin" className="link-with-icon text-light-green">
                <FaLock className='cadeado text-light-green'/> Admin
              </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="conteudo-principal">
        {renderizarComponenteSelecionado()}

        <div className="buttons-container mt-3 botoesTelaPrincipal">
          {componenteSelecionado !== 'inserir' && (
            <Button variant="dark" className="ms-2" onClick={() => handleSelecionarComponente('inserir')}>
              Inserir Novo Local
            </Button>
          )}
          {componenteSelecionado !== 'atualizar' && (
            <Button variant="dark" className="ms-2" onClick={handleAtualizar}>
              Atualizar Local Existente
            </Button>
          )}
          {componenteSelecionado !== 'remover' && (
            <Button variant="dark" className="ms-2" onClick={handleRemover}>
              Remover Local Existente
            </Button>
          )}
        </div>
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

export default TelaPrincipal;

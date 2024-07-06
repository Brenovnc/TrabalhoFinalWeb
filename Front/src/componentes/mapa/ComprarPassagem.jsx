import React from 'react';
import Map from './Map.jsx';
import "../../styles/ComprarPassagem.css";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import imgText from '../../assets/mainPage.jpg';
import { FaLock } from 'react-icons/fa'; // Importando o ícone de cadeado

function ComprarPassagem() {

    return (
        <>
            <Navbar className="bg-dark-green sticky-top ">
                <Container>
                    <Navbar.Brand  className="text-light montserrat-bold" href="/home">Site de viagens</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto ">
                            <Nav.Link href="/admin" className="link-with-icon text-light-green">
                            <FaLock className='cadeado text-light-green'/> Admin
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button variant="danger text-light" href='/'>Sair</Button>
                            {/* <a href="/">Nome do usuário</a> */}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1 className='text-dark-green montserrat-bold pt-4 pb-2 ms-5'>Localidades disponiveis</h1>

            <Map apikey={"El7O8U0SD-D3gBWpF7O9aiaWQErLIqPljaEgGRXhuSE"} />

            <Container fluid className=" mt-3" >
                <Row className="h-50">
                    <Col md={6} className="d-flex flex-column justify-content-center bg-dark-green text-light p-5">
                    <h2 className='montserrat-bold pt-2 pd-2 ms-5'>Descubra o Mundo: Reserve sua Viagem Hoje!</h2>
                    <p className='montserrat text-start ms-5'>
                        Embarque em uma jornada de descobertas e experiências inesquecíveis! É hora de deixar o cotidiano para trás e explorar novos horizontes. Compre sua passagem agora e prepare-se para vivenciar momentos únicos em destinos deslumbrantes ao redor do mundo.
                        Seja para relaxar em praias paradisíacas, explorar cidades históricas repletas de cultura, ou se aventurar em paisagens naturais de tirar o fôlego, há um lugar esperando por você. Não deixe para depois o que pode se tornar uma das melhores experiências da sua vida.
                        Aproveite as tarifas especiais e as condições imperdíveis para garantir seu lugar nessa aventura. Faça as malas, escolha seu próximo destino e reserve sua passagem agora mesmo. O mundo está esperando por você!
                        Não perca tempo. Viaje, explore, viva!
                    </p>
                    </Col>
                    <Col md={6} className="d-flex align-items-center justify-content-center p-0">
                    <Image src={imgText} alt="Background" className="w-100" style={{ objectFit: 'cover', height: '70vh' }} />
                    </Col>
                </Row>
            </Container>

            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 mb-0 mt-2 border-top h-50 bg">
                <p class="col-md-3 mb-0 text-body-secondary">© 2024 Company, Inc</p>

                <ul class="nav col-md-5 justify-content-end me-5">
                    <li class="nav-item"><a href="https://github.com/pdrVenancio" class="nav-link px-2 text-body-secondary" target='_blank'>Pedro Venancio</a></li>
                    <li class="nav-item"><a href="https://github.com/Pedroca2005BR" class="nav-link px-2 text-body-secondary"  target='_blank'>Pedro de Paula</a></li>
                    <li class="nav-item"><a href="https://github.com/Brenovnc" class="nav-link px-2 text-body-secondary"  target='_blank'>Breno</a></li>
                    <li class="nav-item"><a href="https://github.com/RyanForward" class="nav-link px-2 text-body-secondary"  target='_blank'>Ryan</a></li>
                </ul>
            </footer>

        </>
    
    );
}

export default ComprarPassagem;

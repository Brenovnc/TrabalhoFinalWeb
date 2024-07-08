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
import FooterCustom from '../Layout/FooterCustom.jsx';
import NavCustom from '../Layout/NavCustom.jsx';

function ComprarPassagem() {

    return (
        <>
            <NavCustom />
            <h1 className='text-dark-green montserrat-bold pt-4 pb-2 ms-5'>Localidades disponiveis</h1>

            <Map apikey={"El7O8U0SD-D3gBWpF7O9aiaWQErLIqPljaEgGRXhuSE"} />

            <Container fluid className="" >
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

            <FooterCustom />

        </>
    
    );
}

export default ComprarPassagem;

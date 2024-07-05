import React from 'react'
import Map from './Map.jsx'
import "../../styles/ComprarPassagem.css"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function ComprarPassagem() {

    return (
        <>
            <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/home">Site de viagens</Navbar.Brand>
                <Nav.Link href="#home">Home</Nav.Link>
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
    
    )
}

export default ComprarPassagem
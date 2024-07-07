
import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Carrossel from './Carrossel';

function MapScreen() {
  const popover = (
    <Popover id="popover-basic" style={{ maxWidth: '600px' }}>
      <Popover.Header>Alemanha</Popover.Header>
      <Popover.Body>
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Carrossel />
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <p>Valor da passagem: R$ 100,00 </p>
        <Button variant="light">Comprar Passagem</Button><br/>
        <Button variant="light">Voltar</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="outline-light">Pin no mapa</Button>
      </OverlayTrigger>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="outline-light">Pin no mapa 2</Button>
      </OverlayTrigger>
    </>
  );
}

export default MapScreen;

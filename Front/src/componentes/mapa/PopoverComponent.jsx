import React from 'react';
import { Button, Popover } from 'react-bootstrap';
import Carrossel from './Carrossel'; // Importe o componente Carrossel aqui, se necessário

const PopoverComponent = ({ local, onClose }) => {
  return (
    <Popover id={`popover-${local.id}`} style={{ maxWidth: '300px' }}>
      <Popover.Header closeButton>
        <Popover.Title as="h3">{local.nome}</Popover.Title>
      </Popover.Header>
      <Popover.Body>
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          {/* Aqui pode adicionar o componente Carrossel ou outro conteúdo */}
          <Carrossel />
        </div>
        <p>{local.descricao}</p>
        <p>Valor da passagem: R$ {local.valorPassagem ? local.valorPassagem.toFixed(2) : 'Valor não disponível'}</p>
        <Button variant="light">Comprar Passagem</Button>
        <Button variant="light" onClick={onClose}>Fechar</Button>
      </Popover.Body>
    </Popover>
  );
};

export default PopoverComponent;

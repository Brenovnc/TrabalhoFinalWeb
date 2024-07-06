import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaPlane, FaSadTear } from 'react-icons/fa';
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className='principal'>
      <div className='tela-central'>
        <h1>Página não encontrada</h1>
        <p>Parece que você pegou uma viagem muito longa e te perdemos de vista</p>
        <div className="icon-container">
          <FaSadTear className="sad-icon" />
          <FaPlane className="plane-icon" />
        </div>
        <Button variant="dark" href='/'>Decolar de volta a página inicial</Button>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useState } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AtualizarLocal = () => {
  const [validated, setValidated] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      // Aqui você pode adicionar a lógica para atualizar o local selecionado
      if (!selectedLocal) {
        throw new Error('Selecione uma localidade existente.');
      }

      // Exibir toast de sucesso
      toast.success('Local atualizado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Limpar os campos do formulário após o envio bem-sucedido
      form.reset();
      setValidated(false); // Marca o formulário como não validado após limpar

    } catch (error) {
      // Exibir toast de erro com a mensagem de validação
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleLocalSelect = (local) => {
    setSelectedLocal(local);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
      <Form.Group controlId="localSelecionado" className="dropdownLocal">
        <Form.Label>Selecione uma localidade existente</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {selectedLocal ? selectedLocal : 'Escolha uma localidade'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onSelect={() => handleLocalSelect('Local 1')}>Local 1</Dropdown.Item>
            <Dropdown.Item onSelect={() => handleLocalSelect('Local 2')}>Local 2</Dropdown.Item>
            <Dropdown.Item onSelect={() => handleLocalSelect('Local 3')}>Local 3</Dropdown.Item>
            {/* Adicione mais itens conforme necessário */}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control.Feedback type="invalid">
          Selecione uma localidade existente.
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="success" type="submit" id="enviar">
          Enviar
        </Button>
      </div>
    </Form>
  );
};

export default AtualizarLocal;

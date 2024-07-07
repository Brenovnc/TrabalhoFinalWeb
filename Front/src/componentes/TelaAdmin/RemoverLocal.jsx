import React, { useEffect, useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RemoverLocal = () => {
  const [localidades, setLocalidades] = useState([]);
  const [selectedLocalidade, setSelectedLocalidade] = useState('');

  useEffect(() => {
    // Fetch existing localidades from the backend
    const fetchLocalidades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/localidades');
        setLocalidades(response.data);
      } catch (error) {
        console.error('Error fetching localidades:', error);
        toast.error('Erro ao buscar localidades. Por favor, tente novamente mais tarde.');
      }
    };

    fetchLocalidades();
  }, []);

  const handleRemove = async () => {
    if (!selectedLocalidade) {
      toast.error('Por favor, selecione uma localidade para remover.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/localidades/${selectedLocalidade}`);
      toast.success('Localidade removida com sucesso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Update the state to remove the deleted localidade
      setLocalidades(localidades.filter(local => local.id !== parseInt(selectedLocalidade, 10)));
      setSelectedLocalidade(''); // Reset the selected localidade
    } catch (error) {
      console.error('Error removing localidade:', error);
      toast.error('Erro ao remover localidade. Por favor, tente novamente mais tarde.');
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <Form>
      <Form.Group as={Col} controlId="LocalidadeSelect">
        <Form.Label>Selecione a Localidade</Form.Label>
        <Form.Control
          as="select"
          value={selectedLocalidade}
          onChange={(e) => setSelectedLocalidade(e.target.value)}
          required
        >
          <option value="">Selecione uma localidade...</option>
          {localidades.map(local => (
            <option key={local.id} value={local.id}>
              {local.nome}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="danger" onClick={handleRemove}>
          Remover Localidade
>>>>>>> dev
        </Button>
      </div>
    </Form>
  );
};

export default RemoverLocal;

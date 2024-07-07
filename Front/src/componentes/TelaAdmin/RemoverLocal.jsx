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
        </Button>
      </div>
    </Form>
  );
};

export default RemoverLocal;

import React, { useEffect, useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const RemoverLocal = () => {
  const [localidades, setLocalidades] = useState([]);
  const [selectedLocalidade, setSelectedLocalidade] = useState('');

  useEffect(() => {
    const fetchLocalidades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/localidades');
        setLocalidades(response.data);
      } catch (error) {
        console.error('Error fetching localidades:', error);
        toast.error('Erro ao buscar localidades. Por favor, tente novamente mais tarde.', TOAST_CONFIG);
      }
    };

    fetchLocalidades();
  }, []);

  const handleRemove = async () => {
    const token = sessionStorage.getItem('token');

    if (!selectedLocalidade) {
      toast.error('Por favor, selecione uma localidade para remover.', TOAST_CONFIG);
      return;
    }

    try {
      await toast.promise(
        axios.delete(`http://localhost:3000/api/localidades/${selectedLocalidade}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        {
          pending: 'Removendo localidade...',
          success: 'Localidade removida com sucesso!',
          error: {
            render({ data }) {
              const serverMessage = data?.response?.data?.message ?? data?.response?.data;
              return serverMessage || 'Erro ao remover localidade. Por favor, tente novamente mais tarde.';
            }
          }
        },
        TOAST_CONFIG
      );

      setLocalidades((prev) =>
        prev.filter((local) => local.id !== parseInt(selectedLocalidade, 10))
      );
      setSelectedLocalidade('');
    } catch (error) {
      console.error('Error removing localidade:', error);
    }
  };

  return (
    <>
      <ToastContainer {...TOAST_CONFIG} />
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
            {localidades.map((local) => (
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
    </>
  );
};

export default RemoverLocal;

import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const AtualizarLocal = () => {
  const [validated, setValidated] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState('');
  const [localidades, setLocalidades] = useState([]);
  const [formData, setFormData] = useState({
    NomeLocal: '',
    Latitude: '',
    Longitude: '',
    qtdPassagens: '',
    precoPassagem: ''
  });

  useEffect(() => {
    const fetchLocalidades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/localidades');
        setLocalidades(response.data);
      } catch (error) {
        console.error('Error fetching localidades:', error);
        alert('Erro ao buscar localidades. Por favor, tente novamente mais tarde.');
      }
    };

    fetchLocalidades();
  }, []);

  const schema = yup.object().shape({
    NomeLocal: yup.string().required('Insira um nome'),
    Latitude: yup.string().required('Insira a latitude'),
    Longitude: yup.string().required('Insira a longitude'),
    qtdPassagens: yup.string().required('Insira a quantidade de passagens'),
    precoPassagem: yup.string().required('Insira o preço da passagem'),
    localSelecionado: yup.string().required('Selecione uma localidade existente'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const token = sessionStorage.getItem('token');

    try {
      await schema.validate({
        NomeLocal: formData.NomeLocal,
        Latitude: formData.Latitude,
        Longitude: formData.Longitude,
        qtdPassagens: formData.qtdPassagens,
        precoPassagem: formData.precoPassagem,
        localSelecionado: selectedLocal,
      }, { abortEarly: false });

      const data = {
        id: selectedLocal,
        nome: formData.NomeLocal,
        latitude: formData.Latitude,
        longitude: formData.Longitude,
        passagens: formData.qtdPassagens,
        precoPassagem: formData.precoPassagem,
      };

      const response = await axios.put(`http://localhost:3000/api/localidades`, data, {
        headers: {
          Authorization: `Bearer ${token}` // Envia o token no cabeçalho da requisição
        }
      });

      if (response.status === 200) {
        alert('Local atualizado com sucesso!');

        setFormData({
          NomeLocal: '',
          Latitude: '',
          Longitude: '',
          qtdPassagens: '',
          precoPassagem: ''
        });
        setSelectedLocal('');
        setValidated(false);

        // Atualizar a lista de localidades
        const updatedLocalidades = localidades.map(local => {
          if (local.id === selectedLocal) {
            return { ...local, ...data };
          }
          return local;
        });
        setLocalidades(updatedLocalidades);
      } else {
        alert('Erro ao atualizar local. Por favor, tente novamente mais tarde.');
      }

    } catch (error) {
      if (error.inner) {
        error.inner.forEach(err => {
          alert(err.message);
        });
      } else {
        alert('Erro ao validar os dados. Por favor, tente novamente.');
      }
    }
  };

  const handleLocalSelect = (localId) => {
    const local = localidades.find(loc => loc.id === parseInt(localId, 10));
    if (local) {
      setSelectedLocal(local.id);
      setFormData({
        NomeLocal: local.nome,
        Latitude: local.latitude,
        Longitude: local.longitude,
        qtdPassagens: local.passagens,
        precoPassagem: local.precoPassagem,
      });
    } else {
      setSelectedLocal('');
      setFormData({
        NomeLocal: '',
        Latitude: '',
        Longitude: '',
        qtdPassagens: '',
        precoPassagem: ''
      });
      alert('Localidade não encontrada.');
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} controlId="localSelecionado" className="dropdownLocal">
        <Form.Label>Selecione uma localidade existente</Form.Label>
        <Form.Control
          as="select"
          value={selectedLocal}
          onChange={(e) => handleLocalSelect(e.target.value)}
          required
        >
          <option value="">Escolha uma localidade...</option>
          {localidades.map(local => (
            <option key={local.id} value={local.id}>
              {local.nome}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Selecione uma localidade existente.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} controlId="NomeLocal" className="mb-3">
        <Form.Label>Nome do Local</Form.Label>
        <Form.Control
          type="text"
          name="NomeLocal"
          value={formData.NomeLocal}
          onChange={(e) => setFormData({ ...formData, NomeLocal: e.target.value })}
          required
        />
        <Form.Control.Feedback type="invalid">
          Insira um nome para o local.
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} sm={6} controlId="Latitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="text"
            name="Latitude"
            value={formData.Latitude}
            onChange={(e) => setFormData({ ...formData, Latitude: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Insira a latitude.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={6} controlId="Longitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="text"
            name="Longitude"
            value={formData.Longitude}
            onChange={(e) => setFormData({ ...formData, Longitude: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Insira a longitude.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} sm={6} controlId="qtdPassagens">
          <Form.Label>Quantidade de Passagens</Form.Label>
          <Form.Control
            type="text"
            name="qtdPassagens"
            value={formData.qtdPassagens}
            onChange={(e) => setFormData({ ...formData, qtdPassagens: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Insira a quantidade de passagenskkkk.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={6} controlId="precoPassagem">
          <Form.Label>Preço da Passagem</Form.Label>
          <Form.Control
            type="text"
            name="precoPassagem"
            value={formData.precoPassagem}
            onChange={(e) => setFormData({ ...formData, precoPassagem: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Insira o preço da passagem.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="success" type="submit">
          Atualizar local
        </Button>
      </div>
    </Form>
  );
};

export default AtualizarLocal;

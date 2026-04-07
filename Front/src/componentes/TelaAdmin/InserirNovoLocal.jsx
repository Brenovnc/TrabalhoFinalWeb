import React, { useState } from 'react';
import * as yup from 'yup';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const MAX_DESCRIPTION_LENGTH = 300;

const schema = yup.object().shape({
  NomeLocal: yup.string().trim().required('Insira um nome'),
  Latitude: yup.string().trim().required('Insira a latitude'),
  Longitude: yup.string().trim().required('Insira a longitude'),
  qtdPassagens: yup.string().trim().required('Insira a quantidade de passagens'),
  precoPassagem: yup.string().trim().required('Insira o preço da passagem'),
  DescricaoLocal: yup
    .string()
    .trim()
    .max(MAX_DESCRIPTION_LENGTH, `Máximo de ${MAX_DESCRIPTION_LENGTH} caracteres`)
    .required('Insira uma descrição'),
});

const InserirNovoLocal = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    NomeLocal: '',
    Latitude: '',
    Longitude: '',
    qtdPassagens: '',
    precoPassagem: '',
    DescricaoLocal: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const token = sessionStorage.getItem('token');

    try {
      await schema.validate(formData, { abortEarly: false });

      const data = {
        nome: formData.NomeLocal,
        latitude: parseFloat(formData.Latitude),
        longitude: parseFloat(formData.Longitude),
        passagens: parseInt(formData.qtdPassagens, 10),
        precoPassagem: parseFloat(formData.precoPassagem),
        descricao: formData.DescricaoLocal?.trim() ?? '',
      };

      const response = await axios.post('http://localhost:3000/api/localidades', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success('Local inserido com sucesso!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setFormData({
          NomeLocal: '',
          Latitude: '',
          Longitude: '',
          qtdPassagens: '',
          precoPassagem: '',
          DescricaoLocal: ''
        });
        setValidated(false);
      } else {
        toast.error('Erro ao inserir local. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => {
          toast.error(err.message, {
            position: "top-right",
            autoClose: 3000,
          });
        });
        return;
      }

      toast.error(error.message || 'Erro ao enviar formulário. Por favor, tente novamente mais tarde.', {
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

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} controlId="NomeLocal">
        <Form.Label>Nome do Local</Form.Label>
        <Form.Control
          type="text"
          name="NomeLocal"
          value={formData.NomeLocal}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Insira um nome para o local.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} controlId="DescricaoLocal" className="mb-3">
        <Form.Label>Descrição do local</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={MAX_DESCRIPTION_LENGTH}
          name="DescricaoLocal"
          value={formData.DescricaoLocal}
          onChange={handleChange}
          required
        />
        <Form.Text muted>
          {formData.DescricaoLocal.length}/{MAX_DESCRIPTION_LENGTH} caracteres
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          Insira uma descrição para o local (máx {MAX_DESCRIPTION_LENGTH} caracteres).
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} sm={6} controlId="Latitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="text"
            name="Latitude"
            value={formData.Latitude}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Insira a quantidade de passagens.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={6} controlId="precoPassagem">
          <Form.Label>Preço da Passagem</Form.Label>
          <Form.Control
            type="text"
            name="precoPassagem"
            value={formData.precoPassagem}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Insira o preço da passagem.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="success" type="submit" id="enviar">
          Enviar
        </Button>
      </div>
    </Form>
  );
};

export default InserirNovoLocal;

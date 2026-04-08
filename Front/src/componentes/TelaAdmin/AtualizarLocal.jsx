import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const MAX_DESCRIPTION_LENGTH = 300;

const transformToNumber = (value, originalValue) => {
  if (originalValue === '' || originalValue == null) return undefined;
  const parsed = Number(originalValue);
  return Number.isNaN(parsed) ? originalValue : parsed;
};

const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const schema = yup.object().shape({
  NomeLocal: yup.string().trim().required('Insira um nome'),
  Latitude: yup
    .number()
    .transform(transformToNumber)
    .typeError('Latitude deve ser um número válido')
    .required('Insira a latitude')
    .min(-90, 'Latitude deve estar entre -90 e 90')
    .max(90, 'Latitude deve estar entre -90 e 90'),
  Longitude: yup
    .number()
    .transform(transformToNumber)
    .typeError('Longitude deve ser um número válido')
    .required('Insira a longitude')
    .min(-180, 'Longitude deve estar entre -180 e 180')
    .max(180, 'Longitude deve estar entre -180 e 180'),
  qtdPassagens: yup
    .number()
    .transform(transformToNumber)
    .typeError('Quantidade de passagens deve ser um número inteiro')
    .required('Insira a quantidade de passagens')
    .integer('Quantidade de passagens deve ser um número inteiro')
    .min(0, 'Quantidade de passagens não pode ser negativa'),
  precoPassagem: yup
    .number()
    .transform(transformToNumber)
    .typeError('Preço da passagem deve ser um número')
    .required('Insira o preço da passagem')
    .min(0, 'Preço da passagem não pode ser negativo'),
  DescricaoLocal: yup
    .string()
    .trim()
    .max(MAX_DESCRIPTION_LENGTH, `Máximo de ${MAX_DESCRIPTION_LENGTH} caracteres`)
    .required('Insira uma descrição'),
  localSelecionado: yup.string().required('Selecione uma localidade existente'),
});

const AtualizarLocal = () => {
  const [validated, setValidated] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState('');
  const [localidades, setLocalidades] = useState([]);
  const [formData, setFormData] = useState({
    NomeLocal: '',
    Latitude: '',
    Longitude: '',
    qtdPassagens: '',
    precoPassagem: '',
    DescricaoLocal: ''
  });

  const resetForm = () => {
    setFormData({
      NomeLocal: '',
      Latitude: '',
      Longitude: '',
      qtdPassagens: '',
      precoPassagem: '',
      DescricaoLocal: ''
    });
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
    const token = sessionStorage.getItem('token');

    try {
      await schema.validate(
        {
          NomeLocal: formData.NomeLocal,
          Latitude: formData.Latitude,
          Longitude: formData.Longitude,
          qtdPassagens: formData.qtdPassagens,
          precoPassagem: formData.precoPassagem,
          DescricaoLocal: formData.DescricaoLocal,
          localSelecionado: selectedLocal,
        },
        { abortEarly: false }
      );

      const parsedId = parseInt(selectedLocal, 10);
      const data = {
        id: parsedId,
        nome: formData.NomeLocal,
        latitude: parseFloat(formData.Latitude),
        longitude: parseFloat(formData.Longitude),
        passagens: parseInt(formData.qtdPassagens, 10),
        precoPassagem: parseFloat(formData.precoPassagem),
        descricao: formData.DescricaoLocal?.trim() ?? '',
      };

      const response = await toast.promise(
        axios.put('http://localhost:3000/api/localidades', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        {
          pending: 'Atualizando local...',
          success: 'Local atualizado com sucesso!',
          error: {
            render({ data }) {
              const serverMessage = data?.response?.data?.message ?? data?.response?.data;
              return serverMessage || 'Erro ao atualizar local. Por favor, tente novamente mais tarde.';
            }
          }
        },
        TOAST_CONFIG
      );

      if (response.status === 200) {
        resetForm();
        setSelectedLocal('');
        setValidated(false);
        setLocalidades((prev) =>
          prev.map((local) =>
            local.id === parsedId ? { ...local, ...data, descricao: data.descricao } : local
          )
        );
      }
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => {
          toast.error(err.message, TOAST_CONFIG);
        });
        return;
      }

      if (error.isAxiosError) {
        return;
      }

      toast.error(error.message || 'Erro ao atualizar local. Por favor, tente novamente mais tarde.', TOAST_CONFIG);
    }
  };

  const handleLocalSelect = (localId) => {
    if (!localId) {
      setSelectedLocal('');
      resetForm();
      return;
    }

    const parsedId = parseInt(localId, 10);
    const local = localidades.find((loc) => loc.id === parsedId);

    if (!local) {
      setSelectedLocal('');
      resetForm();
      toast.error('Localidade não encontrada.', TOAST_CONFIG);
      return;
    }

    setSelectedLocal(localId);
    setFormData({
      NomeLocal: local.nome ?? '',
      Latitude: String(local.latitude ?? ''),
      Longitude: String(local.longitude ?? ''),
      qtdPassagens: String(local.passagens ?? ''),
      precoPassagem: String(local.precoPassagem ?? ''),
      DescricaoLocal: local.descricao ?? ''
    });
  };

  return (
    <>
      <ToastContainer {...TOAST_CONFIG} />
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
            {localidades.map((local) => (
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

        <Form.Group as={Col} controlId="DescricaoLocal" className="mb-3">
          <Form.Label>Descrição do local</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            maxLength={MAX_DESCRIPTION_LENGTH}
            name="DescricaoLocal"
            value={formData.DescricaoLocal}
            onChange={(e) => setFormData({ ...formData, DescricaoLocal: e.target.value })}
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
              Insira a quantidade de passagens.
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
    </>
  );
};

export default AtualizarLocal;

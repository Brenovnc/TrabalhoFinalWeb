import React, { useState } from 'react';
import * as yup from 'yup';
import { Button, Form, Col, Row, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AtualizarLocal = () => {
  const [validated, setValidated] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState('');

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

    try {
      await schema.validate({
        NomeLocal: form.NomeLocal.value,
        Latitude: form.Latitude.value,
        Longitude: form.Longitude.value,
        qtdPassagens: form.qtdPassagens.value,
        precoPassagem: form.precoPassagem.value,
        localSelecionado: selectedLocal,
      }, { abortEarly: false });

      // Exibir toast de sucesso
      toast.success('Local inserido com sucesso!', {
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
    
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="localSelecionado">
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

      <Form.Group as={Col} controlId="NomeLocal">
        <Form.Label>Nome do Local</Form.Label>
        <Form.Control type="text" name="NomeLocal" required />
        <Form.Control.Feedback type="invalid">
          Insira um nome para o local.
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} sm={6} controlId="Latitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control type="text" name="Latitude" required />
          <Form.Control.Feedback type="invalid">
            Insira a latitude.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={6} controlId="Longitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control type="text" name="Longitude" required />
          <Form.Control.Feedback type="invalid">
            Insira a longitude.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} sm={6} controlId="qtdPassagens">
          <Form.Label>Quantidade de Passagens</Form.Label>
          <Form.Control type="text" name="qtdPassagens" required />
          <Form.Control.Feedback type="invalid">
            Insira a quantidade de passagens.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={6} controlId="precoPassagem">
          <Form.Label>Preço da Passagem</Form.Label>
          <Form.Control type="text" name="precoPassagem" required />
          <Form.Control.Feedback type="invalid">
            Insira o preço da passagem.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button variant="success" type="submit">
        Atualizar local
      </Button>
    </Form>
  );
};

export default AtualizarLocal;

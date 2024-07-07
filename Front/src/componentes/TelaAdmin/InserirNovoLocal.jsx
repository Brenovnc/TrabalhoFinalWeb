import React, { useState } from 'react';
import * as yup from 'yup';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const InserirNovoLocal = () => {
  const [validated, setValidated] = useState(false);

  const schema = yup.object().shape({
    NomeLocal: yup.string().required('Insira um nome'),
    Latitude: yup.string().required('Insira a latitude'),
    Longitude: yup.string().required('Insira a longitude'),
    qtdPassagens: yup.string().required('Insira a quantidade de passagens'),
    precoPassagem: yup.string().required('Insira o preço da passagem'),
    imagens: yup.mixed().required('Faça o upload de pelo menos uma imagem'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      // Validação do formulário usando o schema definido
      await schema.validate({
        NomeLocal: form.NomeLocal.value,
        Latitude: form.Latitude.value,
        Longitude: form.Longitude.value,
        qtdPassagens: form.qtdPassagens.value,
        precoPassagem: form.precoPassagem.value,
        imagens: form.imagens.files,
      }, { abortEarly: false });

      // Preparação dos dados para envio ao servidor
      const data = {
        nome: form.NomeLocal.value,
        latitude: form.Latitude.value,
        longitude: form.Longitude.value,
        passagens: form.qtdPassagens.value,
        precoPassagem: form.precoPassagem.value, // Converter para número
      };

      console.log(data);
      console.log("PrecoPassagem: ", precoPassagem.value)
      console.log("qtdPassagens: ", qtdPassagens.value)

      // Envio dos dados para o backend usando Axios
      const response = await axios.post('http://localhost:3000/api/localidades', data);
      
      if (response.status === 200) {
        // Exibição de mensagem de sucesso com Toastify
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
      } else {
        // Exibição de mensagem de erro caso ocorra algum problema
        toast.error('Erro ao inserir local. Por favor, tente novamente mais tarde.');
      }

    } catch (error) {
      // Exibir toast de erro com a mensagem de validação ou erro de rede
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

      <Form.Group as={Col} controlId="imagens">
        <Form.Label>Upload de Imagens</Form.Label>
        <Form.Control type="file" name="imagens" multiple accept="image/*" required />
        <Form.Control.Feedback type="invalid">
          Faça o upload de pelo menos uma imagem.
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

export default InserirNovoLocal;

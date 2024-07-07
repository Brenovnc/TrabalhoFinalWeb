// src/componentes/auth/LoginUser.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import { Button, Form, Container, Col, Image, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgLogin from '../../assets/teste.jpeg';
import "../../styles/personalizado.css";

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup.string().min(4, 'Senha com no mínimo 4 caracteres').required(),
}).required();

export default function LoginUser() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const submit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', data);
      sessionStorage.setItem('token', response.data); // Salva o token no sessionStorage
      setMsg('Usuário Autenticado');
      toast.success('Usuário Autenticado', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/home');
      }, 500); // Redireciona para /home após 2 segundos
    } catch (error) {
      setMsg(error.response.data);
      toast.error(error.response.data, {
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
    <>
      <ToastContainer />
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col md={8} className="d-none d-md-block p-0">
            <Image src={bgLogin} alt="Background" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            <div className="position-absolute top-0 start-0 p-5 pt-5 text-white text-left">
              <h1 className="display-3 montserrat-bold">Voe além dos seus sonhos</h1>
              <p className="lead">Descubra o mundo conosco!</p>
            </div>
          </Col>
          <Col md={4} className="d-flex align-items-center justify-content-center bg-green-500">
            <div>
              <h2 className='montserrat'>Entre e planeje sua viagem</h2>
              <Form onSubmit={handleSubmit(submit)} noValidate>
                <InputField id="email" type="text" label="Email" register={register('email')} error={errors.email} />
                <InputField id="password" type="password" label="Senha" register={register('password')} error={errors.password} />
                <Button variant="success" type="submit" className="w-100 mt-3">
                  Entrar
                </Button>
              </Form>
              <div className="realizar-cadastro mt-3">
                <p id='text-nPossuiConta'>Não possui conta?</p>
                <Link to="/Cadastro" id='text-cadastro' className='text-bark-brown'>Cadastro</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}


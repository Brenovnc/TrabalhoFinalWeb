import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import InputField from './InputField';
import bgLogin from '../../assets/teste.jpeg';
import "../../styles/personalizado.css";
import { Button, Form, Container, Col, Image, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup.string().min(4, 'Senha com no mínimo 4 caracteres').required(),
}).required();

export default function LoginUser() {
  const [msg, setMsg] = useState(' ');
  const [redirect, setRedirect] = useState(false); // Estado para controlar o redirecionamento

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const submit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', data);
      sessionStorage.setItem('token', response.data);
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

      // Adicionando um delay antes de redirecionar
      setTimeout(() => setRedirect(true), 2000);
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
  }

  if (redirect) {
    return <Navigate to='/home' />
  }

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
                <Link to="/cadastro" id='text-cadastro' className='text-bark-brown'>Cadastro</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}



// return (
//     <>  
//         <h2>Entre e planeje sua viagem</h2>
//         <form onSubmit={handleSubmit(submit)} noValidate>
            
//             {/* Cria diretamente um label, um input e uma mensagem de erro que recebe o erro emitido pelo yup*/}
//             <InputField id="email" type="text" label="Email" register={register('email')} error={errors.email}/>
//             {/* <InputField id="password" type="password" label="Senha" register={register('password')} error={errors.password}/> */}
//             <button>Entrar</button>

//         </form>
//         <p className="server-response">{msg}</p>
//         <div className="realizar-cadastro">
//             <p id='text-nPossuiConta'>Não possui conta?</p>
//             <Link to="/criar-user" id='text-cadastro'>Cadastro</Link>
//         </div>
//     </>
// )
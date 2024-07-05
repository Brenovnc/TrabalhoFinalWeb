import React, { useState } from 'react';
import '../../styles/CreateUser.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import InputField from './InputField';
import { Button, Form, Container, Col, Image, Row } from 'react-bootstrap';
import bgRegister from '../../assets/bg-register.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
  username: yup.string().required('Usuário obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup.string().min(2, 'Senha com no mínimo 2 caracteres').required(),
  passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
}).required();

export default function CreateUser() {
  const [msg, setMsg] = useState();
  const [redirect, setRedirect] = useState(false); // Estado para controlar o redirecionamento
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const submit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/cadastro', data);
      if (response.status === 201) {
        setMsg('Usuario criado com sucesso!');
        toast.success('Usuário criado com sucesso!', {
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
      }
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

  const handleBack = () => {
    navigate(-1);
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <>
      <ToastContainer />
      <div style={{ position: 'relative' }}>
        <Image src={bgRegister} alt="Background" className="w-100 h-100" style={{ objectFit: 'cover', position: 'absolute', zIndex: -1 }} />
        <Container className="vh-100 w-50 d-flex flex-column justify-content-center align-items-center bg-light" style={{ position: 'relative', zIndex: 1 }}>
          <Row>
            <h2 className='montserrat-bold text-dark-green m-5'>Crie uma nova conta</h2>
          </Row>
          <Form onSubmit={handleSubmit(submit)} noValidate>
            <Row>
              <InputField id="username" type="text" label="Usuário" register={register("username")} error={errors.username} />
            </Row>
            <Row>
              <InputField id="email" type="text" label="Email" register={register("email")} error={errors.email} />
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col}>
                <InputField className="w-40 mr-2 " id="password" type="password" label="Senha" register={register("password")} error={errors.password} />
              </Form.Group>
              <Form.Group as={Col}>
                <InputField className="w-40 ml-2" id="passwordConf" type="password" label="Confirmar Senha" register={register("passwordConf")} error={errors.passwordConf} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Button variant="success" type="submit" className="w-100">Criar Usuário</Button>
              </Form.Group>
              <Form.Group as={Col}>
                <Button variant="secondary" className="w-30" type="button" onClick={handleBack}>Voltar</Button>
              </Form.Group>
            </Row>
          </Form>
          {/* <p className='server-response'>{msg}</p> */}
        </Container>
      </div>
    </>
  )
}



// return (
//     <>
//         <h2>Crie uma nova conta</h2>
//         <form onSubmit={handleSubmit(submit)} noValidate>

//             <InputField id="username" type="text" label="Usuário"
//                         register={register("username")} error={errors.username}/>
            
//             <InputField id="email" type="text" label="Email"
//                         register={register("email")} error={errors.email}/>
            
//             <InputField id="password" type="password" label="Senha"
//                         register={register("password")} error={errors.password}/>
            
//             <InputField id="passwordConf" type="password" label="Confirmar Senha"
//                         register={register("passwordConf")} error={errors.passwordConf}/>
            
//             <div class='button-container'>
//                 <button type="submit">Criar Usuário</button>
//                 <button type="button" onClick={handleBack}>Voltar</button>
//             </div>
//         </form>
//         <p className='server-response'>{msg}</p>
//     </>
// )
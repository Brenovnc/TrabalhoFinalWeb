import React from 'react';
import bgLogin from '../../assets/teste.jpeg';
import "../../styles/personalizado.css";
import { Button, Form, Container, Col, Image, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
// import React from 'react';
// import '../../styles/CreateUser.css';
// import { useForm } from 'react-hook-form'; // npm i react-hook-form
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from 'axios';
// import { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';

// // npm i react-bootstrap bootstrap
// import Image from 'react-bootstrap/Image';
// import { OverlayTrigger, Tooltip, InputGroup, FormControl } from 'react-bootstrap';

// // Objeto para validação de campos com yup
// const schema = yup.object({
//     email: yup.string().email('Email inválido').required("Email obrigatório"),
//     password: yup.string().min(4, 'Senha com no mínimo 4 caracteres').required("Senha obrigatória"),
// }).required();

// export default function LoginUser() {
//     // Msg para armazenar resposta literal do servidor
//     const [msg, setMsg] = useState('');

//     // Estados para email e senha
//     const [email, setEmail] = useState('');
//     const [senha, setSenha] = useState('');

//     const handleEmailChange = (event) => {
//         setEmail(event.target.value);
//     };

//     const handleSenhaChange = (event) => {
//         setSenha(event.target.value);
//     };

//     const form = useForm({
//         resolver: yupResolver(schema)
//     });

//     const { register, handleSubmit, setValue, formState } = form;
//     const { errors } = formState;

//     const submit = async (data) => {
//         try {
//             const response = await axios.post('http://localhost:3000/auth/login', data);
//             sessionStorage.setItem('token', response.data);
//             setMsg('Usuário Autenticado');
//         } catch (error) {
//             setMsg(error.response.data);
//         }
//     };

//     // Redirecionamento após autenticação
//     if (msg.includes('Usuário Autenticado')) {
//         return <Navigate to='/Home' />;
//     }

//     return (
//         <>
//             <h2>Entre e planeje sua viagem</h2>
//             <form onSubmit={handleSubmit(submit)} noValidate>
//                 <InputGroup className="mb-3">
//                     <FormControl
//                         placeholder="Email"
//                         onChange={(e) => {
//                             handleEmailChange(e);
//                             setValue('email', e.target.value, { shouldValidate: true });
//                         }}
//                         value={email}
//                         isInvalid={!!errors.email}
//                         className="custom-input"
//                     />
//                     {email && errors.email && (
//                         <OverlayTrigger
//                             placement="bottom"
//                             overlay={<Tooltip id="email-tooltip">{errors.email.message}</Tooltip>}
//                         >
//                             <div className="d-inline-block">
//                                 <Image
//                                     src="../../src/assets/americas.svg"
//                                     roundedCircle
//                                     style={{ width: '20px', height: '20px', marginRight: '5px' }}
//                                 />
//                             </div>
//                         </OverlayTrigger>
//                     )}
//                 </InputGroup>

//                 <InputGroup className="mb-3">
//                     <FormControl
//                         placeholder="Senha"
//                         type="password"
//                         onChange={(e) => {
//                             handleSenhaChange(e);
//                             setValue('password', e.target.value, { shouldValidate: true });
//                         }}
//                         value={senha}
//                         isInvalid={!!errors.password}
//                         className="custom-input"
//                     />
//                     {senha && errors.password && (
//                         <OverlayTrigger
//                             placement="bottom"
//                             overlay={<Tooltip id="password-tooltip">{errors.password.message}</Tooltip>}
//                         >
//                             <div className="d-inline-block">
//                                 <Image
//                                     src="../../src/assets/americas.svg"
//                                     roundedCircle
//                                     style={{ width: '20px', height: '20px', marginRight: '5px' }}
//                                 />
//                             </div>
//                         </OverlayTrigger>
//                     )}
//                 </InputGroup>

//                 <button>Entrar</button>
//             </form>
//             <p className="server-response">{msg}</p>
//             <div className="realizar-cadastro">
//                 <p id='text-nPossuiConta'>Não possui conta?</p>
//                 <Link to="/criar-user" id='text-cadastro'>Cadastro</Link>
//             </div>
//         </>
//     );
// }

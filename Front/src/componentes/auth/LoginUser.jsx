import React from 'react'
import '../../styles/CreateUser.css';
import {set, useForm} from 'react-hook-form'; //npm i react-hook-form
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import InputField from './InputField';

//Objeto para validação de campos com yup
const schema = yup.object({
    email: yup.string().email('Email inválido').required("Email obrigatório"),
    password: yup.string().min(4,'Senha com no mínimo 4 caracteres').required(),
}).required();


export default function LoginUser(){

    //Msg para armazenar resposta literal do servidor
    const [msg, setMsg] = useState(' ');

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data);
            sessionStorage.setItem('token', response.data);
            setMsg('Usuário Autenticado');
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    // Aqui, após o usuário estar logado ele vai ser redirecionado para a Home
    if(msg.includes('Usuário Autenticado')){
        return <Navigate to='/Home' />
    }

    return (
        <>  
            <div class="login">
                <h2>Entre e planeje sua viagem</h2>
                <form onSubmit={handleSubmit(submit)} noValidate>
                    
                    {/* Cria diretamente um label, um input e uma mensagem de erro que recebe o erro emitido pelo yup*/}
                    <InputField id="email" type="text" label="Email" register={register('email')} error={errors.email}/>
                    <InputField id="password" type="password" label="Senha" register={register('password')} error={errors.password}/>
                    <button>Entrar</button>

                </form>
                <p className="server-response">{msg}</p>
                <div className="realizar-cadastro">
                    <p id='text-nPossuiConta'>Não possui conta?</p>
                    <Link to="/criar-user" id='text-cadastro'>Cadastro</Link>
                </div>
            </div>
        </>
    )

}
import React, { useState } from 'react';
import '../../styles/CreateUser.css';
import { useForm } from 'react-hook-form'; // npm i react-hook-form
import { yupResolver } from "@hookform/resolvers/yup"; // npm i @hookform/resolvers
import * as yup from "yup"; // npm i yup
import axios from 'axios'; // npm i axios
import { useNavigate, Navigate } from 'react-router-dom'; // Import useNavigate
import InputField from './InputField';

const schema = yup.object({
    username: yup.string().required('Usuário obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(2, 'Senha com no mínimo 2 caracteres').required(),
    passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
}).required();

export default function CreateUser() {

    const [msg, setMsg] = useState();
    const navigate = useNavigate(); // Use useNavigate

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const { errors } = formState;

    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/create', data);
            if (response.status === 200)
                setMsg('OK');
        } catch (error) {
            setMsg(error.response.data);
        }
    }

    const handleBack = () => {
        navigate(-1); // Funcão para voltar uma página
    }

    if (msg === 'OK')
        return <Navigate to='/' />

    return (
        <>
            <div class="login">
                <h2>Crie uma nova conta</h2>
                <form onSubmit={handleSubmit(submit)} noValidate>

                    <InputField id="username" type="text" label="Usuário"
                                register={register("username")} error={errors.username}/>
                    
                    <InputField id="email" type="text" label="Email"
                                register={register("email")} error={errors.email}/>
                    
                    <InputField id="password" type="password" label="Senha"
                                register={register("password")} error={errors.password}/>
                    
                    <InputField id="passwordConf" type="password" label="Confirmar Senha"
                                register={register("passwordConf")} error={errors.passwordConf}/>
                    
                    <div class='button-container'>
                        <button type="submit">Criar Usuário</button>
                        <button type="button" onClick={handleBack}>Voltar</button>
                    </div>
                </form>
                <p className='server-response'>{msg}</p>
            </div>
        </>
    )
}
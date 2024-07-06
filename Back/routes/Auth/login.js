const express = require('express');
const loginRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const bdPath = path.join(__dirname,'..', '..', 'db','banco-dados-usuario.json');
const usuariosCadastrados = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

loginRouter.post('/', async (req,res) => {

    const {email, password} = req.body; 
    for (let user of usuariosCadastrados){
        if(user.email === email){
            const passwordValidado = await bcrypt.compare(password, user.password);
            if(passwordValidado===true){
                console.log(process.env.TOKEN)
                const tokenAcesso = jwt.sign(user, 'teste', { expiresIn: '1h' });
                return res.status(200).json(`Token: ${tokenAcesso}`);
            }
            else
                return res.status(422).send(`Usuario ou senhas incorretas.`);
        }   
    }
    return res.status(409).send(`Usuario com email ${email} não existe!`);

});

module.exports = {loginRouter}
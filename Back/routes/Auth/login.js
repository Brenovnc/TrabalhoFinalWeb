const express = require('express');
const loginRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const readJsonFile = (filePath) => {
  const raw = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return JSON.parse(raw.replace(/^\uFEFF/, ''));
};

const bdPath = path.join(__dirname,'..', '..', 'db','banco-dados-usuario.json');
const usuariosCadastrados = readJsonFile(bdPath);

loginRouter.post('/', async (req,res) => {

    const {email, password} = req.body; 
    for (let user of usuariosCadastrados){
        if(user.email === email){
            const passwordValidado = await bcrypt.compare(password, user.password);
            if(passwordValidado===true){
                const tokenAcesso = jwt.sign(user, 'dslbakdjbasldblshdbashdbashdjlsabdhjdblasdbjdbsflhbhwlebrewhjjkfkajdç', { expiresIn: '1h' });
                return res.status(200).json(tokenAcesso);
            }
            else
                return res.status(422).send(`Usuario ou senhas incorretas.`);
        }   
    }
    return res.status(409).send(`Usuario com email ${email} não existe!`);

});

module.exports = {loginRouter}

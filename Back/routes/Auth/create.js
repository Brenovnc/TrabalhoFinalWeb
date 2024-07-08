const { Router } = require("express");
const fs = require('fs');
const path = require('path');
const User = require("../../models/User");
const bcrypt = require('bcrypt');

const bdPath = path.join(__dirname,'..','..', 'db','banco-dados-usuario.json');
const usuariosCadastrados = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

const createRouter = Router()

createRouter.post(
  '/',
  async (req, res) => {
    const {username, email, password} = req.body; 
    let userIds = [];
    for (let users of usuariosCadastrados){
      if(users.email === email){
          return res.status(409).send(`Usuario com email ${email} já existe.`);
      }
      userIds.push(users.id);
    }

    let id;
    if(usuariosCadastrados.length > 0){
      id = Math.max(...userIds) + 1;
    }else{
      id = 0;
    }

    const role = usuariosCadastrados.length > 0 ? 'user' : 'admin'; 
    
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password,salt);
    const tickets = [];

    const user = new User(id, username, role, email, passwordCrypt, tickets);

    usuariosCadastrados.push(user);
    fs.writeFileSync(bdPath,JSON.stringify(usuariosCadastrados,null,2));
    res.status(201).send(`Usuario criado com sucesso!`);
  }

)
module.exports = { createRouter }
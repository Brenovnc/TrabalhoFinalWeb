//importar libs externas
const express = require('express'); //npm i express

//O router permite separar nosso servidor em rotas
const localidadeRouter = express.Router();    

//libs para banco de dados
const fs = require('fs');
const path = require('path');

// //Validação do token
// const jwt = require('jsonwebtoken');

//Conexao com banco de dados
const bdPath = path.join(__dirname,'..','db','localidades.json');
const localidades = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

localidadeRouter.post('/', (req, res) => {

    const {nome, latitude, longitude, passagens} = req.body

    const id = localidades[localidades.length-1].id + 1

    const imgs = []

    const novoLocal = {
        id,
        nome,
        latitude,
        longitude,
        passagens,
        imgs
    }

    localidades.push(novoLocal)

    fs.writeFileSync(bdPath, JSON.stringify(localidades, null ,2))

    res.status(200).send("OK")

})

localidadeRouter.put('/', (req, res) => {

    const {id, nome, latitude, longitude, passagens, imgs} = req.body

    const novoLocal = {
        id,
        nome,
        latitude,
        longitude,
        passagens,
        imgs
    }


    const acharIndex = (p) => {
        return p.id === Number(id)
    }

    const index = localidades.findIndex(acharIndex);

    localidades.splice(index,1,novoLocal);

    fs.writeFileSync(bdPath, JSON.stringify(localidades,null,2));

    res.status(200).send('Localidade Atualizada!');

})

localidadeRouter.delete('/:id', (req, res) => {

    const {id} = req.params

    const index = localidades.findIndex(acharIndex);

    localidades.splice(index,1);

    fs.writeFileSync(bdPath, JSON.stringify(localidades,null,2));

    res.status(200).send('Localidade Removida!');
});






// function autenticarToken(req,res,next){
//     const authH = req.headers['authorization'];
//     const token = authH && authH.split(' ')[1];
//     if(token === null) return res.status(401).send('Token não encontrado');
    
//     //verificando o token
//     try {
//         const user = jwt.verify(token, process.env.TOKEN);
//         req.user = user;
//         next(); //Se token é válido, avança chamando next()
//     } catch (error) {
//         res.status(403).send('Token inválido');
//     }
   
// }

module.exports =  { localidadeRouter }
//importar libs externas
const express = require('express'); //npm i express

//O router permite separar nosso servidor em rotas
const localidadeRouter = express.Router();    

//libs para banco de dados
const fs = require('fs');
const path = require('path');

// importa a funcao isAdmin para bloquear algumas rotas ao cliente comum
const { isAdmin } = require('./../middlewares/isAdmin');


//Conexao com banco de dados
const bdPath = path.join(__dirname,'..','db','localidades.json');
const localidades = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

// a rota get retorna todas as localidades com passagens disponiveis
localidadeRouter.get('/', (req, res) => {

    const locais = []

    for(let local of localidades){
        if (local.passagens != 0){
            locais.push(local)
        }
    }

    res.status(200).send(locais)
})

// a rota post adiciona uma nova localidade
localidadeRouter.post('/', (req, res) => {

    const {nome, latitude, longitude, preco, passagens} = req.body
    console.log("oi",nome, latitude)

    const id = localidades[localidades.length-1].id + 1

    const imgs = []

    const novoLocal = {
        id,
        nome,
        latitude,
        longitude,
        preco,
        passagens,
        imgs
    }

    localidades.push(novoLocal)

    fs.writeFileSync(bdPath, JSON.stringify(localidades, null ,2))

    res.status(200).send(novoLocal)

})

// a rota put atualiza alguma localidade
localidadeRouter.put('/', isAdmin, (req, res) => {

    const {id, nome, latitude, longitude, preco, passagens, imgs} = req.body

    const novoLocal = {
        id,
        nome,
        latitude,
        longitude,
        preco,
        passagens,
        imgs
    }


    const acharIndex = (p) => {
        return p.id === Number(id)
    }

    const index = localidades.findIndex(acharIndex);

    localidades.splice(index,1,novoLocal);

    fs.writeFileSync(bdPath, JSON.stringify(localidades,null,2));

    res.status(200).send(novoLocal);

})

// a rota delete apaga uma localidade ao se passar um id
localidadeRouter.delete('/:id', isAdmin, (req, res) => {

    const {id} = req.params
    console.log(id)

    const acharIndex = (p) => {
        return p.id === Number(id)
    }

    const index = localidades.findIndex(acharIndex);

    localidades.splice(index,1);

    fs.writeFileSync(bdPath, JSON.stringify(localidades,null,2));

    res.status(204).send('Localidade Removida!');
});







module.exports =  { localidadeRouter }
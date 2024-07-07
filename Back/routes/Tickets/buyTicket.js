const express = require('express');
const { isUser } = require('../../middlewares/isUser');
const fs = require('fs');
const path = require('path');

const bdTickets = path.join(__dirname,'..','..', 'db','banco-dados-tickets.json');
const ticketsCadastrados = JSON.parse(fs.readFileSync(bdTickets, {encoding: 'utf-8'}));

const bdUsers = path.join(__dirname,'..', '..', 'db','banco-dados-usuario.json');
const usuariosCadastrados = JSON.parse(fs.readFileSync(bdUsers, {encoding: 'utf-8'}));

const Ticket = require('../../models/Ticket');

const ticketRouter = express.Router();

//rota que cria uma compra de passagem
ticketRouter.post('/', isUser, (req, res) => {
  const {location, price, travelDate} = req.body
  const user = req.user
  const date = new Date();

  const ids = [];

  for(let ticket of ticketsCadastrados){
    if(ticket.userId == user.id){
      if(ticket.travelDate == travelDate && ticket.valid && ticket.location == location){
        throw new Error('Você possui outra viagem para este lugar, nesta mesma data!')
      }
    }
    ids.push(ticket.id);
  }

  let id;
  if(ids.length > 0){
    id = Math.max(...ids) + 1;
  }else{
    id = 0;
  }

  const newTicket = new Ticket(
    id,
    location,
    price,
    user.id,
    travelDate,
    date,
    true,
  )

  ticketsCadastrados.push(newTicket);
  for (passageiro of usuariosCadastrados){
    if(Number(passageiro.id) == user.id){
      passageiro.tickets.push(newTicket.id);
    }
  }
  fs.writeFileSync(bdUsers, JSON.stringify(usuariosCadastrados, null, 2))
  fs.writeFileSync(bdTickets, JSON.stringify(ticketsCadastrados, null, 2))
  return res.status(201).json(`Passagem cadastrada com sucesso!`);
});

//rota que trás uma passagem específica do user autenticado
ticketRouter.get('/:id', isUser, (req, res) => {
  const ticketId = req.params.id;
  const { id } = req.user

  const tickets = [];
  for(let ticket of ticketsCadastrados){
    if(ticket.userId == id){
      if(ticket.id == ticketId){
        tickets.push(ticket);
      }
    }
  }

  return res.status(200).json(tickets);
});

//rota que trás todas as passagens do user autenticado
ticketRouter.get('/', isUser, (req, res) => {
  const { id } = req.user

  const tickets = [];
  for(let ticket of ticketsCadastrados){
    if(ticket.userId == id){
      tickets.push(ticket);
    }
  }

  return res.status(200).json(tickets);
});

//rota que deleta uma passagem
ticketRouter.delete('/:id', isUser, (req, res) => {
  
  const {id} = req.params

  const acharIndex = (p) => {
      return p.id === Number(id)
  }

  const index = ticketsCadastrados.findIndex(acharIndex);

  const [ticketRemovido] = ticketsCadastrados.splice(index, 1);
  
  for (const passageiro of usuariosCadastrados) {
    if (passageiro.id === ticketRemovido.userId) {
      const ticketIndex = passageiro.tickets.indexOf(Number(id));
      if (ticketIndex !== -1) {
        passageiro.tickets.splice(ticketIndex, 1);
      }
      break;
    }
  }
  
  fs.writeFileSync(bdTickets, JSON.stringify(ticketsCadastrados, null, 2));
  fs.writeFileSync(bdUsers, JSON.stringify(usuariosCadastrados, null, 2));

  res.status(204).send('Passagem cancelada!');
})



module.exports = {ticketRouter}
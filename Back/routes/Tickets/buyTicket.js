const express = require('express');
const { isUser } = require('../../middlewares/isUser');
const fs = require('fs');
const path = require('path');

const bdTickets = path.join(__dirname,'..','..', 'db','banco-dados-tickets.json');

const ticketsCadastrados = JSON.parse(fs.readFileSync(bdTickets, {encoding: 'utf-8'}));

const Ticket = require('../../models/Ticket');

const ticketRouter = express.Router();

ticketRouter.post('/', isUser, (req, res) => {
  const {location, price, user, travelDate} = req.body
  const date = new Date();

  const ids = [];

  for(let ticket of ticketsCadastrados){
    if(ticket.user == user){
      if(ticket.travelDate == travelDate && ticket.valid){
        throw new Error('Você possui outra viagem para esta mesma data!')
      }
      if(ticket.location == location && ticket.valid){
        throw new Error('Você já possui uma viagem para este local');
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
    user,
    travelDate,
    date,
    true,
  )

  ticketsCadastrados.push(newTicket);
  fs.writeFileSync(bdTickets, JSON.stringify(ticketsCadastrados, null, 2))
  res.status(201).send(`Passagem cadastrada com sucesso!`);
})

module.exports = {ticketRouter}
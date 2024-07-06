const { Router } = require('express');
const { createRouter } = require('./Auth/create');
const { loginRouter } = require('./Auth/login');
const { ticketRouter } = require('./Tickets/buyTicket');
const { localidadeRouter } = require('./localidades');

const mainRouter = Router();

// rota padrão
mainRouter.get('/', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'OK',
    date: new Date(),
    service: 'Sistema de passagens'
  };
  res.status(200).send(data);
});

mainRouter.use('/cadastro', createRouter);
mainRouter.use('/login', loginRouter);
mainRouter.use('/passagens', ticketRouter);
mainRouter.use('/localidades', localidadeRouter);

module.exports = { mainRouter };

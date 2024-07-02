const { Router } = require('express');
const { createRouter } = require('./Auth/create');
const { loginRouter } = require('./Auth/login');

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

module.exports = { mainRouter };

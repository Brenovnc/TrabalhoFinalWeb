const { verifyToken } = require("./verify");

function isAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

  if (!token) {
      return res.status(403).json({ message: 'É necessário um token' });
  }

  const decoded = verifyToken(token);
  if (decoded && decoded.role === 'admin') {
      next();
  } else {
      return res.status(403).json({ message: 'Acesso negado!' });
  }
}

module.exports = { isAdmin }
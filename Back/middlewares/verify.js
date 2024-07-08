const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(token) {

  try {
      const decoded = jwt.verify(token, 'dslbakdjbasldblshdbashdbashdjlsabdhjdblasdbjdbsflhbhwlebrewhjjkfkajdç');
      return decoded;
  } catch (error) {
      console.error('Invalid token:', error);
      return null;
  }
}

module.exports = { verifyToken }
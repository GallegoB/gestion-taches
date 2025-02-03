// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).send('Token manquant');
  }
  jwt.verify(token, 'votre-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).send('Token invalide');
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
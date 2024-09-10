const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'secret_jwt_key';

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  console.log("Token: ", token);
  

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired.' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token is invalid.' });
      }
      return res.status(401).json({ message: 'Token verification failed.' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken
};

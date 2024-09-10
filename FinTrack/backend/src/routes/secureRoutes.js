// src/routes/secureRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/secure-route', authMiddleware.verifyToken, (req, res) => {
  // Access granted if token is valid
  res.status(200).json({ message: 'Access granted to secure route.', user: req.user });
});

module.exports = router;

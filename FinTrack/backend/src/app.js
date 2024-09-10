// src/app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const promoCodeRoutes = require('./routes/promoCodeRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json()); // Parse JSON bodies
app.use('/api', userRoutes);
app.use('/api2', transactionRoutes);
app.use('/api3', promoCodeRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

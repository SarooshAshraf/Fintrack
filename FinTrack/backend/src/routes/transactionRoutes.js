const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/transactions/:userId', transactionController.getTransactionsByUserId);
router.post('/transactions', transactionController.createTransaction);
router.put('/transactions/:transactionId', transactionController.updateTransaction);
router.delete('/transactions/:transactionId', transactionController.deleteTransaction);

module.exports = router;

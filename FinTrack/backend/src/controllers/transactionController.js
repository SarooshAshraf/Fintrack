const db = require('../config/dbConfig');

// Get transactions by userId
const getTransactionsByUserId = (req, res) => {
  const { userId } = req.params;
console.log('====================================');
console.log(userId);
console.log('====================================');
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  const query = 'SELECT * FROM transactions WHERE userId = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching transactions:', err);
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this user.' });
    }

    res.status(200).json(results);
  });
};

// Add a new transaction
const createTransaction = (req, res) => {
  const { userId, date, amount, merchant, category, incomeAmount, transactionTimestamp } = req.body;

  if (!userId || !date || !amount || !merchant || !category || !transactionTimestamp) {
    return res.status(400).json({ message: 'All fields are required except incomeAmount.' });
  }

  const query = 'INSERT INTO transactions (userId, date, amount, merchant, category, incomeAmount, transactionTimestamp) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [userId, date, amount, merchant, category, incomeAmount, transactionTimestamp], (err, results) => {
    if (err) {
      console.error('Error creating transaction:', err);
      return res.status(500).send(err);
    }

    res.status(201).json({ transactionId: results.insertId, message: 'Transaction created successfully.' });
  });
};

// Update a transaction
const updateTransaction = (req, res) => {
  const { transactionId } = req.params;
  const { date, amount, merchant, category, incomeAmount, transactionTimestamp } = req.body;

  if (!transactionId) {
    return res.status(400).json({ message: 'Transaction ID is required.' });
  }

  const query = 'UPDATE transactions SET date = ?, amount = ?, merchant = ?, category = ?, incomeAmount = ?, transactionTimestamp = ? WHERE transactionId = ?';

  db.query(query, [date, amount, merchant, category, incomeAmount, transactionTimestamp, transactionId], (err, results) => {
    if (err) {
      console.error('Error updating transaction:', err);
      return res.status(500).send(err);
    }

    res.status(200).json({ message: 'Transaction updated successfully.' });
  });
};

// Delete a transaction
const deleteTransaction = (req, res) => {
  const { transactionId } = req.params;

  if (!transactionId) {
    return res.status(400).json({ message: 'Transaction ID is required.' });
  }

  const query = 'DELETE FROM transactions WHERE transactionId = ?';

  db.query(query, [transactionId], (err, results) => {
    if (err) {
      console.error('Error deleting transaction:', err);
      return res.status(500).send(err);
    }

    res.status(200).json({ message: 'Transaction deleted successfully.' });
  });
};

module.exports = {
  getTransactionsByUserId,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

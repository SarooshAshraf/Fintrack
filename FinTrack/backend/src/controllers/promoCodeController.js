const db = require('../config/dbConfig');

// Get all promo codes
const getAllPromoCodes = (req, res) => {
  const query = 'SELECT * FROM PromoCodes';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching promo codes:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// Create a new promo code
const createPromoCode = (req, res) => {
  const { promoCode, store, latitude, longitude, discount, expiryDate, category } = req.body;

  if (!promoCode || !store || !latitude || !longitude || !discount || !expiryDate || !category) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = 'INSERT INTO PromoCodes (promoCode, store, latitude, longitude, discount, expiryDate, category) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [promoCode, store, latitude, longitude, discount, expiryDate, category], (err, results) => {
    if (err) {
      console.error('Error creating promo code:', err);
      return res.status(500).send(err);
    } else {
      res.status(201).json({ id: results.insertId, promoCode, store, latitude, longitude, discount, expiryDate, category, message: 'Promo code created successfully.' });
    }
  });
};

// Update an existing promo code
const updatePromoCode = (req, res) => {
  const { id } = req.params;
  const { promoCode, store, latitude, longitude, discount, expiryDate, category } = req.body;

  if (!id) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  if (!promoCode || !store || !latitude || !longitude || !discount || !expiryDate || !category) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = 'UPDATE PromoCodes SET promoCode = ?, store = ?, latitude = ?, longitude = ?, discount = ?, expiryDate = ?, category = ?, updatedAt = NOW() WHERE promoCodeId = ?';

  db.query(query, [promoCode, store, latitude, longitude, discount, expiryDate, category, id], (err, results) => {
    if (err) {
      console.error('Error updating promo code:', err);
      res.status(500).json({ message: 'Internal server error.' });
    } else {
      res.status(200).json({ message: 'Promo code updated successfully.' });
    }
  });
};

// Delete a promo code
const deletePromoCode = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  const query = 'DELETE FROM PromoCodes WHERE promoCodeId = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting promo code:', err);
      res.status(500).json({ message: 'Internal server error.' });
    } else {
      res.status(200).json({ message: 'Promo code deleted successfully.' });
    }
  });
};

module.exports = {
  getAllPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
};

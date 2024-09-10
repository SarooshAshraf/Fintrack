// src/controllers/userController.js
const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'secret_jwt_key';

const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};


const nodemailer = require('nodemailer');


const createUser = (req, res) => {
  const { firstName, lastName, email, passwordHash } = req.body;
  const saltRounds = 10;
  console.log('====================================');
  console.log(saltRounds);
  console.log('====================================');

  if (!firstName || !lastName || !email || !passwordHash) {
    return res.status(400).json({ message: 'First name, last name, email, and password are required fields.' });
  }

  // Generate a random 4-digit verification code
  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
  console.log('====================================');
  console.log(verificationCode);
  console.log('====================================');
  // Hash the password before storing it
  bcrypt.hash(passwordHash, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send(err);
    }

    const query = 'INSERT INTO users (firstName, lastName, email, passwordHash, verificationCode, isVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, false, NOW(), NOW())';
    console.log('====================================');
    console.log('sd');
    console.log('====================================');
    db.query(query, [firstName, lastName, email, hash, verificationCode], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send(err);
      } else {
        console.log('User created successfully:', { id: results.insertId, firstName, lastName, email });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: true,
          port: 465,
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });


        const mailOptions = {
          from: process.env.EMAIL_USER, // The sender email address
          to: email,
          subject: 'Your Verification Code',
          text: `Your verification code is ${verificationCode}.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending verification email:', error);
            return res.status(500).send(error);
          }
          res.status(201).json({ id: results.insertId, firstName, lastName, email, message: 'Verification code sent to your email.' });
        });
      }
    });
  });
};




const loginUser = (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required fields.' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = results[0];

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    // Compare hashed password
    bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).send(err);
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      
      const token = jwt.sign({ userId: user.userId, email: user.email, username:user.firstName +" "+ user.lastName }, jwtSecret, { expiresIn: '24h' });
  
      res.status(200).json({ token, userId: user.userId });
    });
  });
};


const updateUser = (req, res) => {
  const { id } = req.params; 
  const { firstName, lastName, email, password } = req.body;

  if (!id) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  // Input validation
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'First name, last name, and email are required fields.' });
  }

  const updateUserQuery = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, updatedAt = NOW() WHERE userId = ?';
  const updatePasswordQuery = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, passwordHash = ?, updatedAt = NOW() WHERE userId = ?';

  const updateUser = (query, params) => {
    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Internal server error.' });
      } else {
        console.log('User updated successfully:', { id, firstName, lastName, email });
        res.status(200).json({ message: 'User updated successfully.' });
      }
    });
  };

  if (password) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send(err);
      }

      updateUser(updatePasswordQuery, [firstName, lastName, email, hash, id]);
    });
  } else {
    updateUser(updateUserQuery, [firstName, lastName, email, id]);
  }
};

const logoutUser = (req, res) => {
  console.log('====================================');
  console.log("LogOut");
  console.log('====================================');
  res.status(200).json({ message: 'Logged out successfully.' });
};

const verifyUser = (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email and verification code are required.' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND verificationCode = ?';

  db.query(query, [email, code], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid verification code.' });
    }

    const updateQuery = 'UPDATE users SET isVerified = true, verificationCode = NULL WHERE email = ?';

    db.query(updateQuery, [email], (err) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).send(err);
      }
      res.status(200).json({ message: 'Email verified successfully.' });
    });
  });
};



module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  logoutUser,
  verifyUser,
};

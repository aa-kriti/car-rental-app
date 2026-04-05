const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../config/db');

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get all users
router.get('/', (req, res) => {
  const query = 'SELECT id, name, email, phone, created_at FROM users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Validate inputs
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, phone], (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already registered' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: results.insertId, message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration error: ' + error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    if (!isValidEmail(email)) {
      return res.status(401).json({ message: 'Invalid email format' });
    }
    
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Compare passwords
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, message: 'Login successful' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Login error: ' + error.message });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT id, name, email, phone, created_at FROM users WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// ✅ Suspend / Unsuspend user — paste this inside users.js
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['active', 'suspended'].includes(status))
    return res.status(400).json({ message: 'Invalid status' });
  try {
    await pool.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, status, created_at FROM users WHERE id = ?', [id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user status' });
  }
});

module.exports = router; // ← already exists

module.exports = router;

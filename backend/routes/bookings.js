const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create booking
router.post('/', (req, res) => {
  const { user_id, car_id, start_date, end_date, total_price, status } = req.body;
  const query = 'INSERT INTO bookings (user_id, car_id, start_date, end_date, total_price, status) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [user_id, car_id, start_date, end_date, total_price, status || 'pending'], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: results.insertId, message: 'Booking created successfully' });
  });
});

// Get all bookings
router.get('/', (req, res) => {
  const query = 'SELECT * FROM bookings';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get booking by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM bookings WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Update booking status
router.put('/:id', (req, res) => {
  const { status } = req.body;
  const query = 'UPDATE bookings SET status = ? WHERE id = ?';
  
  db.query(query, [status, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Booking updated successfully' });
  });
});

// Delete booking
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM bookings WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Booking deleted successfully' });
  });
});
// ✅ Accept / Reject booking — paste this inside bookings.js
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'];
  if (!allowed.includes(status))
    return res.status(400).json({ message: 'Invalid status' });
  try {
    await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update booking status' });
  }
});

module.exports = router; // ← this line already exists, don't add twice

module.exports = router;

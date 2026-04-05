const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all cars
router.get('/', (req, res) => {
  const query = 'SELECT * FROM cars';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get car by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM cars WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Add new car
router.post('/', (req, res) => {
  const { name, brand, model, price_per_day, image, description } = req.body;
  const query = 'INSERT INTO cars (name, brand, model, price_per_day, image, description) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [name, brand, model, price_per_day, image, description], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: results.insertId, message: 'Car added successfully' });
  });
});

// Update car
router.put('/:id', (req, res) => {
  const { name, brand, model, price_per_day, image, description, status } = req.body;
  const query = 'UPDATE cars SET name = ?, brand = ?, model = ?, price_per_day = ?, image = ?, description = ?, status = ? WHERE id = ?';
  
  db.query(query, [name, brand, model, price_per_day, image, description, status, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Car updated successfully' });
  });
});

// Delete car
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM cars WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Car deleted successfully' });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Dummy endpoints
router.get('/menu', (req, res) => {
  // Ideally fetch menu items from DB
  res.json({ items: ["Pizza", "Burger", "Pasta"] });
});

router.post('/order', (req, res) => {
  // Create a new order (dummy implementation)
  res.status(201).json({ message: 'Order created successfully' });
});

router.get('/invoice/:orderId', (req, res) => {
  // Fetch invoice for given orderId (dummy implementation)
  res.json({ orderId: req.params.orderId, total: 25.00 });
});

module.exports = router;

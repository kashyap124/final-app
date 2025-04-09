const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ name: String, quantity: Number, price: Number }],
  totalAmount: Number,
  status: { type: String, enum: ['placed', 'preparing', 'delivered'], default: 'placed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

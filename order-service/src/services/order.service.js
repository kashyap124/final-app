const Order = require('../models/order.model');

exports.createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

exports.getAllOrders = async () => {
  return await Order.find();
};

exports.getOrderById = async (id) => {
  return await Order.findById(id);
};

exports.updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

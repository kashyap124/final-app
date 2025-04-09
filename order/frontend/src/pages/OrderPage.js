import React, { useState, useEffect } from 'react';
import OrderForm from '../components/OrderForm';
import { createOrder, getOrders } from '../services/orderService';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  const handleOrderSubmit = async (orderData) => {
    await createOrder(orderData);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8">
      <OrderForm onSubmit={handleOrderSubmit} />
      <h2 className="text-xl font-semibold mt-8 mb-4">All Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-2 mb-2 rounded">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <ul className="ml-4 list-disc">
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name} × {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;

import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'quantity' || field === 'price' ? parseInt(value) : value;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    onSubmit({ items, totalAmount });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Place Order</h2>
      {items.map((item, idx) => (
        <div key={idx} className="mb-2">
          <input
            className="border p-1 mr-2"
            placeholder="Item name"
            value={item.name}
            onChange={(e) => handleChange(idx, 'name', e.target.value)}
          />
          <input
            className="border p-1 mr-2 w-16"
            type="number"
            value={item.quantity}
            onChange={(e) => handleChange(idx, 'quantity', e.target.value)}
          />
          <input
            className="border p-1 w-20"
            type="number"
            value={item.price}
            onChange={(e) => handleChange(idx, 'price', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddItem} className="text-blue-500">
        + Add Item
      </button>
      <br />
      <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;

import React from 'react';
import OrderPage from './pages/OrderPage';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center">Food Order Vending System</h1>
      <OrderPage />
    </div>
  );
};

export default App;

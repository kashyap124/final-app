
// 📁 src/components/StaffDashboard.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StaffOrders from './StaffOrders';
import StaffBills from './StaffBills';
import StaffUsers from './StaffUsers';

function StaffDashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Staff Dashboard</h2>
      <nav className="mb-6 space-x-6">
        <Link to="orders" className="text-blue-600 hover:underline">Orders</Link>
        <Link to="bills" className="text-blue-600 hover:underline">Bills</Link>
        <Link to="users" className="text-blue-600 hover:underline">Users</Link>
      </nav>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Routes>
          <Route path="orders" element={<StaffOrders />} />
          <Route path="bills" element={<StaffBills />} />
          <Route path="users" element={<StaffUsers />} />
        </Routes>
      </div>
    </div>
  );
}

export default StaffDashboard;

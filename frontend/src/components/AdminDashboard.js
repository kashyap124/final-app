import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminBills from './AdminBills';
import AdminUsers from './AdminUsers';

function AdminDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Admin Dashboard</h2>
      <nav className="mb-6 space-x-6">
        <Link to="bills" className="text-purple-600 hover:underline">View All Bills</Link>
        <Link to="users" className="text-purple-600 hover:underline">View All Customers</Link>
      </nav>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Routes>
          <Route path="bills" element={<AdminBills />} />
          <Route path="users" element={<AdminUsers />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
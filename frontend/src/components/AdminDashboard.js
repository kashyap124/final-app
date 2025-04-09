import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminBills from './AdminBills';
import AdminUsers from './AdminUsers';
import axios from '../api/axios';

function AdminDashboard() {
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const createStaff = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/auth/create-staff', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`✅ Staff '${res.data.staff}' created successfully.`);
      setNewUser({ username: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating staff.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Admin Dashboard</h2>

      <nav className="mb-6 space-x-6">
        <Link to="bills" className="text-purple-600 hover:underline">View All Bills</Link>
        <Link to="users" className="text-purple-600 hover:underline">View All Customers</Link>
      </nav>

      {/* Create Staff Section */}
      <div className="mb-10 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-purple-700 mb-4">Create Staff</h3>
        <form onSubmit={createStaff} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Create Staff
          </button>
        </form>
        {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
        {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
      </div>

      {/* Existing Routes */}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password, role });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate(`/${res.data.role}`);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Restaurant Login</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full mb-3 p-2 border border-gray-300 rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-3 p-2 border border-gray-300 rounded" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mb-5 p-2 border border-gray-300 rounded">
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
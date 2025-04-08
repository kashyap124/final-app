import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ role, children }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token || userRole !== role) return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;

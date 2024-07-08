import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('token'); // Verifica se o token está presente no sessionStorage

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redireciona para a página de login
  }

  return children;
};

export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  console.log(element);
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;

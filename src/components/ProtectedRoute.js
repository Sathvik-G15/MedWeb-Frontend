// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Custom Auth context

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  // Check if user is logged in and uid is verified
  if (!user) {
    return <Navigate to="/" />;
  }
  
 
  // Clone the element and pass the uid as a prop
  return React.cloneElement(element, { user }) ;
};

export default ProtectedRoute;

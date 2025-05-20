
import React from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  // Redirect to login page for KSRTC app
  return <Navigate to="/login" replace />;
};

export default HomePage;

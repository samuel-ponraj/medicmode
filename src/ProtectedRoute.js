import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ logged, children }) => {
    return logged ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
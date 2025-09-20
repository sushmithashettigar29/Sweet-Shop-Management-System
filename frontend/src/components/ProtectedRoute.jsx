import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If adminOnly route but user is not admin → redirect to home
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Otherwise → render the protected page
  return children;
};

export default ProtectedRoute;

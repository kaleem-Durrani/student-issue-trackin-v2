// src/components/ProtectedRoute.js

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // User not logged in, redirect to sign-in
    return <Navigate to="/signIn" replace={true} />;
  }

  if (!user.isVerified) {
    // If user is not verified, they should only be able to access the verify account route
    if (role !== "verifyAccount") {
      return <Navigate to="/verifyAccount" replace={true} />;
    }
    return <Outlet />;
  }

  // Redirect verified users trying to access verifyAccount screen to their appropriate home screen
  if (role === "verifyAccount" && user.isVerified) {
    return user.adminType ? (
      user.adminType === "mainAdmin" ? (
        <Navigate to="/adminHomeScreen" replace={true} />
      ) : (
        <Navigate to="/departmentAdminHome" replace={true} />
      )
    ) : (
      <Navigate to="/home" replace={true} />
    );
  }

  // Role-based redirects
  if (role === "student" && user.adminType) {
    return user.adminType === "mainAdmin" ? (
      <Navigate to="/adminHomeScreen" replace={true} />
    ) : (
      <Navigate to="/departmentAdminHome" replace={true} />
    );
  }

  if (role === "mainAdmin" && user.adminType !== "mainAdmin") {
    return <Navigate to="/departmentAdminHome" replace={true} />;
  }

  if (
    role === "departmentAdmin" &&
    (!user.adminType || user.adminType === "mainAdmin")
  ) {
    return !user.adminType ? (
      <Navigate to="/home" replace={true} />
    ) : (
      <Navigate to="/adminHomeScreen" replace={true} />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

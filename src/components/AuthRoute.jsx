// src/components/AuthRoute.js

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthRoute = ({ allowAuthenticated = true }) => {
  const { user, loading } = useAuth();

  console.log("running AuthRoute");

  if (loading) {
    console.log("running loading");
    return <div>Loading...</div>;
  }

  if (allowAuthenticated && user) {
    // Redirect to DefaultRedirect, which handles routing based on user type
    console.log("running redirecting");
    return <Navigate to="/home" replace={true} />;
  }

  if (!allowAuthenticated && !user) {
    console.log("not logged in returning outler of sign in");
    return <Outlet />;
  }

  console.log("running default redirecting");
  // If user is authenticated but `allowAuthenticated` is false, redirect to the home page
  return <Navigate to="/" replace={true} />;
};

export default AuthRoute;

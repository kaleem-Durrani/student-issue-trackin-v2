// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import authApi from "../api/authApi"; // Import the API methods

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // Track the type of user (student or admin)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await authApi.checkAuth();
        if (response.ok) {
          setUser(response.data.user); // Assume response.data contains the user object
          setUserType(response.data.userType); // Save the userType (either 'student' or 'admin')
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const signup = async (
    name,
    email,
    cms,
    department,
    password,
    confirmPassword
  ) => {
    const response = await authApi.signUpStudent(
      name,
      email,
      cms,
      department,
      password,
      confirmPassword
    );
    if (response.ok) {
      console.log(response.data);
      setUser(response.data.user);
      setUserType(response.data.userType);
    }
    return response;
  };

  const login = async (email, password, type) => {
    let response;
    if (type === "student") {
      response = await authApi.logInStudent(email, password);
    } else if (type === "admin") {
      response = await authApi.loginAdmin(email, password);
    }

    if (response?.ok) {
      console.log(response.data);
      setUser(response.data.user);
      setUserType(type);
    }
    return response;
  };

  const logout = async () => {
    if (userType === "student") {
      await authApi.logOutStudent();
    } else if (userType === "admin") {
      await authApi.logoutAdmin();
    }
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, userType, loading, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

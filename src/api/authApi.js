// src/api/authApi.js

import client from "./client";

const signUpStudent = (
  name,
  email,
  cms,
  department,
  password,
  confirmPassword
) =>
  client.post("/auth/student/signup", {
    name,
    email,
    cms,
    department,
    password,
    confirmPassword,
  });

const logInStudent = (email, password) =>
  client.post("/auth/student/login", { email, password });

const logOutStudent = () => client.post("/auth/student/logout", {});

const verifyOtpStudent = (otp) =>
  client.post("/auth/student/verify-otp", { otp });

const requestNewOtpStudent = () =>
  client.post("/auth/student/request-new-otp", {});

const loginAdmin = (email, password) =>
  client.post("/auth/admin/login", { email, password });

const logoutAdmin = () => client.post("/auth/admin/logout", {});

const checkAuth = () => client.get("/auth/check-auth");

export default {
  signUpStudent,
  logInStudent,
  logOutStudent,
  verifyOtpStudent,
  requestNewOtpStudent,
  loginAdmin,
  logoutAdmin,
  checkAuth,
};

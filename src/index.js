// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import AuthProvider
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import CreateIssue from "./screens/createIssue/CreateIssue";
import IssueList from "./screens/issueList/IssueList";
import SignIn from "./screens/auth/signIn/SignIn";
import SignUp from "./screens/auth/signUp/SignUp";
import IssueDetail from "./screens/issueDetail/IssueDetail";
import AdminHomeScreen from "./screens/adminHomeScreen/AdminHomeScreen";
import AdminIssueList from "./screens/adminIssueList/AdminIssueList";
import AdminIssueDetail from "./screens/adminIssueDetail/AdminIssueDetail";
import VerifyAccount from "./screens/auth/verifyAccount/VerifyAccount";
import StudentRoute from "./components/StudentRoute";
import AdminRoute from "./components/AdminRoute";
import DepartmentAdminHome from "./screens/departmentAdminHome/DepartmentAdminHome";
import VerifyAccountRoute from "./components/VerifyAccountRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import { IssueListProvider } from "./contexts/IssueListContex";
import DepartmentAdminIssueDetail from "./screens/deptAdminIssueDetail/DepartmentAdminIssueDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Default Redirect based on user status */}
      <Route index element={<AuthRoute />} />

      {/* Routes accessible only when user is not logged in */}
      <Route element={<AuthRoute allowAuthenticated={false} />}>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Route>

      {/* When logged in but account not verified */}
      <Route element={<ProtectedRoute role="verifyAccount" />}>
        <Route path="/verifyAccount" element={<VerifyAccount />} />
      </Route>

      {/* When logged in as student */}
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/createIssues" element={<CreateIssue />} />
        <Route path="/issueList" element={<IssueList />} />
        <Route path="/issueDetail" element={<IssueDetail />} />
      </Route>

      {/* When logged in as main admin */}
      <Route element={<ProtectedRoute role="mainAdmin" />}>
        <Route path="/adminHomeScreen" element={<AdminHomeScreen />} />
        <Route path="/adminIssueList" element={<AdminIssueList />} />
        <Route path="/adminIssueDetail" element={<AdminIssueDetail />} />
      </Route>

      {/* When logged in as department admin */}
      <Route element={<ProtectedRoute role="departmentAdmin" />}>
        <Route path="/departmentAdminHome" element={<DepartmentAdminHome />} />
        <Route
          path="/departmentAdminIssueDetail"
          element={<DepartmentAdminIssueDetail />}
        />
      </Route>
    </Route>
  )
);

// the approach where there is a different route protector component for each role
// has redundnacy but is easier to understand

// ...................................
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       {/* when not logged in */}
//       <Route index={true} path="/signIn" element={<SignIn />} />
//       <Route path="/signUp" element={<SignUp />} />

//       {/* when logged in but account not verified */}
//       <Route path="" element={<VerifyAccountRoute />}>
//         <Route path="/verifyAccount" element={<VerifyAccount />} />
//       </Route>

//       {/* when logged in as student */}
//       <Route path="" element={<StudentRoute />}>
//         <Route path="/home" element={<HomeScreen />} />
//         <Route path="/createIssues" element={<CreateIssue />} />
//         <Route path="/issueList" element={<IssueList />} />
//         <Route path="/issueDetail" element={<IssueDetail />} />
//       </Route>

//       {/* when logged in as main admin */}
//       <Route path="" element={<AdminRoute />}>
//         <Route path="/adminHomeScreen" element={<AdminHomeScreen />} />
//         <Route path="/adminIssueList" element={<AdminIssueList />} />
//         <Route path="/adminIssueDetail" element={<AdminIssueDetail />} />
//       </Route>

//       {/* when logged in as department admin */}
//       <Route path="/departmentAdminHome" element={<DepartmentAdminHome />} />
//     </Route>
//   )
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <IssueListProvider>
        <RouterProvider router={router} />
      </IssueListProvider>
    </AuthProvider>
  </React.StrictMode>
);

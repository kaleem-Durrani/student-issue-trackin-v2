import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/createIssues" element={<CreateIssue />} />
      <Route path="/issueList" element={<IssueList />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/issueDetail" element={<IssueDetail />} />
      <Route path="/adminHomeScreen" element={<AdminHomeScreen />} />
      <Route path="/adminIssueList" element={<AdminIssueList />} />
      <Route path="/adminIssueDetail" element={<AdminIssueDetail />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

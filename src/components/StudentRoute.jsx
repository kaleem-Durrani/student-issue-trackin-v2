import { Outlet, Navigate } from "react-router-dom";

const StudentRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/signIn" replace={true} />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verifyAccount" replace={true} />;
  }

  if (user.adminType && user.adminType === "mainAdmin") {
    return <Navigate to="/adminHomeScreen" replace={true} />;
  }

  if (user.adminType && user.adminType !== "mainAdmin") {
    return <Navigate to="/departmentAdminScreen" replace={true} />;
  }

  return <Outlet />;
};

export default StudentRoute;

import { Outlet, Navigate } from "react-router-dom";

const VerifyAccountRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/signIn" replace={true} />;
  }

  if (user.isVerified && !user.adminType) {
    return <Navigate to="/home" replace={true} />;
  }

  if (user.isVerified && user.adminType === "mainAdmin") {
    return <Navigate to="/adminHomeScreen" replace={true} />;
  }

  if (user.isVerified && user.adminType !== "mainAdmin") {
    return <Navigate to="/departmentAdminHome" replace={true} />;
  }

  return <Outlet />;
};

export default VerifyAccountRoute;

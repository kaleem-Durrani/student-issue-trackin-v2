import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = ({ user }) => {
  if (!user) {
    return <Navigate to="/signIn" replace={true} />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verifyAccount" replace={true} />;
  }

  if (!user.adminType) {
    return <Navigate to="/home" replace={true} />;
  }

  if (user.adminType !== "mainAdmin") {
    return <Navigate to="/departmentAdminScreen" replace={true} />;
  }
  return <Outlet />;
};

export default AdminRoutes;

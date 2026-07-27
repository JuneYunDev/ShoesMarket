import { Navigate, Outlet } from "react-router-dom";

import { useAccount } from "../context/accountContext";

const AdminRoute = () => {
  const { isLoggedIn, isAdmin } = useAccount();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;

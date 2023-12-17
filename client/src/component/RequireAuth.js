import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const isUserLoggedIn = useSelector((s) => s.user.isUserLoggedIn);

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;

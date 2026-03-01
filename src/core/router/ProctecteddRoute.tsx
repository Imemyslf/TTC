import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenUtils";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenUtils";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  if (token && !isTokenExpired(token)) {
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

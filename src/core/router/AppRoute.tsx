import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../features/auth/pages/Login";
import Welcome from "../../features/welcome/pages/WelcomePage";
import ProtectedRoute from "./ProctecteddRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "../../features/common/pages/NotFound";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<Welcome />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

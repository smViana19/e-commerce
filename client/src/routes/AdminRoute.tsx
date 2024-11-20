import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";

interface AdminRouteProps {
  element?: ReactNode;
}
const AdminRoute = ({ element }: AdminRouteProps) => {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }
  return element ? element : <Outlet />;
};

export default AdminRoute;

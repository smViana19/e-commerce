import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import { ReactElement } from "react";
interface ProtectedRouteProps {
  element: ReactElement;
}
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;

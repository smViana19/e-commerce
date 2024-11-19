import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

const MainLayout = () => {
  const { logout, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loading, navigate]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;

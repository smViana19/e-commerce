import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ProtectedLinkProps {
  to: string;
  requiredRole?: string;
  children: ReactNode;
}

const ProtectedLink = ({ to, requiredRole, children }: ProtectedLinkProps) => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (!isLoggedIn) {
      toast.error("Você precisa estar logado para acessar esta página.");
      return;
    }
    if (requiredRole && user?.role !== requiredRole) {
      toast.error("Você não tem permissão para acessar esta página");
      return;
    }
    navigate(to);
  };
  return (
    <button
      onClick={handleNavigation}
      className="px-4 py-2 w-full hover:bg-gray-100 flex items-center gap-2"
    >
      {children}
    </button>
  );
};

export default ProtectedLink;

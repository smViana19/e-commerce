import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";

interface DropdownProps {
  handleLogout: () => void;
}
const Dropdown = ({ handleLogout }: DropdownProps) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
      <Link
        to="/pedidos"
        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
      >
        Meus pedidos
      </Link>
      <Link
        to="/gerenciar"
        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
      >
        Área restrita
        <span className="flex-shrink-0 text-lg">
          <MdLock />
        </span>
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Sair
      </button>
    </div>
  );
};
export default Dropdown;

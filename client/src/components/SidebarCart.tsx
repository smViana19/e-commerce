import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface SidebarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Array<{ label: string; link: string }>;
}

const SidebarCart: React.FC<SidebarProps> = ({
  menuOpen,
  setMenuOpen,
  cartItems,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-black/50 backdrop-blur-sm transition-all duration-700 ease-in-out ${
        menuOpen ? "block" : "hidden"
      }`}
    >
      <section className="text-black bg-white flex-col absolute top-0 right-0 h-full p-8 gap-8 z-50 w-80">
        <IoCloseOutline
          onClick={() => setMenuOpen(false)}
          className="mt-0 mb-8 text-3xl cursor-pointer"
        />
        <h2 className="text-xl font-bold mb-4">Carrinho de Compras</h2>
        <div className="flex-1 overflow-y-auto">
          {cartItems.map((item, i) => (
            <Link key={i} to={item.link} className="block font-bold mb-2">
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SidebarCart;

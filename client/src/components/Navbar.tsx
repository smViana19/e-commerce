import React, { ComponentProps, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import SidebarCart from "./SidebarCart";
import { useCart } from "../context/CartContext";
import { Button } from "./Button";
import Dropdown from "./Dropdown";

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Navbar = ({ isLoggedIn, handleLogout }: NavbarProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const totalItems = [...cartItems].reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const navLinks = [
    { label: "Produtos", link: "/produtos" },
    { label: "Pedidos", link: "/pedidos" },
    { label: "Sobre", link: "#" },
    { label: "Contato", link: "#" },
  ];
  return (
    <main>
      <nav className="flex justify-between px-8 items-center py-6">
        <section className="flex items-center gap-4">
          <FiMenu
            className="text-3xl cursor-pointer"
            onClick={() => setIsSideMenuOpen(true)}
          />
          <Link to="/" className="text-4xl font-mono">
            BaZZaR
          </Link>
        </section>

        {/* sidebar menu */}

        <div
          className={`fixed h-full w-full  bg-black/50 backdrop-blur-sm top-0 right-0 transition-all duration-700 ease-in-out  ${
            isSideMenuOpen ? "block" : "hidden"
          }`}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex ">
            <IoCloseOutline
              onClick={() => setIsSideMenuOpen(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />
            {navLinks.map((d, i) => (
              <Link key={i} to={d.link} className="font-bold">
                {d.label}
              </Link>
            ))}
          </section>
        </div>
        {isLoggedIn ? (
          <section className="flex items-center gap-4 ">
            <div className="relative">
              <AiOutlineShoppingCart
                className="text-3xl cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
              <span className="absolute rounded-full -top-3 -right-2 bg-black text-white text-xs px-2 py-1 ">
                {totalItems}
              </span>
            </div>

            {/* </Link> */}
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <MdAccountCircle className="text-3xl" />
              </button>
              {dropdownOpen && <Dropdown handleLogout={handleLogout} />}
            </div>
          </section>
        ) : (
          <section>
            <Button text="Login" onClick={() => navigate("/login")} />
          </section>
        )}
      </nav>
      <hr />
      <SidebarCart menuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
    </main>
  );
};

export default Navbar;

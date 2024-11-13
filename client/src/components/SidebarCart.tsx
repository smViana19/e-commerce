import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "./Button";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axios";

interface SidebarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarCart: React.FC<SidebarProps> = ({ menuOpen, setMenuOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, removeItemFromCart, getTotalPrice } = useCart();

  const createOrderAndRedirectToPayment = async () => {
    try {
      const response = await toast.promise(axiosInstance.post("/order", {}), {
        pending: "Finalizando pedido...",
        success: "Pedido finalizado com sucesso!",
        error: "Erro ao finalizar o pedido, tente novamente.",
      });
    } catch (error) {
      console.error(error);
      //TODO: MENSAGEM DO ERRO NA TELA
    }
  };

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
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <img src={item.image} alt={item.title} className="w-16 h-16" />
                <div className="flex-1 ml-4">
                  <p className="font-bold">{item.title}</p>
                  <p>
                    {item.quantity}x R${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remover
                </button>
              </div>
            ))
          ) : (
            <p>O carrinho está vazio</p>
          )}
        </div>
        <div className="my-4">
          <p className="font-medium text-lg">
            Total: R${getTotalPrice().toFixed(2)}
          </p>
        </div>
        <Button
          isLoading={isLoading}
          onClick={createOrderAndRedirectToPayment}
          text="Finalizar pedido"
        />
      </section>
    </div>
  );
};

export default SidebarCart;

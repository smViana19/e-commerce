import { IoCloseOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { Button } from "./Button";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../services/axios";
import { loadStripe } from "@stripe/stripe-js";
interface SidebarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarCart: React.FC<SidebarProps> = ({ menuOpen, setMenuOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, removeItemFromCart, getTotalPrice } = useCart();
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser) : null;
  const stripePromise = loadStripe(
    "pk_test_51QL2V2E048WBTF5AUTSM8uzXxiNf9wnlHMShByq5Ez5ICgRtTVJyMWs6wTwaxoHioUDrCUxyC60xtqZ0tpVE0RKv00oXfUh5td"
    // process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
  );

  const createOrderAndRedirectToPayment = async () => {
    try {
      setIsLoading(true);
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));
      if (lineItems.length === 0) {
        toast.warn("Adicione pelo menos 1 produto.");
        return;
      }

      const orderResponse = await axiosInstance.post("/order", {
        userId: userId.id, //TODO: AJUSTAR PARA PEGAR PELA SESSAO
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });
      const orderId = orderResponse.data.id;
      console.log(orderId);
      const { data } = await axiosInstance.post("/checkout-session", {
        lineItems,
        orderId,
      });
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      toast.error("Erro ao redirecionar para o pagamento. Tente novamente.");
    } finally {
      setIsLoading(false);
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
                    {item.quantity}x R${item.price}
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
      <ToastContainer />
    </div>
  );
};

export default SidebarCart;

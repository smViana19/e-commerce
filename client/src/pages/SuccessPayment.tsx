import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../services/axios";
import { Button } from "../components/Button";

const SuccesPayment = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("sessionId");
  const navigate = useNavigate();
  useEffect(() => {
    const confirmOrder = async () => {
      if (sessionId) {
        try {
          await axiosInstance.post("/order/confirm", { sessionId });
          toast.success("Pagamento confirmado");
        } catch (error) {
          console.error("Erro ao confirmar compra", error);
        }
      }
    };
    confirmOrder();
  }, [sessionId]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Pagamento realizado com sucesso
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Seu pedido foi confirmado e está em processo de preparação. Você pode
          acompanhar o status do seu pedido.
        </p>
        <Button text="Ver meus pedidos" onClick={() => navigate("/pedidos")} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SuccesPayment;

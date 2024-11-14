import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../services/axios";

const SuccesPayment = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("sessionId");
  useEffect(() => {
    const confirmOrder = async () => {
      if (sessionId) {
        try {
          await axiosInstance.post("/order/confirm", { sessionId });
          alert("Pedido confirmado!");
        } catch (error) {
          alert("Erro ao confirmar o pedido.");
          console.error("Erro ao confirmar compra", error);
        }
      }
    };
    confirmOrder();
  }, [sessionId]);
  return <div>Pagamento realizado com sucesso !</div>;
};

export default SuccesPayment;

import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
interface OrderCardProps {
  id: string;
  paymentStatus: "pending" | "confirmed" | "failed";
  totalAmout: number;
}

const OrderCard = ({ id, paymentStatus, totalAmout }: OrderCardProps) => {
  const statusConfig = {
    pending: {
      text: "Pagamento Pendente",
      icon: <FiClock className="text-yellow-400 w-4 h-4" />,
      textColor: "text-yellow-400",
    },
    confirmed: {
      text: "Pago",
      icon: <FiCheckCircle className="text-green-500 w-4 h-4" />,
      textColor: "text-green-500",
    },
    failed: {
      text: "Cancelado",
      icon: <FiXCircle className="text-red-500 w-4 h-4" />,
      textColor: "text-red-500",
    },
  };
  const { text, icon, textColor } = statusConfig[paymentStatus];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center font-montserrat">
        <div>
          <h2 className="text-xl font-semibold">Pedido #{id}</h2>
          <div className="flex items-center gap-2">
            {icon}
            <p className={`text-sm font-medium ${textColor}`}>{text}</p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-md font-semibold">
          Total: R$ {totalAmout.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;

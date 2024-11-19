import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import OrderCard from "../components/OrderCard";

export interface Product {
  id: string;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;
  orderProduct: OrderProduct[];
}
export interface OrderProduct {
  price: number;
  quantity: number;
}
export interface Orders {
  id: string;
  paymentStatus: "pending" | "confirmed" | "failed";
  totalAmount: number;
  products: Product[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser) : null;
  console.log(userId.id);
  useEffect(() => {
    const fetchUserOrders = async () => {
      const response = await axiosInstance.get(`/order/${userId.id}`);
      setOrders(response.data);
    };
    fetchUserOrders();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {orders.length > 0 ? (
        <div className="grid gap-4 mt-10 max-w-6xl mx-auto px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              paymentStatus={order.paymentStatus}
              totalAmout={order.totalAmount}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-2xl text-gray-500">
            Sua lista de pedidos está vazia
          </p>
        </div>
      )}
    </div>
  );
};
export default Orders;

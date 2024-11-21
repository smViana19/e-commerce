import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../../services/axios";
import Card from "../components/Card";
import Spinner from "../components/Spinner";

interface Product {
  id: string;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await axiosInstance.get("/product");
      setProducts(response.data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid gap-6 mt-10 max-w-6xl mx-auto px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={product.image}
            description={product.description}
            price={product.price}
            title={product.name}
            quantity={product.stockQuantity}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axiosInstance from "../../services/axios";

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
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axiosInstance.get("/product");
      console.log(response.data);
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grid gap-6 mt-10 max-w-6xl mx-auto px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
        {products.map((product) => (
          <Card
            id={product.id}
            image={product.image}
            description={product.description}
            price={product.price}
            title={product.name}
            quantity={product.stockQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

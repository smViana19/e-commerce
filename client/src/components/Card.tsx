import { useCart } from "../context/CartContext";

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number
}

const Card = ({ id, image, title, description, price }: CardProps) => {

  const { addToCart } = useCart()
  const handleAddToCart = () => {
    const item = {
      id,
      title,
      price,
      quantity: 1,
      image
    }
    addToCart(item);
  }

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white ">
      <img className="w-full h-64 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold ">{price}</span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-black/90">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

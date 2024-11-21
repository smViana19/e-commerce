import { IoMdAdd } from "react-icons/io";
import { useCart } from "../context/CartContext";
import { Button } from "./Button";

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity?: number;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Card = ({
  id,
  image,
  title,
  description,
  price,
  isAdmin = false,
  onEdit,
  onDelete,
}: CardProps) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    const item = {
      id,
      title,
      price,
      quantity: 1,
      image,
    };
    addItemToCart(item);
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white ">
      <img className="w-full h-64 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {title}
        </h2>
        <p className="text-gray-600 mt-2 truncate">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold mr-5">{`R$ ${price.toFixed(
            2
          )}`}</span>

          {isAdmin ? (
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  text="Editar"
                  onClick={onEdit}
                  variant="outline"
                  size="small"
                />
              )}
              {onDelete && (
                <Button
                  text="Excluir"
                  onClick={onDelete}
                  variant="outline" // botão transparente
                  size="small" // tamanho pequeno
                />
              )}
            </div>
          ) : (
            <Button
              text="Adicionar ao Carrinho"
              onClick={handleAddToCart}
              variant="filled"
              size="small"
              width="auto"
              icon={<IoMdAdd />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

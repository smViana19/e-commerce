import { ReactNode, createContext, useContext, useState } from "react"

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

interface CartProviderProps {
    children: ReactNode;
  }

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const itemIndex = prevItems.findIndex(i => i.id === item.id);
            if (itemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex].quantity += item.quantity;
                return updatedItems;
            } else {
                return [...prevItems, item];
            }
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
          {children}
        </CartContext.Provider>
      );
    

}
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };


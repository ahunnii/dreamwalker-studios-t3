import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: string;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  function getItemQuantity(id: string) {
    return cartItems.find((item: CartItem) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: string) {
    setCartItems((current: CartItem[]) => {
      if (current.find((item) => item.id === id) == null) {
        return [...current, { id, quantity: 1 }];
      } else {
        return current.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: string) {
    setCartItems((current: CartItem[]) => {
      if (current.find((item) => item.id === id)?.quantity === 1) {
        return current.filter((item) => item.id !== id);
      } else {
        return current.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((current: CartItem[]) => {
      return current.filter((item) => !(item.id === id));
    });
  }

  const cartQuantity = cartItems.reduce((acc: number, item: CartItem) => {
    return acc + item.quantity;
  }, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

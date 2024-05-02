"use client";

import { CartContextProvider } from "@/hooks/useCart";

interface CardProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CardProviderProps> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;

"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const notify = useTranslations("Notifications");
  const { DataToStore, SetToStorage } = useLocalStorage("CartProducts", []);
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("New Render...");
    if (DataToStore) setCartProducts(DataToStore);
  }, [DataToStore]);

  // Calculate Total Price of Products
  const CountTotal = (products) => {
    const totalPrice = products?.reduce((acc, product) => {
      const price = Number(product?.variants[0]?.price);

      return acc + (price - price * product?.discount) * product?.quantity;
    }, 0);

    setTotal(totalPrice);
  };

  const AddProductToCart = (product) => {
    const existingProduct = cartProducts.find((p) => p._id === product._id);
    if (existingProduct) {
      const updatedProducts = cartProducts.map((p) =>
        p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCartProducts(updatedProducts);
      SetToStorage(updatedProducts);
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
      SetToStorage([...cartProducts, { ...product, quantity: 1 }]);
      toast.success(notify("addedToCartSuccessfully"));
    }
  };

  const RemoveProductFromCart = (productId) => {
    const updatedProducts = cartProducts.filter((p) => p._id !== productId);
    setCartProducts(updatedProducts);
    SetToStorage(updatedProducts);
    toast.success(notify("removedFromCart"));
  };

  const IncreaseQuantity = (productId) => {
    const updatedProducts = cartProducts.map((p) =>
      p._id === productId ? { ...p, quantity: p.quantity + 1 } : p
    );
    setCartProducts(updatedProducts);
    SetToStorage(updatedProducts);
  };

  const DecreaseQuantity = (productId) => {
    const updatedProducts = cartProducts.map((p) =>
      p._id === productId ? { ...p, quantity: p.quantity - 1 } : p
    );
    setCartProducts(updatedProducts);
    SetToStorage(updatedProducts);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        total,
        AddProductToCart,
        RemoveProductFromCart,
        CountTotal,
        IncreaseQuantity,
        DecreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

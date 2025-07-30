"use client";
import React from "react";
import { Button } from "../ui/button";
import { GitCompareArrows, ShoppingBag } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";

export const AddToCompare = () => {
  const { GetFromStorage } = useLocalStorage();
  const DisplayProducts = () => {
    const products = GetFromStorage("CartProducts");
    products?.map((val) => console.log(val?.name));
  };
  return (
    <Button
      className="w-full cursor-pointer"
      variant="outline"
      onClick={DisplayProducts}
    >
      <span>اضافة للمقارنة</span>
      <GitCompareArrows />
    </Button>
  );
};

export const AddToCart = ({ product }) => {
  const { GetFromStorage, SetToStorage } = useLocalStorage();

  const AppendProductToCart = () => {
    const products = GetFromStorage("CartProducts", []);
    const ProductExist = products?.find((val) => val?.id == product?.id)
      ? true
      : false;

    if (!ProductExist) {
      SetToStorage("CartProducts", [...products, { ...product, quantity: 1 }]);
      toast.success("تم اضافة المنتج لسلة الطلبات");
    } else {
      toast.error("هذا المنتج تم اضافته مسبقا");
    }
  };
  return (
    <Button
      className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-slate-100"
      onClick={AppendProductToCart}
    >
      <span>اضافة للسلة</span>
      <ShoppingBag />
    </Button>
  );
};

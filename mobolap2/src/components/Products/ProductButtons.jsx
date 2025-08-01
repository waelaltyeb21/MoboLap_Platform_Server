"use client";
import React from "react";
import { Button } from "../ui/button";
import { GitCompareArrows, ShoppingBag } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";

export const AddToCompare = ({ product }) => {
  const { DataToStore: products, SetToStorage } = useLocalStorage(
    "CompareProducts",
    []
  );
  const AppendProductToCompare = () => {
    if (products?.length === 3) {
      toast.error("لقد وصلت ل3 مقارنات");
    }
    const ProductExist = products?.find((val) => val?.id == product?.id)
      ? true
      : false;

    if (!ProductExist) {
      SetToStorage([...products, { ...product, quantity: 1 }]);
      toast.success("تم اضافة المنتج لقائمة المقارنة ");
    } else {
      toast.error("هذا المنتج تم اضافته مسبقا");
    }
  };
  return (
    <Button
      className="w-full flex items-center gap-2 cursor-pointer"
      variant="outline"
      onClick={AppendProductToCompare}
    >
      <span>اضافة للمقارنة</span>
      <GitCompareArrows />
    </Button>
  );
};

export const AddToCart = ({ product }) => {
  const { DataToStore: products, SetToStorage } = useLocalStorage(
    "CartProducts",
    []
  );

  const AppendProductToCart = () => {
    const ProductExist = products?.find((val) => val?.id == product?.id)
      ? true
      : false;

    if (!ProductExist) {
      SetToStorage([...products, { ...product, quantity: 1 }]);
      toast.success("تم اضافة المنتج لسلة الطلبات");
    } else {
      toast.error("هذا المنتج تم اضافته مسبقا");
    }
  };
  return (
    <Button
      className="w-full flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-slate-100"
      onClick={AppendProductToCart}
    >
      <span>اضافة للسلة</span>
      <ShoppingBag />
    </Button>
  );
};

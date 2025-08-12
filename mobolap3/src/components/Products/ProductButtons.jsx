"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { GitCompareArrows, ShoppingBag } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";
import { CartContext } from "@/contexts/CartContext";

export const AddToCompare = ({ product }) => {
  const actions = useTranslations("Actions");
  const notify = useTranslations("Notifications");
  const { DataToStore: products, SetToStorage } = useLocalStorage(
    "CompareProducts",
    []
  );
  const AppendProductToCompare = () => {
    if (products?.length === 3) {
      toast.error(notify("failedToAddToCompare"));
      return;
    }

    const ProductExist = products?.find((val) => val?._id == product?._id)
      ? true
      : false;

    if (!ProductExist) {
      console.log("Added");
      console.log("Compare List: ", [...products, product?._id]);
      SetToStorage([...products, product?._id]);
      toast.success(notify("addedToCompareSuccessfully"));
    } else {
      toast.error(notify("existInCompareList"));
    }
  };
  return (
    <Button
      className="w-full flex items-center gap-2 cursor-pointer"
      variant="outline"
      onClick={AppendProductToCompare}
    >
      <span>{actions("addToCompare")}</span>
      <GitCompareArrows />
    </Button>
  );
};

export const AddToCart = ({ product }) => {
  const actions = useTranslations("Actions");
  const { AddProductToCart } = useContext(CartContext);
  if (!product) return null;
  return (
    <Button
      className="w-full flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-slate-100"
      onClick={() => AddProductToCart({ _id: product?._id })}
    >
      <span>{actions("addToCart")}</span>
      <ShoppingBag />
    </Button>
  );
};

"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AddToCart, AddToCompare } from "./ProductButtons";
import ProductVariants from "./ProductVariants";
import { Badge } from "../ui/badge";
import CartProvider from "@/contexts/CartContext";

const CardDetails = ({ product }) => {
  const [SelectedProductVariant, setSelectedProductVariant] = useState({
    ...product,
    variants: [product?.variants[0]],
  });
  const HandleVariant = (variant) => {
    setSelectedProductVariant({ ...product, variants: [variant] });
  };
  return (
    <>
      <div className="my-4 flex justify-between items-center">
        <Link
          href={`/products/${product?._id}`}
          className="group-hover:text-indigo-600 text-xl font-semibold text-pretty capitalize smooth-transition"
        >
          {product?.name}
        </Link>

        <Badge
          className={`text-slate-100 ${
            product?.status == "جديد" ? "bg-emerald-400" : "bg-blue-600"
          }`}
        >
          {product?.status}
        </Badge>
      </div>

      <ProductVariants product={product} HandleVariant={HandleVariant} />

      <CartProvider>
        <div className="w-full grid grid-cols-1 md:lg:grid-cols-2 gap-4 mt-4">
          <AddToCompare product={product} />
          <AddToCart product={SelectedProductVariant} />
        </div>
      </CartProvider>
    </>
  );
};

export default CardDetails;

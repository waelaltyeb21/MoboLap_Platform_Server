"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AddToCart, AddToCompare } from "./ProductButtons";
import ProductVariants from "./ProductVariants";

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
      <div className="my-4">
        <Link
          href={`/products/${product?._id}`}
          className="group-hover:text-indigo-600 text-xl font-semibold text-pretty smooth-transition"
        >
          {product?.name}
        </Link>
        <ProductVariants product={product} HandleVariant={HandleVariant} />
      </div>

      <div className="w-full grid grid-cols-1 md:lg:grid-cols-2 gap-4">
        <AddToCompare product={product} />
        <AddToCart product={SelectedProductVariant} />
      </div>
    </>
  );
};

export default CardDetails;

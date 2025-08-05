"use client";
import React, { useState } from "react";
import { NumberFormat } from "@/lib/NumberFormat";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const ProductVariants = ({
  product,
  HandleVariant = () => toast.error("This Function Is Under Construct"),
}) => {
  const [DisplayedVariant, setDisplayedVariant] = useState(
    product?.variants[0]
  );
  const [selectedSku, setSelectedSku] = useState(product?.variants[0]?.sku);

  const ChangeVariant = (sku) => {
    if (product?.variants?.length == 1 || product?.variants?.length == 0)
      return;

    // Get The Variant With Sku
    const GetVariant = product?.variants?.find(
      (variant) => variant?.sku === sku
    );

    setDisplayedVariant(GetVariant);
    setSelectedSku(GetVariant?.sku);
    HandleVariant(GetVariant);
  };
  return (
    <div className="flex flex-col gap-4">
      {/* Product Price */}
      <div className="flex sm:justify-start sm:flex-row flex-row-reverse justify-between items-center gap-4">
        <h4 className="text-3xl font-semibold flex">
          <span>
            {NumberFormat(
              DisplayedVariant?.price - parseInt(DisplayedVariant?.price * 0.2)
            )}
          </span>
        </h4>
        <h6 className="text-xl text-slate-500 line-through font-semibold">
          {NumberFormat(DisplayedVariant?.price)}
        </h6>
      </div>

      {/* Product Variants */}
      {/*  */}
      <div className="Variants flex flex-wrap items-center gap-4">
        {product?.variants?.map((variant) => (
          <Button
            size="sm"
            onClick={() => ChangeVariant(variant?.sku)}
            key={variant?.price}
            className={`cursor-pointer ${
              selectedSku === variant?.sku
                ? "bg-indigo-600 hover:bg-indigo-700 text-slate-100"
                : ""
            }`}
            variant={`${selectedSku === variant?.sku ? "default" : "outline"}`}
          >
            {`${variant?.ram}GB`}/{`${variant?.storage}GB`}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;

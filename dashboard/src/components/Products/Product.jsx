"use client";
import React, { useRef, useState } from "react";
import { NumberFormat } from "@/lib/NumberFormat";
import Image from "next/image";
import MoboButton from "../ui/MoboButton";
import { IconEdit, IconExchange } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
const Product = ({ product }) => {
  console.log("Product: ", product);
  const [price, setPrice] = useState(product?.variants[0]?.price);
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/images/products/${product?.image}`;
  const VariantsRef = useRef(null);
  const VariantRef = useRef(null);

  const HandleVarinat = (event, variant) => {
    // VariantRef.current?.setAttribute("variant", "destructive");
    setPrice(variant.price);
  };
  return (
    <div className="border p-4 rounded-lg  flex flex-col gap-4">
      {/* Product Card Image */}
      <div className="ImageContainer w-full h-[250px] rounded-lg overflow-hidden">
        <Image
          src={IMAGE_URL}
          alt={product?.name}
          width={250}
          height={250}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <div className="Product_Details flex flex-col gap-4">
        {/* Product Card Header */}
        <h1>{product?.name}</h1>
        <div className="flex justify-between items-center">
          <span>{product.isAvailable}</span>
          <span>{NumberFormat(price)}</span>
        </div>

        {/* Product Specsfications As Badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 my-2"
          ref={VariantsRef}
        >
          {product?.variants?.map((variant) => (
            <MoboButton
              key={variant?.color}
              ref={VariantRef}
              variant="outline"
              className="text-sm grow"
              onClick={(event) => HandleVarinat(event, variant)}
            >
              <span>
                {variant?.storage}GB / {variant?.ram}GB
              </span>
            </MoboButton>
          ))}
        </div>

        {/* Product Card Footer */}
        <div className="flex flex-col gap-2">
          <MoboButton size="sm" variant="outline" className="text-black">
            <IconExchange />
            <span>المقارنة مع منتج اخر</span>
          </MoboButton>
          <MoboButton size="sm">
            <Link
              href={`/dashboard/products/${product?._id}`}
              className="flex gap-2"
            >
              <IconEdit />
              <span>تفاصيل المنتج</span>
            </Link>
          </MoboButton>
        </div>
      </div>
    </div>
  );
};

export default Product;

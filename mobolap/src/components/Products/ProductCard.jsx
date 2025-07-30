import React from "react";
import { AddToCart, AddToCompare } from "./ProductButtons";
import Image from "next/image";
import img1 from "../../../public/images/honor-magic-v5.webp";
import img2 from "../../../public/images/honor400pro-2.webp";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="Product p-4 border rounded-lg" dir="ltr">
      <div className="image_container flex justify-center items-center relative h-[340px] overflow-hidden rounded-lg">
        <div className="relative w-[90%] h-[90%]">
          <Image
            src={product?.id % 2 == 0 ? img1 : img2}
            alt="product_image"
            fill
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="my-4">
        <Link
          href={`/products/${product?.id}`}
          className="text-xl font-medium text-pretty"
        >
          {product?.name}
        </Link>
        {/* Ram / Storage */}
        <div className="font-medium">
          {product?.specs?.ram}/{product?.specs?.storage}
        </div>
        {/* Price */}
        <div className="flex items-center justify-between font-semibold">
          <span className="line-through text-slate-500">{product?.price}</span>
          <span className="text-2xl">
            {product?.price - parseInt(product?.price * 0.2)}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:lg:grid-cols-2 gap-4">
        <AddToCompare />
        <AddToCart />
      </div>
    </div>
  );
};

export default ProductCard;

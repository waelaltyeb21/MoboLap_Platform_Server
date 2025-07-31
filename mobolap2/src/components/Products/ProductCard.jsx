import React from "react";
import { AddToCart, AddToCompare } from "./ProductButtons";
import Image from "next/image";
import img1 from "../../../public/images/honor-magic-v5.webp";
import img2 from "../../../public/images/honor400pro-2.webp";
import Link from "next/link";
import { NumberFormat } from "@/lib/NumberFormat";
import ProductVariants from "./ProductVariants";

const ProductCard = ({ product }) => {
  return (
    <div className="Product p-4 border rounded-lg" dir="ltr">
      <div className="image_container flex justify-center items-center relative h-[340px] overflow-hidden rounded-lg">
        <div className="relative w-[90%] h-[90%]">
          <Image
            src={product?.image}
            alt="product_image"
            fill
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="hidden my-4">
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
          <span className="line-through text-slate-500">
            {NumberFormat(product?.price)}
          </span>
          <span className="text-2xl">
            {NumberFormat(product?.price - parseInt(product?.price * 0.2))}
          </span>
        </div>
      </div>

      <div className="my-4">
        <Link
          href={`/products/${product?.id}`}
          className="text-xl font-medium text-pretty"
        >
          {product?.name}
        </Link>
        <ProductVariants product={product} />
      </div>

      <div className="w-full grid grid-cols-1 md:lg:grid-cols-2 gap-4">
        <AddToCompare product={product} />
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NumberFormat } from "@/lib/NumberFormat";
import CardDetails from "./CardDetails";

const ProductCard = ({ product }) => {
  return (
    <div className="Product p-4 border rounded-lg" dir="ltr">
      <div className="image_container flex justify-center items-center relative h-[340px] overflow-hidden rounded-lg">
        <div className="relative w-[90%] h-[90%]">
          <Image
            src={product?.image}
            alt="product_image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      {/* Card Details */}
      <CardDetails product={product} />
    </div>
  );
};

export default ProductCard;

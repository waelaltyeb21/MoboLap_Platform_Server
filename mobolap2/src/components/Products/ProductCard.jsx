import React from "react";
import Image from "next/image";
import CardDetails from "./CardDetails";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const ENV =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_SERVER_URL_DEV
      : process.env.NEXT_PUBLIC_SERVER_URL_PROD;
  const PRODUCT_IMAGE = `${ENV}/uploads/images/products/${product?.image}`;

  return (
    <div className="group p-4 border rounded-lg cursor-pointer" dir="ltr">
      <Link
        href={`/products/${product?._id}`}
        className="image_container flex justify-center items-center relative h-[340px] overflow-hidden rounded-lg"
      >
        <div className="relative w-[90%] h-[90%]">
          <Image
            src={PRODUCT_IMAGE}
            alt="product_image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-contain group-hover:scale-105 smooth-transition"
          />
        </div>
      </Link>

      {/* Card Details */}
      <CardDetails product={product} />
    </div>
  );
};

export default ProductCard;

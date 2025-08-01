import React from "react";
import Image from "next/image";
import CardDetails from "./CardDetails";

const ProductCard = ({ product }) => {
  return (
    <div className="group p-4 border rounded-lg cursor-pointer" dir="ltr">
      <div className="image_container flex justify-center items-center relative h-[340px] overflow-hidden rounded-lg">
        <div className="relative w-[90%] h-[90%]">
          <Image
            src={product?.image}
            alt="product_image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-contain group-hover:scale-105 smooth-transition"
          />
        </div>
      </div>

      {/* Card Details */}
      <CardDetails product={product} />
    </div>
  );
};

export default ProductCard;

import { NumberFormat } from "@/lib/NumberFormat";
import React from "react";

const ComparePrices = ({ product }) => {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-2">سعر ال{product?.name}</h1>
      <div className="flex flex-col gap-2">
        {product?.variants?.map((variant) => (
          <div key={variant?.sku}>
            <p>
              <span className="text-indigo-600 font-semibold text-lg">
                {NumberFormat(
                  variant?.price - variant?.price * product?.discount
                )}
              </span>{" "}
              لنسخة ال <span>{`${variant?.ram}GB/${variant?.storage}GB`}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePrices;

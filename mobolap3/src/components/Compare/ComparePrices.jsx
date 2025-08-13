import { NumberFormat } from "@/lib/NumberFormat";
import { useTranslations } from "next-intl";
import React from "react";

const ComparePrices = ({ product, t }) => {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-2">
        {t("productPrice")}
        {product?.name}
      </h1>
      <div className="flex flex-col gap-2">
        {product?.variants?.map((variant) => (
          <div key={variant?.sku}>
            <p>
              <span className="text-indigo-600 font-semibold text-lg">
                {NumberFormat(
                  variant?.price - variant?.price * product?.discount
                )}
              </span>{" "}
              {t("variantOf")}
              <span>{`${variant?.ram}GB/${variant?.storage}GB`}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePrices;

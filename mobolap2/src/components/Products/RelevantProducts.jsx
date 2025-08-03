import { Products } from "@/database/data";
import React from "react";
import ProductsList from "./ProductsList";
import { useTranslations } from "next-intl";

const RelevantProducts = ({ product }) => {
  const preview = useTranslations("Sections.Products.PreviewProducts");
  const products = Products?.filter(
    (prod) => prod?.brand === product?.brand && prod?.brand !== product?.brand
  );
  return (
    <article className="mt-20">
      <h1 className="text-2xl md:lg:text-4xl font-medium text-center">
        {preview("MainTitle")}
      </h1>
      {/* <ProductsList products={products} /> */}
    </article>
  );
};

export default RelevantProducts;

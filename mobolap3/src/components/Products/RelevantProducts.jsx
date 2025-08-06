import React from "react";
import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";

const RelevantProducts = ({ products }) => {
  const preview = useTranslations("Sections.Products.PreviewProducts");
  return (
    <article className="mt-20">
      <h1 className="text-2xl md:lg:text-4xl font-medium text-center">
        {preview("MainTitle")}
      </h1>
      <article className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </article>
    </article>
  );
};

export default RelevantProducts;

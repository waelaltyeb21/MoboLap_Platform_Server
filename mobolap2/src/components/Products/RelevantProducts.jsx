import { Products } from "@/database/data";
import React from "react";
import ProductsList from "./ProductsList";

const RelevantProducts = ({ product }) => {
  const products = Products?.filter(
    (prod) => prod?.brand === product?.brand && prod?.id !== product?.id
  );
  return (
    <article className="mt-20">
      <h1 className="text-2xl md:lg:text-4xl font-medium text-center">
        منتجات من نفس البراند
      </h1>
      <ProductsList products={products} />
    </article>
  );
};

export default RelevantProducts;

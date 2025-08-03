import React from "react";
import ProductCard from "./ProductCard";

const ProductsList = ({ products }) => {
  return (
    <section className="my-10">
      <article className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </article>
      {products?.length === 0 && (
        <article className="min-h-[50dvh] flex justify-center items-center">
          <h1 className="text-xl font-medium">لا توجد منتجات متوفره حاليا</h1>
        </article>
      )}
    </section>
  );
};

export default ProductsList;

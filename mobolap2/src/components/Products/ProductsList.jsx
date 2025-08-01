import React from "react";
import ProductCard from "./ProductCard";
import { Products } from "@/database/data";

const ProductsList = () => {
  return (
    <section>
      {/* Heading */}
      {/* Products List */}
      <div className="mb-8">
        <h1 className="md:lg:text-right text-center text-3xl font-medium">
          منتجات سامسونج
        </h1>
      </div>
      <article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </article>
    </section>
  );
};

export default ProductsList;

import React from "react";
import ProductCard from "./ProductCard";

const ProductsList = ({ data }) => {
  return (
    <section className="my-10">
      {data?.map((d) => (
        <div key={d?._id} className="not-last:mb-20">
          <h1 className="text-2xl font-semibold mb-8 text-center">
            منتجات براند {d?._id}
          </h1>
          <article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {d?.products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </article>
        </div>
      ))}
      {/* {products?.length === 0 && (
        <article className="min-h-[50dvh] flex justify-center items-center">
          <h1 className="text-xl font-medium">لا توجد منتجات متوفره حاليا</h1>
        </article>
      )} */}
    </section>
  );
};

export default ProductsList;

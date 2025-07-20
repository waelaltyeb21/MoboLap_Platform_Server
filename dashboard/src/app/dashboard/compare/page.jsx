import React from "react";
import Heading from "@/components/Heading";
import GetData from "@/lib/GetData";
import CompareList from "@/components/Compare/CompareList";
import SelectProduct from "@/components/Compare/SelectProduct";

const Compare = async ({ searchParams }) => {
  const data = await GetData("/products");

  // Get Products IDs From URL
  const { product1, product2 } = await searchParams;
  const selectedProducts = [];

  if (product1) selectedProducts.push(product1);
  if (product2) selectedProducts.push(product2);

  console.log("Product1: ", product1, "Product2: ", product2);
  return (
    <section>
      <Heading title="مقارنة المنتجات" />

      <article className="min-w-full flex items-center gap-6 my-8">
        <SelectProduct products={data?.products} productKey="product1" />
        <SelectProduct products={data?.products} productKey="product2" />
      </article>

      <CompareList
        products={data?.products}
        selectedProducts={selectedProducts}
      />
    </section>
  );
};

export default Compare;

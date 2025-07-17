import ProductList from "@/components/Products/ProductList";
import GetData from "@/lib/GetData";
import React from "react";

const Products = async () => {
  const products = await GetData("/products");
  return (
    <section>
      <ProductList products={products} />
    </section>
  );
};

export default Products;

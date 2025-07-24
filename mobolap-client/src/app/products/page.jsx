import React from "react";
import GetData from "@/lib/GetData";

const Products = async () => {
  const { products } = await GetData("/products");
  return (
    <section>
      <h1>صفحة المنتجات</h1>
    </section>
  );
};

export default Products;

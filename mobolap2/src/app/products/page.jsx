import React from "react";
import ProductsList from "@/components/Products/ProductsList";
import GetData from "@/lib/GetData";

export default async function ProductsPage() {
  const data = await GetData("/products/brands");
  console.log("products: ", data);
  return (
    <section className="Products">
      <ProductsList
        data={data?.data}
        categories={data?.categories}
        brands={data?.brands}
      />
    </section>
  );
}

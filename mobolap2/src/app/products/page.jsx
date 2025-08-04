import React from "react";
import ProductsList from "@/components/Products/ProductsList";
import GetData from "@/lib/GetData";
import ProductsFilters from "@/components/Products/ProductsFilters";

export default async function ProductsPage({ searchParams }) {
  const { name = "" } = await searchParams;
  console.log(name);
  const data = await GetData(`/products/brands?name=${name}`);
  console.log("products: ", data);
  return (
    <section className="Products">
      {/* <ProductsFilters /> */}
      <ProductsList
        data={data?.data}
        categories={data?.categories}
        brands={data?.brands}
      />
    </section>
  );
}

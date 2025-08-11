import React from "react";
import ProductsList from "@/components/Products/ProductsList";
import GetData from "@/lib/GetData";
import ProductsFilters from "@/components/Products/ProductsFilters";

export default async function ProductsPage({ searchParams }) {
  const { search = "", category = "", brand = "" } = await searchParams;
  const data = await GetData(
    `/products/categories?category=${category}&search=${search}&brand=${brand}`
  );
  console.log(data);
  return (
    <section className="Products">
      <ProductsFilters
        data={data?.data}
        categories={data?.categories}
        brands={data?.brands}
      />
      <ProductsList
        data={data?.data}
        categories={data?.categories}
        brands={data?.brands}
      />
    </section>
  );
}

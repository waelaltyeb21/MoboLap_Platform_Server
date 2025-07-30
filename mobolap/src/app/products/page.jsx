import AchivementsSection from "@/components/blocks/AchivementsSection";
import ProductsFilters from "@/components/Products/ProductsFilters";
import ProductsList from "@/components/Products/ProductsList";
import React from "react";

export default function Products() {
  return (
    <section className="Products">
      <h1 className="text-xl text-center font-medium my-16">
        صفحة منتجات المتجر
      </h1>

      {/* <ProductsFilters /> */}
      <ProductsList />
    </section>
  );
}

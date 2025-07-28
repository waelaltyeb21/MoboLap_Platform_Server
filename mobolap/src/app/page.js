import React from "react";
import ProductsCarousel from "@/components/ProductsCarousel";
import StoreFeatures from "@/components/blocks/StoreFeatures";
import StoreCategories from "@/components/blocks/StoreCategories";

export default function Home() {
  return (
    <section>
      <ProductsCarousel />
      <StoreFeatures />
      <StoreCategories />
    </section>
  );
}

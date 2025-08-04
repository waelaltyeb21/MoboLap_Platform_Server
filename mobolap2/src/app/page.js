import React from "react";
import ProductsCarousel from "@/components/Products/ProductsCarousel";
import StoreFeatures from "@/components/blocks/StoreFeatures";
import StoreCategories from "@/components/blocks/StoreCategories";
import HeroSection from "@/components/blocks/HeroSection";
import GetData from "@/lib/GetData";

export default async function Home() {
  const categories = await GetData("/categories");
  console.log("categories: ", categories);
  return (
    <section>
      <HeroSection />
      <ProductsCarousel />
      <StoreFeatures />
      <StoreCategories categories={categories} />
    </section>
  );
}

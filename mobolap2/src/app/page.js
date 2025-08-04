import React from "react";
import ProductsCarousel from "@/components/Products/ProductsCarousel";
import StoreFeatures from "@/components/blocks/StoreFeatures";
import StoreCategories from "@/components/blocks/StoreCategories";
import HeroSection from "@/components/blocks/HeroSection";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <ProductsCarousel />
      <StoreFeatures />
      <StoreCategories />
    </section>
  );
}

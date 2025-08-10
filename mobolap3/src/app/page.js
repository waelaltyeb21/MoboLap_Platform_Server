import React from "react";
import ProductsCarousel from "@/components/Products/ProductsCarousel";
import StoreFeatures from "@/components/blocks/StoreFeatures";
import StoreCategories from "@/components/blocks/StoreCategories";
import HeroSection from "@/components/blocks/HeroSection";
import GetData from "@/lib/GetData";
import HowItWorks from "@/components/blocks/HowItWorks";
import FAQ from "@/components/blocks/FAQ";

export default async function Home() {
  const categories = await GetData("/categories");
  return (
    <section>
      <HeroSection />
      <StoreFeatures />
      <ProductsCarousel />
      <HowItWorks />
      <StoreCategories categories={categories} />
      <FAQ />
    </section>
  );
}

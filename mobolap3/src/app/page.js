import React from "react";
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
      <StoreCategories categories={categories} />
      <HowItWorks />
      <FAQ />
    </section>
  );
}

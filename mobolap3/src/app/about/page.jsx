import React from "react";
import FAQ from "@/components/blocks/FAQ";
import HowItWorks from "@/components/blocks/HowItWorks";
import StoreFeatures from "@/components/blocks/StoreFeatures";

const AboutStore = () => {
  return (
    <section>
      <StoreFeatures />
      <HowItWorks />
      <FAQ />
    </section>
  );
};

export default AboutStore;

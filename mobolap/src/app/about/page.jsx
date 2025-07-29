import FAQ from "@/components/blocks/FAQ";
import HowItWorks from "@/components/blocks/HowItWorks";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ModeSwitcher from "@/components/ModeSwitcher";
import React from "react";

const AboutStore = () => {
  return (
    <section>
      <HowItWorks />
      <FAQ />
    </section>
  );
};

export default AboutStore;

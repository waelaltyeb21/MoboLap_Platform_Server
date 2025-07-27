import LanguageSwitcher from "@/components/LanguageSwitcher";
import ModeSwitcher from "@/components/ModeSwitcher";
import React from "react";

const AboutStore = () => {
  return (
    <section className="min-h-[50dvh] flex justify-center items-center gap-6">
      <ModeSwitcher />
      <LanguageSwitcher />
    </section>
  );
};

export default AboutStore;

import React from "react";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { getLocale } from "next-intl/server";

const ModeSwitcher = async () => {
  const locale = await getLocale();
  return (
    <article className="Mode_Switcher">
      <ThemeToggleButton
        showLabel
        variant="circle-blur"
        start={locale === "ar" ? "top-left" : "top-right"}
      />
    </article>
  );
};

export default ModeSwitcher;

import React from "react";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { getCookie } from "cookies-next";

const ModeSwitcher = () => {
  const locale = getCookie("NEXT_LOCALE");
  return (
    <article className="Mode_Switcher">
      <ThemeToggleButton
        showLabel
        variant="circle"
        start={locale === "ar" ? "top-left" : "top-right"}
      />
    </article>
  );
};

export default ModeSwitcher;

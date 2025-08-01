import React from "react";
import ModeSwitcher from "../ModeSwitcher";

const FixedModeButton = ({ locale }) => {
  return (
    <div
      className={`sm:hidden fixed z-[999] bottom-4 ${
        locale === "ar" ? "right-8" : "left-8"
      }`}
    >
      <div className="w-10 h-10 rounded-full border-2 bg-background flex items-center justify-center">
        <ModeSwitcher />
      </div>
    </div>
  );
};

export default FixedModeButton;

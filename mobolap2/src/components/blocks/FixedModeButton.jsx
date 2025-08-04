import React from "react";
import ModeSwitcher from "../ModeSwitcher";

const FixedModeButton = ({ locale }) => {
  return (
    <div
      className={`sm:hidden fixed z-[999] bottom-4 ${
        locale === "ar" ? "left-8" : "right-8"
      }`}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 bg-background flex items-center justify-center">
        <ModeSwitcher />
      </div>
    </div>
  );
};

export default FixedModeButton;

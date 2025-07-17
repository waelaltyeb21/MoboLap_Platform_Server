import React from "react";
import { ModeSwithcer } from "./ThemeColorSwitcher";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-lg font-bold">لوحة تحكم موبو لاب</h1>
      <ModeSwithcer />
    </header>
  );
};

export default Header;

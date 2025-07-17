import React from "react";
import { ModeSwithcer } from "./ThemeColorSwitcher";

const Header = () => {
  return (
    <header className="border-b-[1px] text-foreground p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">لوحة تحكم موبو لاب</h1>
      <ModeSwithcer />
    </header>
  );
};

export default Header;

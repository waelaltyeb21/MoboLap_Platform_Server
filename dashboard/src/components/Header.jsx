import React from "react";
import { ModeSwithcer } from "./ThemeColorSwitcher";
import MenuBar from "./MenuBar";
import { IconExchange } from "@tabler/icons-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between border-b-[1px] bg-background text-foreground p-4">
      <div className="flex items-center gap-4">
        <div className="sm:hidden z-5">
          <MenuBar />
        </div>
        <h1 className="text-xl font-bold">لوحة تحكم موبو لاب</h1>
      </div>
      <article className="flex items-center gap-4">
        <Link
          href={"/dashboard/compare"}
          className="flex items-center gap-2 border border-border cursor-pointer rounded-lg py-2 px-4"
        >
          <IconExchange size={20} />
          <span className="text-sm font-semibold">المقارنة</span>
        </Link>
        <ModeSwithcer />
      </article>
    </header>
  );
};

export default Header;

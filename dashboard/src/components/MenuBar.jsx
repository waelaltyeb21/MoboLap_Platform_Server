import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconMenuDeep } from "@tabler/icons-react";
import { Links } from "./Sidebar";
import Link from "next/link";

const MenuBar = () => {
  return (
    <Sheet dir="rtl">
      <SheetTrigger className="flex justify-end">
        <IconMenuDeep />
      </SheetTrigger>
      <SheetContent dir="rtl">
        <SheetHeader>
          <SheetTitle>MoboLap Store</SheetTitle>
          <SheetDescription className="mt-10">
            {Links?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-4 p-2 mb-4 text-lg text-white bg-primary/90 dark:bg-primary/60 rounded"
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuBar;

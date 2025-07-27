import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Tabs from "./blocks/Tabs";


const Links = [
  {
    title: "المنتجات",
    href: "/products",
    // icon: <IconDevices size={20} />,
  },
  {
    title: "عن المتجر",
    href: "/about",
    // icon: <IconBuildingStore size={20} />,
  },
  {
    title: "مقارنة المنتجات",
    href: "/offers",
    // icon: <IconTicketOff size={20} />,
  },
];

const NavBarLargeScreens = () => {
  return (
    <nav className="hidden sm:grid px-32 grid-cols-12 py-4">
      <div className="col-span-3">
        <Link href="/" className="text-lg font-medium">
          موبولاب استور
        </Link>
      </div>

      <div className="col-span-6">
        <ul className="links flex items-center justify-center gap-6">
          {Links?.map((link) => (
            <li
              key={link?.title}
              className="flex items-center gap-1 font-medium hover:text-indigo-500 hover:underline decoration-wavy underline-offset-8"
            >
              {/* {link?.icon} */}
              <Link href={link?.href}>{link?.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="col-span-3 flex justify-end gap-4">
        <Button className="cursor-pointer">
          <Link href={`/cart`} className="size-full">
            سلة الطلبات
          </Link>
        </Button>
      </ul>
    </nav>
  );
};

const MoboHeader = () => {
  return (
    <header className="border-b border-slate-200">
      <NavBarLargeScreens />
      <Tabs />
    </header>
  );
};

export default MoboHeader;

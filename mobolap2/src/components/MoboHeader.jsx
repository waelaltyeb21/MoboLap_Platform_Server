import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Tabs from "./blocks/Tabs";
import {
  GitCompareArrows,
  MonitorSmartphone,
  ShoppingBag,
  Store,
} from "lucide-react";
import ModeSwitcher from "./ModeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { ScrollProgress } from "./magicui/scroll-progress";

const Links = [
  {
    title: "products",
    href: "/products",
    icon: <MonitorSmartphone />,
  },
  {
    title: "about",
    href: "/about",
    icon: <Store />,
  },
  {
    title: "compare",
    href: "/compare",
    icon: <GitCompareArrows />,
  },
];

const NavBarLargeScreens = ({ t }) => {
  return (
    <nav className="hidden lg:block relative">
      <div className="grid px-32 grid-cols-12 py-4">
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
                {link?.icon}
                <Link href={link?.href}>{t(link?.title)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="col-span-3 flex items-center justify-end gap-4">
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <ModeSwitcher />
          </li>
          <li>
            <Button className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-slate-100">
              <Link
                href={`/cart`}
                className="size-full capitalize font-medium flex items-center gap-2"
              >
                <ShoppingBag />
                {t("cart")}
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const MoboHeader = () => {
  const t = useTranslations("Header.Links");
  return (
    <header className="w-full fixed top-0 z-[999] bg-background border-b capitalize">
      <ScrollProgress />
      <NavBarLargeScreens t={t} />
      <Tabs />
    </header>
  );
};

export default MoboHeader;

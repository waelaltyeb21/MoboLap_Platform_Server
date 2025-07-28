"use client";
import React from "react";
import {
  Home,
  ShoppingBag,
  GitCompareArrows,
  Store,
  MonitorSmartphone,
} from "lucide-react";
import { ExpandedTabs } from "../ui/expanded-tabs";
import { useTranslations } from "next-intl";

const tabs = [
  { title: "home", icon: Home, href: "/" },
  { title: "about", icon: Store, href: "/about" },
  { type: "separator" },
  { title: "products", icon: MonitorSmartphone, href: "/products" },
  { title: "compare", icon: GitCompareArrows, href: "/compare" },
  { title: "cart", icon: ShoppingBag, href: "/cart" },
];

const Tabs = () => {
  const t = useTranslations("Header.Links");
  return (
    <article className="sm:hidden relative flex justify-center items-center">
      <div className="w-[80%] fixed top-2 z-[9999]">
        <ExpandedTabs tabs={tabs} t={t} activeColor="text-rose-600" />
      </div>
    </article>
  );
};

export default Tabs;

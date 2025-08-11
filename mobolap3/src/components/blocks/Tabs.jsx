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
  // { type: "separator" },
  { title: "products", icon: MonitorSmartphone, href: "/products" },
  { title: "compare", icon: GitCompareArrows, href: "/compare" },
  { title: "cart", icon: ShoppingBag, href: "/cart" },
];

const Tabs = () => {
  const t = useTranslations("Header.Links");
  return (
    <article className="relative flex justify-center items-center">
      <div className="w-[80%]">
        <ExpandedTabs tabs={tabs} t={t} />
      </div>
    </article>
  );
};

export default Tabs;

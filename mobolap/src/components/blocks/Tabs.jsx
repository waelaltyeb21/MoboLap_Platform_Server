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

const tabs = [
  { title: "الصفحة الرئيسية", icon: Home, href: "/" },
  { title: "عن المتجر", icon: Store, href: "/about" },
  { type: "separator" },
  { title: "المنتجات", icon: MonitorSmartphone, href: "/products" },
  { title: "المقارنة", icon: GitCompareArrows, href: "/compare" },
  { title: "سلة الطلبات", icon: ShoppingBag, href: "/cart" },
];

const Tabs = () => {
  return (
    <article className="sm:hidden relative flex justify-center items-center">
      <div className="w-[80%] fixed bottom-2">
        <ExpandedTabs tabs={tabs}  activeColor="text-rose-600"/>
      </div>
    </article>
  );
};

export default Tabs;

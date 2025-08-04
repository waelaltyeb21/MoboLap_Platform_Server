import {
  IconCategory,
  IconDevices,
  IconHome,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export const Links = [
  {
    title: "الرئيسية",
    href: "/dashboard",
    icon: <IconHome />,
  },
  {
    title: "المنتجات",
    href: "/dashboard/products",
    icon: <IconDevices />,
  },
  {
    title: "الفئات",
    href: "/dashboard/categories",
    icon: <IconCategory />,
  },
  {
    title: "الموردين",
    href: "/dashboard/suppliers",
    icon: <IconUsers />,
  },
  {
    title: "الإعدادات",
    href: "/dashboard/settings",
    icon: <IconSettings />,
  },
];

const Sidebar = () => {
  return (
    <aside>
      <h1 className="text-center">MoboLap Store</h1>
      <nav className="flex flex-col mt-20">
        {Links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center p-2 space-x-2 mb-4 text-lg text-white bg-primary/90 dark:bg-primary/60 rounded"
          >
            <span>{link.icon}</span>
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

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
    <aside className="hidden lg:block fixed inset-y-0 right-0 z-50 w-64 border-l-2 p-6">
      <h1 className="text-center mb-8">موبولاب</h1>
      <nav className="flex flex-col gap-4 px-4">
        {Links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center space-x-2 p-2 text-lg text-foreground hover:bg-primary hover:text-background transition-all ease-in-out duration-100 rounded"
          >
            {/* <span>{link.icon}</span> */}
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

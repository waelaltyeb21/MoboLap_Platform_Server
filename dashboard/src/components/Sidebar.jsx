import {
  IconCategory,
  IconDevices,
  IconHome,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import {
  HouseIcon,
  LayoutGrid,
  Settings2Icon,
  TabletSmartphone,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export const Links = [
  {
    name: "الرئيسية",
    href: "/dashboard",
    icon: <IconHome />,
  },
  {
    name: "المنتجات",
    href: "/dashboard/products",
    icon: <IconDevices />,
  },
  {
    name: "الفئات",
    href: "/dashboard/categories",
    icon: <IconCategory />,
  },
  {
    name: "الموردين",
    href: "/dashboard/suppliers",
    icon: <IconUsers />,
  },
  {
    name: "الإعدادات",
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
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

import React from "react";

export const Links = [
  {
    name: "الرئيسية",
    href: "/dashboard",
    icon: "home",
  },
  {
    name: "المنتجات",
    href: "/dashboard/products",
    icon: "users",
  },
  {
    name: "الفئات",
    href: "/dashboard/categories",
    icon: "users",
  },
  {
    name: "الموردين",
    href: "/dashboard/suppliers",
    icon: "users",
  },
  {
    name: "الإعدادات",
    href: "/dashboard/settings",
    icon: "settings",
  },
];

const Sidebar = () => {
  return (
    <aside>
      <h1>MoboLap Store</h1>
      <nav className="flex flex-col space-y-4 text-body">
        {Links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center space-x-2 text-foreground hover:text-gray-900"
          >
            <i className={`icon-${link.icon}`}></i>
            <span>{link.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

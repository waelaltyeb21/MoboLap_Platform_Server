"use client";
import React from "react";
import { Burger, Button, Drawer } from "@mantine/core";
import {
  IconBuildingStore,
  IconDevices,
  IconExchange,
  IconShoppingBagEdit,
  IconTicketOff,
} from "@tabler/icons-react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

const Links = [
  {
    title: "المنتجات",
    href: "/products",
    icon: <IconDevices size={20} />,
  },
  {
    title: "عن المتجر",
    href: "/about",
    icon: <IconBuildingStore size={20} />,
  },
  {
    title: "العروض",
    href: "/offers",
    icon: <IconTicketOff size={20} />,
  },
];

const NavBarLargeScreens = () => {
  return (
    <nav className="hidden sm:grid px-32 grid-cols-12 py-4 borderb border-b-slate-300">
      <div className="col-span-3">
        <Link href="/">موبولاب استور</Link>
      </div>

      <div className="col-span-6">
        <ul className="links flex items-center justify-center gap-6">
          {Links?.map((link) => (
            <li
              key={link?.title}
              className="flex items-center gap-1 hover:text-blue-500 hover:underline underline-offset-8"
            >
              {link?.icon}
              <Link href={link?.href}>{link?.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="col-span-3 flex justify-end gap-4">
        <Button component={Link} href={`/compare`} variant="light">
          <IconExchange />
          <span>المقارنة بين المنتجات</span>
        </Button>
        <Button component={Link} href={`/cart`}>
          <IconShoppingBagEdit />
          <span>سلة الطلبات</span>
        </Button>
      </ul>
    </nav>
  );
};

const Menu = ({ opened, close }) => {
  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="MoboLap Store"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    ></Drawer>
  );
};

const NavBarSmallScreens = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <nav className="flex items-center justify-between sm:hidden borderb border-b-slate-300 py-4 px-4">
      <div className="flex gap-2">
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
        />
        <Link href="/" className="text-2xl">
          موبولاب استور
        </Link>
      </div>

      <Menu opened={opened} close={toggle} />

      <ul className="col-span-3 flex items-center gap-4">
        <IconExchange />
        <IconShoppingBagEdit />
      </ul>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="w-full fixed z-50 bg-white border-b border-slate-300">
      <NavBarLargeScreens />
      <NavBarSmallScreens />
    </header>
  );
};

export default Header;

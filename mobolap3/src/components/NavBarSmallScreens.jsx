"use client";
import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import ModeSwitcher from "./ModeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import useClickAway from "@/hooks/useClickAway";
import { usePathname } from "next/navigation";
import { CartContext } from "@/contexts/CartContext";

const NavBarSmallScreens = ({ Links, locale }) => {
  const t = useTranslations("Header");
  const { cartProducts } = useContext(CartContext);
  const [ShowMenu, setShowMenu] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    if (ShowMenu) setShowMenu(false);
  });

  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <nav className="lg:hidden relative w-full" ref={ref}>
      <div
        className={`flex ${
          locale === "ar" ? "flex-row" : "flex-row-reverse"
        } justify-between items-center py-4 px-8`}
      >
        <div className="flex items-center gap-8">
          <Link
            href={`/cart`}
            className="size-full capitalize font-medium flex items-center gap-2"
          >
            <div className="relative inline-flex">
              <ShoppingBag size={20} />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {cartProducts.length > 9 ? "9+" : cartProducts.length}
                </span>
              )}
            </div>
          </Link>
          <div className="cursor-pointer">
            {ShowMenu ? (
              <X onClick={() => setShowMenu((prev) => !prev)} />
            ) : (
              <Menu onClick={() => setShowMenu((prev) => !prev)} />
            )}
          </div>
        </div>
        <h1 className="text-xl font-medium">
          <Link href="/">{t("TextLogo")}</Link>
        </h1>
      </div>

      {/* Float Menu */}
      <div
        className={`sticky top-24 w-full ${
          ShowMenu
            ? "max-h-[300px] opacity-100 py-4 px-8 border-b"
            : "max-h-0 opacity-0 pointer-events-none"
        } bg-background transition-all`}
      >
        <ul className="flex flex-col gap-4">
          {Links?.map((link) => (
            <li key={link.title}>
              <Link href={link?.href} className="flex items-center gap-2">
                {link?.icon}
                <span>{t(`Links.${link?.title}`)}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingBag />
              <span>{t(`Links.cart`)}</span>
            </Link>
          </li>
        </ul>

        <div className="mt-8 pt-4 border-t flex items-center justify-center gap-8">
          <ModeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavBarSmallScreens;

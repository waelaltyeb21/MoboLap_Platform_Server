import React from "react";
import ModeSwitcher from "../ModeSwitcher";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sm:py-4 sm:px-32 border-b">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl">
          <Link href="/">MoboLap</Link>
        </h1>
        <div className="links">
          <ul className="flex items-center gap-4">
            <li>
              <Link href={`/products`}>المنتجات</Link>
            </li>
            <li>
              <Link href={`/about`}>عن المتجر</Link>
            </li>
            <li>
              <Link href={`/cart`}>سلة الطلبات</Link>
            </li>
            <li>
              <Link href={`/compare`}>المقارنة</Link>
            </li>
          </ul>
        </div>
        <ModeSwitcher />
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import mobileCategory from "../../../public/images/ASUS ROG Zephyrus G16.jpg";
import laptopCategory from "../../../public/images/S25-Ultra.webp";
import Link from "next/link";
import { Button } from "../ui/button";
import { MagicCard } from "../magicui/magic-card";

const categories = [
  {
    id: 1,
    title: "Mobiles",
    image: mobileCategory,
    content: "",
    href: "/products?category=mobiles",
  },
  {
    id: 2,
    title: "Laptops",
    image: laptopCategory,
    content: "",
    href: "/products?category=laptops",
  },
];

const StoreCategories = () => {
  return (
    <section className="Store_Categories lg:grid grid-cols-2 gap-6">
      {categories?.map((category) => (
        <MagicCard
          key={category?.id}
          className="relative rounded-lg overflow-hidden p-1"
        >
          <div
            className="min-h-[300px] flex justify-center items-center rounded-lg before:absolute before:size-full before:bg-slate-900/50 smooth-transition"
            style={{
              backgroundImage: `url(${category?.image?.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-center z-50">
              <h1 className="text-2xl font-medium text-slate-100">
                {category?.title}
              </h1>
              <Button variant="outline">
                <Link href={category?.href}>عرض المنتجات</Link>
              </Button>
            </div>
          </div>
        </MagicCard>
      ))}
    </section>
  );
};

export default StoreCategories;

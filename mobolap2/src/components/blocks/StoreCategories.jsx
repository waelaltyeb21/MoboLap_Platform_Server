import React from "react";
import laptopCategory from "../../../public/images/laptops.jpg";
import mobileCategory from "../../../public/images/mobiles.avif";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const categories = [
  {
    id: 1,
    title: "mobiles",
    image: mobileCategory,
    content: "",
    href: "/products?category=mobiles",
  },
  {
    id: 2,
    title: "laptops",
    image: laptopCategory,
    content: "",
    href: "/products?category=laptops",
  },
];

const StoreCategories = () => {
  const t = useTranslations("Sections.Categories");
  return (
    <section className="grid lg:grid-cols-2 gap-4 mt-20">
      {categories?.map((category) => (
        <div
          key={category?.title}
          className="relative rounded-lg overflow-hidden"
        >
          <div
            className="min-h-[300px] flex justify-center items-center rounded-lg before:absolute before:size-full before:bg-slate-900/25 smooth-transition"
            style={{
              backgroundImage: `url(${category?.image?.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-center z-50">
              <h1 className="text-2xl font-medium text-slate-100">
                {t(category?.title)}
              </h1>
              <Button className="bg-slate-100 text-slate-900">
                <Link href={category?.href}>{t("callToAction")}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StoreCategories;

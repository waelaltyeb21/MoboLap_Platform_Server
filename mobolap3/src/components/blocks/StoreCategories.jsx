import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const StoreCategories = ({ categories }) => {
  const t = useTranslations("Sections.Categories");
  const ENV =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_SERVER_URL_DEV
      : process.env.NEXT_PUBLIC_SERVER_URL_PROD;
  const CATEGORY_URL = `${ENV}/uploads/categories`;

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-40">
      {categories?.map((category) => (
        <div
          key={category?.name}
          className="relative rounded-lg overflow-hidden"
        >
          <div
            className="min-h-[300px] flex justify-center items-center rounded-lg before:absolute before:size-full before:bg-slate-900/25 smooth-transition"
            style={{
              backgroundImage: `url(${CATEGORY_URL}/${category?.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-center z-50">
              <h1 className="text-2xl font-medium text-slate-100">
                {t(category?.name)}
              </h1>
              <Button className="bg-slate-100 hover:bg-slate-200 text-slate-900">
                <Link href={`/products/categories/${category?._id}`}>
                  {t("callToAction")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StoreCategories;

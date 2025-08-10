import CompareList from "@/components/Compare/CompareList";
import GetData from "@/lib/GetData";
import { getLocale } from "next-intl/server";
import React from "react";

export default async function Compare() {
  const locale = (await getLocale()) || "ar";
  const data = await GetData("/products/brands");
  console.log("Products: ", data);
  return (
    <section>
      <h1 className="text-center text-2xl font-semibold my-10">مقارنة المنتجات</h1>
      <CompareList locale={locale} products={data} />
    </section>
  );
}

import CompareList from "@/components/Compare/CompareList";
import GetData from "@/lib/GetData";
import { getLocale } from "next-intl/server";
import React from "react";

export default async function Compare() {
  const locale = (await getLocale()) || "ar";
  const data = await GetData(`/products`);
  return (
    <section>
      <CompareList locale={locale} data={data.products} />
    </section>
  );
}

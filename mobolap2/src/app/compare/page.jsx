import CompareList from "@/components/Compare/CompareList";
import { getLocale } from "next-intl/server";
import React from "react";

export default async function Compare() {
  const locale = (await getLocale()) || "ar";
  return (
    <section>
      <CompareList locale={locale} />
    </section>
  );
}

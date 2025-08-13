"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@reactuses/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useTranslations } from "use-intl";

const ProductsFilters = ({ categories, brands }) => {
  const t = useTranslations("Sections.Products.ProductsFilters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // Only update the URL if the debounced search term changes
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    // Update the URL without scrolling to top
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  }, [debouncedSearch, searchParams]);

  const HandleRouter = (Param, val) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(Param, val);
    router.push(`${pathname}?${params.toString()}`, {
      scroll: true,
    });
  };

  return (
    <div className="w-full grid grid-cols-12 gap-3">
      <div className="col-span-12 lg:col-span-8">
        <Label htmlFor="Search" className="text-lg font-semibold mb-2">
          {t("search")}
        </Label>
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          className="w-full"
          id="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full col-span-12 lg:col-span-4 grid grid-cols-2 items-center gap-4">
        <div className="*:w-full">
          <Label className="text-lg font-semibold mb-2">{t("brand")}</Label>
          <Select
            dir="rtl"
            defaultValue={searchParams.get("brand") || "all"}
            onValueChange={(val) => HandleRouter("brand", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("brand")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              {brands?.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="*:w-full">
          <Label htmlFor="category" className="text-lg font-semibold mb-2">
            {t("category")}
          </Label>
          <Select
            id="category"
            dir="rtl"
            defaultValue={searchParams.get("category") || "all"}
            onValueChange={(val) => HandleRouter("category", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category?._id} value={category?._id}>
                  {category?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;

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

const SelectRefactory = (items, val, HandleRouter) => {
  return (
    <Select dir="rtl" onValueChange={(val) => {}}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="انواع المنتجات" />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((category) => (
          <SelectItem key={category?._id} value={category?._id}>
            {category?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ProductsFilters = ({ categories, brands }) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
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
      <div className="col-span-8">
        <h2 className="text-lg font-semibold mb-2">البحث عن المنتجات</h2>
        <Input
          type="text"
          placeholder="اكتب للبحث عن منتج..."
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full col-span-4 grid grid-cols-2 items-center gap-4">
        <div className="*:w-full">
          <h2 className="text-lg font-semibold mb-2">العلامات التجارية</h2>
          <Select
            dir="rtl"
            defaultValue={searchParams.get("brand") || "all"}
            onValueChange={(val) => HandleRouter("brand", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="العلامة التجارية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              {brands?.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="*:w-full">
          <h2 className="text-lg font-semibold mb-2">انواع المنتجات</h2>
          <Select
            dir="rtl"
            defaultValue={searchParams.get("category") || "all"}
            onValueChange={(val) => HandleRouter("category", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="انواع المنتجات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category?._id} value={category?._id}>
                  {category?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <Button className="self-end" onClick={() => router.push("/products")}>
          حذف الفلتره
        </Button> */}
      </div>
    </div>
  );
};

export default ProductsFilters;

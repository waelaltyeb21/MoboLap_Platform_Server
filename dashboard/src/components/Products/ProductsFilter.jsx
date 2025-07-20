"use client";
import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import MoboButton from "../ui/MoboButton";

const ProductsFilter = ({ categories, brands, queries }) => {
  const router = useRouter();

  const HandleFilter = (formData) => {
    const ram = formData?.get("ram") || "";
    const storage = formData?.get("storage") || "";
    const brand = formData?.get("brand") || "";
    const category = formData?.get("category") || "";
    const sort = formData?.get("sort") || "";
    return router.push(
      `/dashboard/products?category=${category}&brand=${brand}&ram=${ram}&storage=${storage}&sort=${sort}`
    );
  };
  return (
    <article>
      <form
        action={HandleFilter}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
      >
        <div>
          <Label className="mb-2 font-semibold">البراند</Label>
          <Select dir="rtl" name="brand" defaultValue={queries?.brand}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب البراند" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="الكل">الكل</SelectItem>
              {brands?.map((brand) => (
                <SelectItem value={brand} key={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">نوع المنتجات</Label>
          <Select dir="rtl" name="category" defaultValue={queries?.category}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب نوع المنتجات" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="الكل">الكل</SelectItem>
              {categories?.map((category) => (
                <SelectItem value={category?._id} key={category._id}>
                  {category?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">حجم الرامات</Label>
          <Select dir="rtl" name="ram" defaultValue={queries?.ram}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب حالة حجم الرامات" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="الكل">الكل</SelectItem>
              <SelectItem value="8 GB">8 GB</SelectItem>
              <SelectItem value="16 GB">16 GB</SelectItem>
              <SelectItem value="32 GB">32 GB</SelectItem>
              <SelectItem value="64 GB">64 GB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">حجم الذاكرة</Label>
          <Select dir="rtl" name="storage" defaultValue={queries?.storage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب حجم الذاكرة" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="الكل">الكل</SelectItem>

              <SelectItem value="128 GB">128 GB</SelectItem>
              <SelectItem value="256 GB">256 GB</SelectItem>
              <SelectItem value="512 GB">512 GB</SelectItem>
              <SelectItem value="1 TB">1 TB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">تاريخ الانضمام</Label>
          <Select dir="rtl" name="sort" defaultValue={queries?.sort}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب تاريخ الانضمام" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="1">من الاحدث</SelectItem>
              <SelectItem value="-1">من الاقدم</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full self-end">
          <MoboButton type="submit" className="w-full">
            فلترة
          </MoboButton>
        </div>
      </form>
    </article>
  );
};

export default ProductsFilter;

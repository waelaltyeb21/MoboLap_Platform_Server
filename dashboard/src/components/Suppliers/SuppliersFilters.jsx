"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import MoboButton from "../ui/MoboButton";

const SuppliersFilters = ({ categories, cities, quiries }) => {
  const router = useRouter();

  const HandleFilter = (formData) => {
    const city = formData?.get("city") || "";
    const category = formData?.get("category") || "";
    const status = formData?.get("status") || "";
    const sort = formData?.get("sort") || "";
    return router.push(
      `/dashboard/suppliers?city=${city}&category=${category}&status=${status}&sort=${sort}`
    );
  };
  return (
    <form action={HandleFilter}>
      <article className="grid grid-cols-5 gap-4 mb-8">
        <div>
          <Label className="mb-2 font-semibold">المدينة</Label>
          <Select dir="rtl" name="city" defaultValue={quiries?.city}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب المدينة" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="الكل">الكل</SelectItem>
              {cities?.map((city) => (
                <SelectItem value={city} key={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">نوع المنتجات</Label>
          <Select dir="rtl" name="category" defaultValue={quiries?.category}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب نوع المنتجات" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="الكل">الكل</SelectItem>
              {categories?.map((category) => (
                <SelectItem value={category._id} key={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">حالة المورد</Label>
          <Select dir="rtl" name="status" defaultValue={quiries?.status}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب حالة المورد" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="الكل">الكل</SelectItem>
              <SelectItem value="نشط">نشط</SelectItem>
              <SelectItem value="غير نشط">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">تاريخ الانضمام</Label>
          <Select dir="rtl" name="sort" defaultValue={quiries?.sort}>
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
      </article>
    </form>
  );
};

export default SuppliersFilters;

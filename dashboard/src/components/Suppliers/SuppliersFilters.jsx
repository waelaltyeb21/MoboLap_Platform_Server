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
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";

const SuppliersFilters = ({ categories }) => {
  const router = useRouter();
  async function HandleFilter(formData) {
    const city = formData?.get("city") || "";
    const category = formData?.get("category") || "";
    const status = formData?.get("status") || "";
    const sort = formData?.get("sort") || "";
    return router.push(
      `/dashboard/suppliers?city=${city}&category=${category}&status=${status}&sort=${sort}`
    );
  }
  return (
    <form action={HandleFilter}>
      <article className="grid grid-cols-5 gap-4 mb-8">
        <div>
          <Label className="mb-2 font-semibold">المدينة</Label>
          <Select dir="rtl" name="city">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب المدينة" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="portsudan">بورتسودان</SelectItem>
              <SelectItem value="omdurman">امدرمان</SelectItem>
              <SelectItem value="maddani">مدني</SelectItem>
              <SelectItem value="atbra">عطبرة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">نوع المنتجات</Label>
          <Select dir="rtl" name="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب نوع المنتجات" />
            </SelectTrigger>
            <SelectContent className="capitalize">
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
          <Select dir="rtl" name="status">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب حالة المورد" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="pendding">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 font-semibold">تاريخ الانضمام</Label>
          <Select dir="rtl" name="sort">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="فرز حسب تاريخ الانضمام" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="asc">من الاحدث</SelectItem>
              <SelectItem value="desc">من الاقدم</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full self-end">
          <Button type="submit" className="w-full">
            فلترة
          </Button>
        </div>
      </article>
    </form>
  );
};

export default SuppliersFilters;

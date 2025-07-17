import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ProductsFilter = ({ products }) => {
  return (
    <article className="grid grid-cols-5 gap-4 mb-8">
      <div>
        <Label className="mb-2 font-semibold">البراند</Label>
        <Select dir="rtl">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="فرز حسب البراند" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            <SelectItem value="brand1">ايفون</SelectItem>
            <SelectItem value="brand2">سامسونج</SelectItem>
            <SelectItem value="brand2">هونر</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2 font-semibold">نوع المنتجات</Label>
        <Select dir="rtl">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="فرز حسب نوع المنتجات" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            <SelectItem value="brand1">هواتف</SelectItem>
            <SelectItem value="brand2">لابتوبات</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2 font-semibold">حجم الرامات</Label>
        <Select dir="rtl">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="فرز حسب حالة حجم الرامات" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            <SelectItem value="brand1">8 GB</SelectItem>
            <SelectItem value="brand2">16 GB</SelectItem>
            <SelectItem value="brand3">32 GB</SelectItem>
            <SelectItem value="brand4">64 GB</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2 font-semibold">حجم الذاكرة</Label>
        <Select dir="rtl">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="فرز حسب حجم الذاكرة" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            <SelectItem value="brand1">128 GB</SelectItem>
            <SelectItem value="brand2">256 GB</SelectItem>
            <SelectItem value="brand3">512 GB</SelectItem>
            <SelectItem value="brand4">1 TB</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2 font-semibold">تاريخ الانضمام</Label>
        <Select dir="rtl">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="فرز حسب تاريخ الانضمام" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            <SelectItem value="brand1">من الاحدث</SelectItem>
            <SelectItem value="brand2">من الاقدم</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </article>
  );
};

export default ProductsFilter;

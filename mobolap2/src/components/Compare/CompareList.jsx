"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import useLocalStorage from "@/hooks/useLocalStorage";
import { NumberFormat } from "@/lib/NumberFormat";

const CompareList = ({ locale }) => {
  const t = useTranslations("Specsfications");
  const { DataToStore } = useLocalStorage("CompareProducts", []);
  const [products, setProducts] = useState([]);
  const TableRowStyle = `${
    locale == "ar" ? "*:text-right" : "*:text-left"
  } *:border-s *:font-medium`;

  // Update State On Mount
  useEffect(() => {
    setProducts(DataToStore);
  }, []);

  return (
    <article className="p-4 border rounded-xl overflow-hidden my-10">
      {/* <h1 className="text-2xl font-semibold mb-4">قائمة مقارنة المنتجات</h1> */}
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-medium">هذا الصفحة تحت التشييد</h1>
      </div>
      <div className="hidden border rounded-lg overflow-hidden">
        <Table className="">
          {/* Header */}
          <TableHeader className="bg-slate-200 dark:bg-slate-900">
            <TableRow
              className={`${TableRowStyle} text-lg border-s-slate-200 *:text-slate-700 dark:*:text-slate-200`}
            >
              <TableHead className="">المواصفات</TableHead>
              {products?.map((product) => (
                <TableHead key={product?.name}>{product?.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product?.name}>
                <TableCell>البراند</TableCell>
                <TableCell>{product?.brand}</TableCell>
              </TableRow>
            ))}
            {products?.map((product) => (
              <TableRow key={product?.name}>
                <TableCell>السعر</TableCell>
                <TableCell className="flex items-center gap-4">
                  {product?.variants?.map((variant) => (
                    <div key={variant?.sku} className="flex gap-2">
                      <span>
                        {variant?.ram}/{variant?.storage}
                      </span>
                      <span> - </span>
                      <span>{NumberFormat(variant?.price)}</span>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
            {products?.map((product) => (
              <TableRow key={product?.name}>
                <TableCell>الذاكرة العشوائية</TableCell>
                <TableCell className="flex items-center gap-4">
                  {product?.variants?.map((variant) => (
                    <span key={variant?.sku}>{variant?.ram}</span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
            {products?.map((product) => (
              <TableRow key={product?.name}>
                <TableCell>الذاكرة الداخلية</TableCell>
                <TableCell className="flex items-center gap-4">
                  {product?.variants?.map((variant) => (
                    <span key={variant?.sku}>{variant?.storage}</span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
            {products?.map((product) => (
              <TableRow key={product?.name}>
                <TableCell>المعالج</TableCell>
                <TableCell>{product?.specs?.cpu}</TableCell>
              </TableRow>
            ))}
            {products?.map((product) => (
              <TableRow key={product?.name}>
                <TableCell>الشاشة</TableCell>
                <TableCell>{product?.specs?.screen}</TableCell>
              </TableRow>
            ))}
            {products?.map((product) => (
              <TableRow key={product?.name}>
                <TableCell>الكاميرا</TableCell>
                <TableCell>{product?.specs?.camera}</TableCell>
              </TableRow>
            ))}
            {products?.map((product) => (
              <TableRow key={product?.name}>
                <TableCell>نظام التشغيل</TableCell>
                <TableCell>{product?.specs?.os}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </article>
  );
};

export default CompareList;

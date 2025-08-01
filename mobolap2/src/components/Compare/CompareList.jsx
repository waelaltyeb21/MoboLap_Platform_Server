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
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const CompareList = ({ locale }) => {
  const t = useTranslations("Specsfications");
  const { DataToStore, SetToStorage } = useLocalStorage("CompareProducts", []);
  const [products, setProducts] = useState([]);
  // Update State On Mount
  useEffect(() => {
    setProducts(DataToStore);
  }, []);

  const RemoveFromCompare = (id) => {
    const UpdateProducts = products?.filter((prod) => prod?.id != id);

    setProducts(UpdateProducts);
    SetToStorage(UpdateProducts);
  };

  return (
    <article className="flex flex-col gap-6 my-10">
      {/* Products */}
      {products?.length != 0 && (
        <div className="p-4 border rounded-xl overflow-hidden">
          <div className="grid md:lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <div
                key={product?.id}
                className="border rounded-lg p-2 flex justify-between items-center"
              >
                <X
                  onClick={() => RemoveFromCompare(product?.id)}
                  className="cursor-pointer"
                />
                <h1 className="text-2xl font-semibold">{product?.name}</h1>
              </div>
            ))}
          </div>
        </div>
      )}

      {products?.length == 0 && (
        <article className="min-h-[50dvh] flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl md:lg:text-4xl font-medium">
            لا توجد منتجات لمقارنتها
          </h1>
          <p className="text-lg">قم باضافة منتجات لمقارنتها</p>
          <Button className="cursor-pointer mt-2 bg-indigo-600 hover:bg-indigo-700 text-slate-100">
            <Link href="/products">الانتقال الى صفحة المنتجات</Link>
          </Button>
        </article>
      )}

      {/* Compare Table */}
      {products?.length != 0 && (
        <div className="p-4 border rounded-xl overflow-hidden">
          <h1 className="text-2xl font-semibold mb-4">قائمة مقارنة المنتجات</h1>
          <div className="border rounded-lg overflow-hidden">
            <Table className="lg:text-lg">
              <TableHeader className="bg-slate-200 dark:bg-slate-900">
                <TableRow className="*:text-right font-semibold">
                  <TableHead>المواصفات</TableHead>
                  {products.map((product) => (
                    <TableHead key={product.id} className="border-s">
                      {product.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>السعر</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      <div className="flex items-center">
                        {product?.variants?.map((variant, index) => (
                          <div key={variant?.sku}>
                            <span>{NumberFormat(variant?.price)}</span>
                            {index < product?.variants?.length - 1 && (
                              <span className="mx-1">-</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>الرامات</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      <div className="flex items-center">
                        {product?.variants?.map((variant, index) => (
                          <div key={variant?.sku}>
                            <span>{variant?.ram}</span>
                            {index < product?.variants?.length - 1 && (
                              <span className="mx-1">-</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>التخزين</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      <div className="flex items-center">
                        {product?.variants?.map((variant, index) => (
                          <div key={variant?.sku}>
                            <span>{variant?.storage}</span>
                            {index < product?.variants?.length - 1 && (
                              <span className="mx-1">-</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>المعالج</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      {product?.specs?.cpu}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>الكاميرا</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      {product?.specs?.camera}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>البطارية</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      {product?.specs?.battery}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </article>
  );
};

export default CompareList;

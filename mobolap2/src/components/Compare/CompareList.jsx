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
import { getCookie } from "cookies-next";

const CompareList = () => {
  const locale = getCookie("NEXT_LOCALE");
  const t = useTranslations("Specifications");
  const compare = useTranslations("Sections.Compare");
  const { DataToStore, SetToStorage } = useLocalStorage("CompareProducts", []);
  const [products, setProducts] = useState([]);
  // Update State On Mount
  useEffect(() => {
    setProducts(DataToStore);
  }, []);

  const RemoveFromCompare = (id) => {
    const UpdateProducts = products?.filter((prod) => prod?._id != id);

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
                key={product?._id}
                className="border rounded-lg p-2 flex justify-between items-center"
              >
                <X
                  onClick={() => RemoveFromCompare(product?._id)}
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
            {compare("EmptyCompare.title")}
          </h1>
          <p className="text-lg">{compare("EmptyCompare.subTitle")}</p>
          <Button className="cursor-pointer mt-2 bg-indigo-600 hover:bg-indigo-700 text-slate-100">
            <Link href="/products">{compare("EmptyCompare.link")}</Link>
          </Button>
        </article>
      )}

      {/* Compare Table */}
      {products?.length != 0 && (
        <div className="p-4 border rounded-xl overflow-hidden">
          <h1 className="text-2xl font-semibold mb-4">
            {compare("mainTitle")}
          </h1>
          <div className="border rounded-lg overflow-hidden">
            <Table className="lg:text-lg">
              <TableHeader className="bg-slate-200 dark:bg-slate-900">
                <TableRow
                  className={`${
                    locale === "ar" ? "*:text-right" : "*:text-left"
                  } font-semibold`}
                >
                  <TableHead>{t("specs")}</TableHead>
                  {products.map((product) => (
                    <TableHead key={product.id} className="border-s">
                      {product.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t("price")}</TableCell>
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
                  <TableCell>{t("ram")}</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      <div className="flex items-center">
                        {product?.variants?.map((variant, index) => (
                          <div key={variant?.sku}>
                            <span>{`${variant?.ram}GB`}</span>
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
                  <TableCell>{t("storage")}</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      <div className="flex items-center">
                        {product?.variants?.map((variant, index) => (
                          <div key={variant?.sku}>
                            <span>{`${variant?.storage}GB`}</span>
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
                  <TableCell>{t("cpu")}</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      {product?.specs?.cpu}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>{t("camera")}</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="border-s">
                      {product?.specs?.camera}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>{t("os")}</TableCell>
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

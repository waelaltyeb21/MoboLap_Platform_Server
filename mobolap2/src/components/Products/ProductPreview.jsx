"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AddToCart, AddToCompare } from "./ProductButtons";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import ProductVariants from "./ProductVariants";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";

const ProductPreview = ({ product }) => {
  const specs = useTranslations("Specifications");
  const [SelectedProductVariant, setSelectedProductVariant] = useState({
    ...product,
    variants: [product?.variants[0]],
  });
  const HandleVariant = (variant) => {
    setSelectedProductVariant({ ...product, variants: [variant] });
  };
  const ENV =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_SERVER_URL_DEV
      : process.env.NEXT_PUBLIC_SERVER_URL_PROD;
  const PRODUCT_IMAGE = `${ENV}/uploads/images/products/${product?.image}`;
  return (
    <article className="grid grid-cols-12 gap-4 md:lg:mt-10">
      {/* Product Image */}
      <div className="col-span-12 lg:col-span-4 min-h-[460px] flex justify-center items-center">
        <div className="image_container size-full overflow-hidden relative">
          <Image
            src={PRODUCT_IMAGE}
            alt={product?.name || "Product_Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="size-full object-contain"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
        {/* Product Name */}
        <div className="flex justify-between sm:justify-start gap-4 items-center">
          <Badge className="bg-blue-600 text-slate-100">{product?.brand}</Badge>
          <h1 className="text-4xl font-semibold text-left sm:text-right">
            {product?.name}
          </h1>
        </div>

        <ProductVariants product={product} HandleVariant={HandleVariant} />

        {/* Product Specfications */}
        <div className="Specfications">
          <h1 className="text-xl font-medium">{specs("specs")}</h1>

          <div className="w-fit">
            <Table className="*:border-none text-pretty">
              <TableBody>
                <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                  <TableCell>{specs("camera")}</TableCell>
                  <TableCell>{product?.specs?.camera}</TableCell>
                </TableRow>
                <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                  <TableCell>{specs("battery")}</TableCell>
                  <TableCell>{product?.specs?.battery}</TableCell>
                </TableRow>
                <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                  <TableCell>{specs("screen")}</TableCell>
                  <TableCell>{product?.specs?.screen}</TableCell>
                </TableRow>
                <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                  <TableCell>{specs("cpu")}</TableCell>
                  <TableCell>{product?.specs?.cpu}</TableCell>
                </TableRow>
                <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                  <TableCell>{specs("os")}</TableCell>
                  <TableCell>{product?.specs?.os}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Actions */}
        <div className="Actions flex *:w-fit gap-4">
          <AddToCompare product={product} />
          <AddToCart product={SelectedProductVariant} />
        </div>
      </div>
    </article>
  );
};

export default ProductPreview;

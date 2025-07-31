import React from "react";
import Image from "next/image";
import { AddToCart, AddToCompare } from "./ProductButtons";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import ProductVariants from "./ProductVariants";
import { Badge } from "../ui/badge";

const ProductPreview = ({ id, product }) => {
  return (
    <article className="grid grid-cols-12 gap-4 mt-20">
      {/* Product Image */}
      <div className="col-span-12 lg:col-span-4 min-h-[460px] flex justify-center items-center">
        <div className="image_container size-full overflow-hidden relative">
          <Image
            src={product?.image}
            alt={product?.name}
            fill
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

        <ProductVariants product={product} />

        {/* Product Specfications */}
        <div className="Specfications">
          <h1 className="text-xl font-medium">المواصفات</h1>

          <div className="w-fit">
            <Table className="*:border-none">
              <TableBody>
                <TableRow className="*:text-lg border-none hover:bg-transparent">
                  <TableCell>الكاميرا</TableCell>
                  <TableCell>{product?.specs?.camera}</TableCell>
                </TableRow>
                <TableRow className="*:text-lg border-none hover:bg-transparent">
                  <TableCell>البطارية</TableCell>
                  <TableCell>{product?.specs?.battery}</TableCell>
                </TableRow>
                <TableRow className="*:text-lg border-none hover:bg-transparent">
                  <TableCell>الشاشة</TableCell>
                  <TableCell>{product?.specs?.screen}</TableCell>
                </TableRow>
                <TableRow className="*:text-lg border-none hover:bg-transparent">
                  <TableCell>المعالج</TableCell>
                  <TableCell>{product?.specs?.cpu}</TableCell>
                </TableRow>
                <TableRow className="*:text-lg border-none hover:bg-transparent">
                  <TableCell>نظام التشغيل</TableCell>
                  <TableCell>{product?.specs?.os}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Actions */}
        <div className="Actions flex *:w-fit gap-4">
          <AddToCompare product={product} />
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductPreview;

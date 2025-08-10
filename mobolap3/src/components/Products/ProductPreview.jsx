"use client";
import React, { useState } from "react";
import { AddToCart, AddToCompare } from "./ProductButtons";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import ProductVariants from "./ProductVariants";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";
import ProductSliders from "./ProductSliders";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCookie } from "cookies-next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CartProvider from "@/contexts/CartContext";

const ProductPreview = ({ product }) => {
  const specs = useTranslations("Specifications");
  const locale = getCookie("NEXT_LOCALE") || "ar";
  const router = useRouter();

  const [SelectedProductVariant, setSelectedProductVariant] = useState({
    ...product,
    variants: [product?.variants[0]],
  });

  const HandleVariant = (variant) => {
    setSelectedProductVariant({ ...product, variants: [variant] });
  };

  const HandleBack = () => {
    router.back();
  };
  return (
    <>
      <Button onClick={HandleBack} variant="outline" className="cursor-pointer">
        {locale === "ar" ? <ChevronRight /> : <ChevronLeft />}
        {locale === "ar" ? "السابق" : "Back"}
      </Button>
      <article className="grid grid-cols-12 gap-4 md:lg:mt-10">
        {/* Product Image */}
        <div className="col-span-12 lg:col-span-6 h-fit flex justify-center items-center">
          <ProductSliders images={product?.images} />
        </div>

        {/* Product Details */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          {/* Product Name */}
          <div className="flex justify-between sm:justify-start gap-4 items-center">
            <Badge className="bg-blue-600 text-slate-100">
              {product?.brand}
            </Badge>
            <h1 className="text-3xl font-semibold text-left sm:text-right capitalize">
              {product?.name}
            </h1>
          </div>

          <ProductVariants product={product} HandleVariant={HandleVariant} />

          {/* Product Specfications */}
          <div className="Specfications">
            {/* <h1 className="lg:text-2xl font-semibold mb-4">{specs("specs")}</h1> */}

            <div className={`w-full flex justify-start mb-4`}>
              <Tabs defaultValue="specifications">
                <TabsList className="w-full flex items-end">
                  <TabsTrigger value="description" className="cursor-pointer">
                    {specs("description")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className="cursor-pointer"
                  >
                    {specs("specs")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="specifications">
                  <div className="w-fit" dir={locale === "ar" ? "rtl" : "ltr"}>
                    <Table className="*:border-none text-pretty">
                      <TableBody>
                        <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                          <TableCell>{specs("camera")}</TableCell>
                          <TableCell>{product?.specs?.backCamera}</TableCell>
                        </TableRow>
                        <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                          <TableCell>{specs("battery")}</TableCell>
                          <TableCell>{product?.specs?.battery}</TableCell>
                        </TableRow>
                        <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                          <TableCell>{specs("screen")}</TableCell>
                          <TableCell>
                            {`${product?.specs?.screen} ${specs("inches")}`} -{" "}
                            {product?.specs?.screenType}
                          </TableCell>
                        </TableRow>
                        {/* <TableRow className="*:text-lg border-none hover:bg-transparent *:text-pretty">
                    <TableCell>{specs("gpu")}</TableCell>
                    <TableCell>{product?.specs?.gpu}</TableCell>
                  </TableRow> */}
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
                </TabsContent>

                <TabsContent value="description">
                  {product?.description ||
                    "This Phone is the ultimate version of the era of Ai."}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Actions */}
          <CartProvider>
            <div className="Actions flex *:w-fit gap-4">
              <AddToCompare product={product} />
              <AddToCart product={SelectedProductVariant} />
            </div>
          </CartProvider>
        </div>
      </article>
    </>
  );
};

export default ProductPreview;

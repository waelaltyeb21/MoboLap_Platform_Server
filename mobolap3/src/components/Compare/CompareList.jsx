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
import Link from "next/link";
import { Button } from "../ui/button";
import { getCookie } from "cookies-next";
import CompoProduct from "./CompoProduct";
import toast from "react-hot-toast";
import ComparePrices from "./ComparePrices";
import Loading from "@/app/Loading";

const specFields = [
  { key: "brand", type: "single" },
  { key: "ram", type: "variants", field: "ram", suffix: "GB" },
  { key: "storage", type: "variants", field: "storage", suffix: "GB" },
  { key: "cpu", type: "single" },
  { key: "backCamera", type: "single", fallback: "لا يوجد" },
  { key: "frontCamera", type: "single", fallback: "لا يوجد" },
  { key: "battery", type: "single" },
  { key: "fingerprint", type: "single" },
  { key: "os", type: "single" },
  { key: "ui", type: "single" },
  { key: "colors", type: "array" },
];

const CompareList = ({ data }) => {
  const MAX_PRODUCTS = 3;
  const locale = getCookie("NEXT_LOCALE") || "ar";

  const t = useTranslations("Specifications");
  const compare = useTranslations("Sections.Compare");
  const notify = useTranslations("Notifications");

  const { DataToStore, SetToStorage } = useLocalStorage("CompareProducts", []);
  const [products, setProducts] = useState([]);
  const [productsIDs, setProductsIDs] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Update State On Mount
  useEffect(() => {
    const AllProducts = DataToStore?.map((id) => {
      const FullProduct = data?.find((prod) => (id == prod?._id ? prod : null));
      return FullProduct;
    });
    setProductsIDs(AllProducts?.map((prod) => prod?._id));
    setProducts(AllProducts);
    setIsLoading(false);
  }, []);

  const RemoveFromCompare = (productID) => {
    const IDs = productsIDs?.filter((id) => id != productID);
    const UpdateProducts = products?.filter((prod) => prod?._id != productID);

    // Save Data
    SetToStorage(IDs);
    setProductsIDs(IDs);
    setProducts(UpdateProducts);
  };

  const HandleSelectedProduct = (product) => {
    if (products.length === MAX_PRODUCTS) {
      toast.error(notify("failedToAddToCompare"));
      setOpen(false);
      return;
    }

    const isFound = productsIDs.find((id) => id === product?._id);

    if (isFound) {
      toast.error(notify("existInCompareList"));
    } else {
      setOpen(false);
      setProductsIDs((prv) => [...prv, product?._id]);
      SetToStorage([...productsIDs, product?._id]);
      setProducts((prv) => [...prv, product]);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <article className="flex flex-col gap-6 my-10">
      <h1 className="text-center text-2xl font-semibold my-10">
        {compare("title")}
      </h1>
      {/* Products */}
      <div className="grid lg:grid-cols-12 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <CompoProduct
            key={index}
            open={open}
            setOpen={setOpen}
            data={data}
            t={compare}
            product={products[index]}
            HandleSelectedProduct={HandleSelectedProduct}
            HandleRemoveProduct={RemoveFromCompare}
          />
        ))}
      </div>
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
      {products?.length !== 0 && (
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
                  {products?.map((product) => (
                    <TableHead key={product?._id} className="border-s">
                      {product?.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {specFields.map((spec) => (
                  <TableRow key={spec.key}>
                    <TableCell>{t(spec.key)}</TableCell>
                    {products.map((product) => (
                      <TableCell key={product._id} className="border-s">
                        {spec.type === "single" &&
                          (product?.specs?.[spec.key] || spec.fallback || "")}

                        {spec.type === "variants" && (
                          <div className="flex items-center">
                            {product?.variants?.map((variant, index) => (
                              <div key={variant?.sku}>
                                <span>
                                  {`${variant?.[spec.field]}${
                                    spec.suffix || ""
                                  }`}
                                </span>
                                {index < product?.variants?.length - 1 && (
                                  <span className="mx-1">/</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {spec.type === "array" &&
                          Array.isArray(product?.specs?.[spec.key]) &&
                          typeof product?.specs?.[spec.key] !== String && (
                            <div className="flex items-center flex-wrap">
                              {product.specs[spec.key].map((color, index) => (
                                <span key={color}>
                                  {color}
                                  {index <
                                    product.specs[spec.key].length - 1 && (
                                    <span className="mx-1">/</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {products?.length !== 0 && (
        <article className="mt-10">
          <h1 className="text-xl mb-4 text-primary font-semibold">
            {compare("productsPrices")}
          </h1>
          <div className="flex flex-col gap-8">
            {products?.map((product) => (
              <ComparePrices key={product?._id} product={product} t={compare} />
            ))}
          </div>
        </article>
      )}
    </article>
  );
};

export default CompareList;

import CompareTable from "@/components/blocks/CompareTable";
import GetData from "@/lib/GetData";
import { NumberFormat } from "@/lib/NumberFormat";
import React from "react";

const Compare = async () => {
  const { products } = await GetData("/products");
  const TableOfProducts = {
    head: [
      "المنتج",
      "السعر",
      "الرامات",
      "التخزين",
      "المعالج",
      "الكاميرا",
      "الشاشة",
      "البطارية",
    ],
    body: products?.map((product) => [
      product?.name,
      NumberFormat(product?.price),
      product?.specs?.ram,
      product?.specs?.storage,
      product?.specs?.cpu,
      product?.specs?.camera,
      product?.specs?.screen,
      product?.specs?.battery,
    ]),
  };
  return (
    <section>
      <CompareTable TableOfProducts={TableOfProducts} products={products} />
    </section>
  );
};

export default Compare;

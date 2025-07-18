import Heading from "@/components/Heading";
import ProductList from "@/components/Products/ProductList";
import ProductsFilter from "@/components/Products/ProductsFilter";
import MoboButton from "@/components/ui/MoboButton";
import GetData from "@/lib/GetData";
import Link from "next/link";
import React from "react";

const Products = async ({ searchParams }) => {
  const {
    category = "",
    storage = "",
    ram = "",
    brand = "",
    sort = "",
  } = await searchParams;
  const data = await GetData(
    `/products?category=${category}&brand=${brand}&ram=${ram}&storage=${storage}&sort=${sort}`
  );
  console.log("data: ", data);
  return (
    <section>
      <Heading title="المنتجات">
        <MoboButton>
          <Link href="/dashboard/products/create">اضافة منتج</Link>
        </MoboButton>
      </Heading>
      <ProductsFilter
        categories={data?.categories}
        brands={data?.brands}
        queries={{ category, storage, ram, brand, sort }}
      />
      <ProductList products={data?.products} />
    </section>
  );
};

export default Products;

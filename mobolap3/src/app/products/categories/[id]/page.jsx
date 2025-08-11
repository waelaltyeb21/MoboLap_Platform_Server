import ProductsFilters from "@/components/Products/ProductsFilters";
import ProductsList from "@/components/Products/ProductsList";
import { Button } from "@/components/ui/button";
import GetData from "@/lib/GetData";
import Link from "next/link";
import React from "react";

const ProductsByCategories = async ({ params, searchParams }) => {
  const { id } = await params;
  const { search = "" } = await searchParams;
  const data = await GetData(
    `/products/brands?category=${id}&search=${search}`
  );
  return (
    <section>
      <ProductsFilters />
      <ProductsList
        data={data?.data}
        categories={data?.categories}
        brands={data?.brands}
        noFoundTitle="لا توجد منتجات متوفره حاليا في هذا القسم"
      >
        <Link href="/products">
          <Button className="cursor-pointer">عرض جميع المنتجات</Button>
        </Link>
      </ProductsList>
    </section>
  );
};

export default ProductsByCategories;

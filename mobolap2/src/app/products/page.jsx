import React from "react";
import ProductsList from "@/components/Products/ProductsList";
import { Products } from "@/database/data";

export default function ProductsPage() {
  return (
    <section className="Products">
      <ProductsList products={Products} />
    </section>
  );
}

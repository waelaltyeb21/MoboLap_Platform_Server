"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const ProductsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ProductName, setProductName] = useState();
  // searchParams.get("name") || ""

  useDebounce(
    () => {
      if (ProductName.trim()) {
        console.log("Product: ", ProductName);
        console.log("Searching..");
        return router.push(`/products?name=${encodeURIComponent(ProductName)}`);
      }
    },
    700,
    [ProductName]
  );

  return (
    <article>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Type To Search For Product..."
          value={ProductName}
          onChange={(event) => setProductName(event?.target?.value)}
        />
      </div>
    </article>
  );
};

export default ProductsFilters;

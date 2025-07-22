import CompareTable from "@/components/blocks/CompareTable";
import GetData from "@/lib/GetData";
import React from "react";

const Compare = async () => {
  const data = await GetData(`/products`);
  console.log("Products: ", data?.products);
  return (
    <section>
      <CompareTable ProductsToCompare={data?.products} />
    </section>
  );
};

export default Compare;

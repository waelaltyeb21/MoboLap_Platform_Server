import SuppliersList from "@/components/Suppliers/SuppliersList";
import GetData from "@/lib/GetData";
import React from "react";

const Suppliers = async ({ searchParams }) => {
  const { city, status, category, sort } = await searchParams;
  console.log("Query: ", { city, status, category, sort });
  const data = await GetData(
    `/suppliers?city=${city}&status=${status}&category=${category}&sort=${sort}`
  );
  return (
    <section>
      <SuppliersList
        suppliers={data?.suppliers}
        categories={data?.categories}
        queries={{ city, status, category, sort }}
      />
    </section>
  );
};

export default Suppliers;

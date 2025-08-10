import Heading from "@/components/Heading";
import SuppliersFilters from "@/components/Suppliers/SuppliersFilters";
import SuppliersList from "@/components/Suppliers/SuppliersList";
import MoboButton from "@/components/ui/MoboButton";
import GetData from "@/lib/GetData";
import Link from "next/link";
import React from "react";

const Suppliers = async ({ searchParams }) => {
  const {
    city = "",
    status = "",
    category = "",
    sort = "",
  } = await searchParams;
  console.log("Query: ", { city, status, category, sort });
  const data = await GetData(
    `/suppliers?city=${city}&status=${status}&category=${category}&sort=${sort}`
  );
  console.log("data: ", data);
  return (
    <section>
      {/* Heading */}
      <Heading title="الموردين">
        <MoboButton>
          <Link href="/dashboard/suppliers/create">اضافة مورد</Link>
        </MoboButton>
      </Heading>
      {/* Filters */}
      <SuppliersFilters
        categories={data?.categories}
        cities={data?.cities}
        queries={{ city, status, category, sort }}
      />
      {/* Suppliers Table */}
      <SuppliersList suppliers={data?.suppliers} />
    </section>
  );
};

export default Suppliers;

import SuppliersList from "@/components/Suppliers/SuppliersList";
import GetData from "@/lib/GetData";
import React from "react";

const Suppliers = async () => {
  const suppliers = await GetData(`/suppliers`);
  return (
    <section>
      <SuppliersList suppliers={suppliers} />
    </section>
  );
};

export default Suppliers;

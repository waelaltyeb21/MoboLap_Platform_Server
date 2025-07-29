import SupplierForm from "@/components/Suppliers/SupplierForm";
import GetData from "@/lib/GetData";
import React from "react";

const AddSupplier = async () => {
  const categories = await GetData("/categories");
  return (
    <section>
      <SupplierForm state="create" categories={categories} />
    </section>
  );
};

export default AddSupplier;

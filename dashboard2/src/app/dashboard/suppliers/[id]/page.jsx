import SupplierForm from "@/components/Suppliers/SupplierForm";
import GetData from "@/lib/GetData";
import React from "react";

const SupplierDetails = async ({ params }) => {
  const { id } = await params;
  const data = await GetData(`/suppliers/${id}`);
  return (
    <section>
      <SupplierForm
        supplier={data?.supplier}
        state="update"
        id={id}
        categories={data?.categories}
      />
    </section>
  );
};

export default SupplierDetails;

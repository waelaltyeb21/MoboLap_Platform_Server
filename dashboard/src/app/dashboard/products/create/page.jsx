import ProductForm from "@/components/Products/ProductForm";
import GetData from "@/lib/GetData";
import React from "react";

const AddProduct = async () => {
  const product = await GetData("/mobolap-info");
  console.log("MoboLap Info: ", product);
  return (
    <section>
      <ProductForm product={product} state="create" />
    </section>
  );
};

export default AddProduct;

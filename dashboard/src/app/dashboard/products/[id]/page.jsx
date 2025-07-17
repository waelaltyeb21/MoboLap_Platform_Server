import ProductForm from "@/components/Products/ProductForm";
import GetData from "@/lib/GetData";
import React from "react";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await GetData(`/products/${id}`);
  console.log(product);
  return (
    <section>
      <ProductForm product={product} state="update" id={id} />
    </section>
  );
};

export default ProductDetails;

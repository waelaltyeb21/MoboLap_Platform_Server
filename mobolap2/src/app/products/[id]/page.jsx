import React from "react";
import ProductPreview from "@/components/Products/ProductPreview";
import RelevantProducts from "@/components/Products/RelevantProducts";
import GetData from "@/lib/GetData";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  // const product = Products?.find((prod) => prod?._id === id);
  const product = await GetData(`/products/${id}`);
  console.log(product);
  return (
    <section>
      <ProductPreview product={product} />
      <RelevantProducts product={product} />
    </section>
  );
};

export default ProductDetails;

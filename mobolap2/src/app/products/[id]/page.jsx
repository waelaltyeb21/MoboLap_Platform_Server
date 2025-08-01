import React from "react";
import ProductPreview from "@/components/Products/ProductPreview";
import { Products } from "@/database/data";
import RelevantProducts from "@/components/Products/RelevantProducts";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = Products?.find((prod) => prod?.id === id);
  return (
    <section>
      <ProductPreview product={product} />
      <RelevantProducts product={product} />
    </section>
  );
};

export default ProductDetails;

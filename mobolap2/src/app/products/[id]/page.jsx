import ProductPreview from "@/components/Products/ProductPreview";
import { Products } from "@/database/data";
import React from "react";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = Products?.find((prod) => prod?.id === id);
  return (
    <section>
      <ProductPreview id={id} product={product} />
    </section>
  );
};

export default ProductDetails;

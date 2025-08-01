import React from "react";
import ProductPreview from "@/components/Products/ProductPreview";
import { Products } from "@/database/data";
import Product3DView from "@/components/Products/Product3DView";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = Products?.find((prod) => prod?.id === id);
  return (
    <section>
      <ProductPreview product={product} />
      <Product3DView product={product} />
    </section>
  );
};

export default ProductDetails;

import React from "react";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  return <section>Product Details - {id}</section>;
};

export default ProductDetails;

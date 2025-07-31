import React from "react";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  return (
    <section>
      <h1>تفاصيل المنتج - {id}</h1>
    </section>
  );
};

export default ProductDetails;

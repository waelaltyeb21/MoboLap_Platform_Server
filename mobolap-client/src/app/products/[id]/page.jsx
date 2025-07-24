import React from "react";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  return (
    <section className="Product_Details">
      <h1>صفحة تفاصيل المنتج - {id}</h1>
    </section>
  );
};

export default ProductDetails;

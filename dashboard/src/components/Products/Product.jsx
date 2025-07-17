import React from "react";

const Product = ({ product }) => {
  console.log("Product: ", product?.specs);
  return (
    <div className="Product">
      <h1>{product.name}</h1>
    </div>
  );
};

export default Product;

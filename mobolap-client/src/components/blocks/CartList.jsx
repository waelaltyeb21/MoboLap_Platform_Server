import React from "react";

const CartList = () => {
  return (
    <article>
      <h1 className="text-2xl mb-4">سلة المشتريات</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9 border border-slate-300 rounded-lg p-4">
          List Of Products
        </div>
        <div className="col-span-3 border border-slate-300 rounded-lg p-4">
          Cart
        </div>
      </div>
    </article>
  );
};

export default CartList;

import React from "react";
import CustomInput from "@/components/ui/CustomInput";
import { SpecsFields } from "@/database/data";

const ProductSpecs = ({ product, register }) => {
  return (
    <div className="ProductDetails mt-20">
      <h1 className="mb-8">خصائص المنتج</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        {SpecsFields.map(
          (field) => (
            // field.feildFor === selectedCategory && (
            <CustomInput
              key={field.key}
              title={field.title}
              placeholder={field.placeholder}
              type={field.type}
              val={product?.specs?.[field.key.replace("specs.", "")]}
              register={register}
              fieldKey={field.key}
            />
          )
          // )
        )}
      </div>
    </div>
  );
};

export default ProductSpecs;

import React from "react";
import Stepper, { Step } from "../stepper-ui/Stepper/Stepper";
import ProductFields from "./ProductFileds";
import ProductSpecs from "./ProductDetails/ProductSpecs";
import ProductVariants from "./ProductDetails/ProductVariants";

const ProductStepper = ({
  product,
  loading,
  brands,
  suppliers,
  ToggleProductType,
  state,
  control,
  register,
  errors,
  fields,
  append,
  remove,
  selectedCategory,
}) => {
  const steps = [
    <ProductFields
      product={product}
      brands={brands}
      suppliers={suppliers}
      ToggleProductType={ToggleProductType}
      state={state}
      control={control}
      register={register}
      errors={errors}
    />,
    <ProductSpecs
      product={product}
      register={register}
      selectedCategory={selectedCategory}
    />,

    <ProductVariants
      product={product}
      register={register}
      fields={fields}
      append={append}
      remove={remove}
      errors={errors}
    />,
  ];
  return (
    <div>
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => console.log("All steps completed!")}
        backButtonText="السابق"
        nextButtonText="التالي"
        loading={loading}
      >
        {steps?.map((step) => (
          <Step>{step}</Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProductStepper;

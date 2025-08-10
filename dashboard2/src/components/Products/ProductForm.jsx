"use client";
import React, { useState } from "react";
import { RequestController } from "@/lib/RequestController";
import { redirect, useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import DeleteAlert from "../ui/DeleteAlert";
import ProductSliders from "./ProductSliders";
import ProductStepper from "./Stepper";
import ProductFields from "./ProductFileds";
import ProductSpecs from "./ProductDetails/ProductSpecs";
import ProductVariants from "./ProductDetails/ProductVariants";
import { Button } from "../ui/button";

const ProductForm = ({ product, state = "create", id = "" }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name,
      discount: product?.discount,
      brand: product?.specs?.brand,
      categoryId: product?.categoryId,
      supplierId: product?.supplierId,
      specs: product?.specs || {
        battery: "",
        fingerprint: "",
        camera: "",
        frontCamera: "",
        backCamera: "",
        colors: "",
        gpu: "",
        cpu: "",
        screen: "",
        modal: "",
        os: "",
      },
      variants: product?.variants || [
        {
          sku: Date.now(),
          ram: "",
          storage: "",
          color: "",
          price: "",
        },
      ],
      status: product?.status,
      status: product?.status,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [suppliers, setSuppliers] = useState(
    product?.suppliers?.filter(
      (supplier) => supplier?.categoryId === product?.categoryId
    )
  );

  const [brands, setBrands] = useState(
    product?.categories?.find(
      (category) => category?._id === product?.categoryId
    )?.brands
  );

  const HandleProductAction = async (data) => {
    // setLoading(true);
    const url = `/products${state === "create" ? `/create` : `/update/${id}`}`;

    console.log("Data: ", data);
    console.log("Colors: ", data.specs.colors);
    const ProductData = new FormData();
    ProductData.append("name", data?.name);
    ProductData.append("status", data?.status);
    Array.from(data?.ProductImages)?.map((image) =>
      ProductData.append("ProductImages", image)
    );
    ProductData.append("price", parseInt(data?.price));
    ProductData.append("discount", parseFloat(data?.discount));
    // CPU - GPU - Screen - Battery - Camera - OS - Fingerprint - Modal
    ProductData.append(
      "specs",
      JSON.stringify({
        ...data?.specs,
        colors:
          !Array.isArray(data?.specs?.colors) &&
          data?.specs?.colors?.split(/[,|-]/)?.map((brand) => brand.trim("")),
      })
    );
    // Ram - Storage - Color - Price
    ProductData.append("variants", JSON.stringify(data?.variants));
    ProductData.append("supplierId", data?.supplierId);
    ProductData.append("categoryId", data?.categoryId);
    console.log(data?.status);

    const response = await RequestController(
      url,
      state === "create" ? "POST" : "PUT",
      ProductData
    );

    if (response.status === 201 || response.status === 200) {
      setLoading(false);
      return router.replace("/dashboard/products");
    }
  };

  const HandleDeleteProduct = async () => {
    setLoading(true);
    const url = `/products/delete/${id}`;
    const response = await RequestController(url, "DELETE");
    if (response.status === 201 || response.status === 200) {
      setLoading(false);
      return redirect("/dashboard/products");
    }
  };

  const ToggleProductType = (val) => {
    const Target = product?.categories?.find(
      (category) => category?._id === val
    )?.name;

    console.log("Hello: ", Target);
    setSelectedCategory(Target);
    // Set Brands
    setBrands(
      product?.categories?.find((category) => category?.name === Target)?.brands
    );

    // Suppliers
    setSuppliers(
      product?.suppliers?.filter((supplier) => supplier?.categoryId === val)
    );
  };

  return (
    <article>
      <div
        className={`flex 
          ${
            state === "update"
              ? "items-center justify-between"
              : "items-center justify-center"
          }
        `}
      >
        <h1 className="text-2xl font-bold mb-8">
          {state === "create" ? "اضافة منتج جديد" : "تعديل منتج"}
        </h1>

        {state === "update" && (
          <DeleteAlert text="حذف المنتج" handler={HandleDeleteProduct} />
        )}
      </div>

      {state === "update" ? (
        <article className="flex justify-center items-center">
          <ProductSliders images={product?.images} />
        </article>
      ) : null}
      <form onSubmit={handleSubmit(HandleProductAction)}>
        {/* <ProductStepper
          loading={loading}
          state={state}
          product={product}
          brands={brands}
          suppliers={suppliers}
          ToggleProductType={ToggleProductType}
          control={control}
          register={register}
          errors={errors}
          fields={fields}
          append={append}
          remove={remove}
          selectedCategory={selectedCategory}
        /> */}
        <ProductFields
          product={product}
          brands={brands}
          suppliers={suppliers}
          ToggleProductType={ToggleProductType}
          state={state}
          control={control}
          register={register}
          errors={errors}
        />
        <ProductSpecs
          product={product}
          register={register}
          selectedCategory={selectedCategory}
        />
        <ProductVariants
          product={product}
          register={register}
          fields={fields}
          append={append}
          remove={remove}
          errors={errors}
        />
        <div className="w-full flex justify-center items-center">
          <Button
            type="submit"
            className="text-slate-100 mx-auto my-8 cursor-pointer"
          >
            {state == "create" ? "اضافة" : "تحديث"}
          </Button>
        </div>
      </form>
    </article>
  );
};

export default ProductForm;

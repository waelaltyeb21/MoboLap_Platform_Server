"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MoboButton from "../ui/MoboButton";
import { RequestController } from "@/lib/RequestController";
import { redirect } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import DeleteAlert from "../ui/DeleteAlert";
import ProductSpecs from "./ProductDetails/ProductSpecs";
import CustomSelect from "../ui/CustomSelect";
import CustomInput from "../ui/CustomInput";
import Image from "next/image";

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
  const [loading, setLoading] = useState(false);

  const [suppliers, setSuppliers] = useState(
    product?.suppliers?.filter(
      (supplier) => supplier?.categoryId === product?.categoryId
    )
  );
  console.log(
    product?.categories?.find(
      (category) => category?._id === product?.categoryId
    )?.brands
  );
  const [brands, setBrands] = useState(
    product?.categories?.find(
      (category) => category?._id === product?.categoryId
    )?.brands
  );

  const IMAGE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/images/products/${product?.image}`;

  const HandleProductAction = async (data) => {
    // setLoading(true);
    const url = `/products${state === "create" ? `/create` : `/update/${id}`}`;
    console.log("Data: ", data);

    const ProductData = new FormData();
    ProductData.append("name", data?.name);
    ProductData.append("product", data?.product[0]);
    ProductData.append("price", parseInt(data?.price));
    ProductData.append("discount", parseFloat(data?.discount));
    // CPU - GPU - Screen - Battery - Camera - OS - Fingerprint - Modal
    ProductData.append("specs", JSON.stringify(data?.specs));
    // Ram - Storage - Color - Price
    ProductData.append("variants", JSON.stringify(data?.variants));
    ProductData.append("supplierId", data?.supplierId);
    ProductData.append("categoryId", data?.categoryId);

    const response = await RequestController(
      url,
      state === "create" ? "POST" : "PUT",
      ProductData
    );
    if (response.status === 201 || response.status === 200) {
      setLoading(false);
      return redirect("/dashboard/products");
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
        className={
          state === "update" ? "flex items-center justify-between" : ""
        }
      >
        <h1 className="text-2xl font-bold mb-8">
          {state === "create" ? "اضافة منتج جديد" : "تعديل منتج"}
        </h1>

        {state === "update" && (
          <DeleteAlert text="حذف المنتج" handler={HandleDeleteProduct} />
        )}
      </div>

      {state === "update" ? (
        <div className="mb-16 flex justify-center items-center overflow-hidden">
          <Image
            src={IMAGE_URL}
            alt={product?.name}
            width={250}
            height={250}
            className="border border-slate-300 rounded-lg px-16 w-auto h-auto object-contain"
          />
        </div>
      ) : null}
      <form onSubmit={handleSubmit(HandleProductAction)}>
        <div className="ProductDetails">
          <div className="mb-8">
            <h1 className="mb-4">بيانات المنتج</h1>
            <p className="text-sm text-muted-foreground mb-4">
              قم بملئ البيانات التالية لاضافة منتج جديد
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">اسم المنتج</Label>
              <Input
                type="text"
                defaultValue={product?.name}
                {...register("name", {
                  required: true,
                  maxLength: 50,
                  minLength: 3,
                })}
              />
            </div>

            <CustomInput
              title="التخفيض"
              placeholder="اختار التخفيض"
              type="number"
              val={product?.discount}
              register={register}
              fieldKey="discount"
            />

            <CustomSelect
              title="النوع"
              placeholder="اختار النوع"
              name="categoryId"
              control={control}
              handler={ToggleProductType}
              val={product?.categoryId}
              items={product?.categories?.map((category) => ({
                name: category?.name,
                value: category?._id,
              }))}
              fieldKey="name"
            />

            <CustomSelect
              title="البراند"
              placeholder="اختار البراند"
              name="specs.brand"
              control={control}
              val={product?.specs?.brand}
              items={brands?.map((brand) => ({ name: brand, value: brand }))}
              fieldKey="name"
            />

            <CustomSelect
              title="المورد"
              placeholder="اختار المورد"
              name="supplierId"
              control={control}
              val={product?.supplierId}
              items={suppliers?.map((supplier) => ({
                name: `${supplier?.name} - ${supplier?.address?.store}`,
                value: supplier?._id,
              }))}
              fieldKey="name"
            />

            <CustomSelect
              title="حالة المنتج"
              placeholder="اختار الحالة"
              name="status"
              control={control}
              val={product?.status}
              items={[
                { name: "جديد", value: "جديد" },
                { name: "شبه جديد", value: "شبه جديد" },
              ]}
              fieldKey="value"
            />

            <CustomSelect
              title="متاح للطلب ؟"
              placeholder="اختار الحالة"
              name="isAvailable"
              control={control}
              val={product?.isAvailable}
              items={[
                { name: "متاح", value: "متاح" },
                { name: "غير متاح", value: "غير متاح" },
              ]}
              fieldKey="value"
            />
            <CustomInput
              title="صورة المنتج"
              placeholder="اختار صورة المنتج"
              type="file"
              accept="image/*"
              fieldKey="product"
              val={product?.product}
              register={register}
              required={state === "create" ? true : false}
            />
          </div>
        </div>
        <ProductSpecs
          product={product}
          register={register}
          control={control}
          errors={errors}
          fields={fields}
          append={append}
          remove={remove}
        />

        <div className="col-span-2 flex justify-center items-center mt-10">
          <MoboButton loading={loading} className="w-1/3" type="submit">
            حفظ
          </MoboButton>
        </div>
      </form>
    </article>
  );
};

export default ProductForm;

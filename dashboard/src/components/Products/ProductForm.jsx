"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MoboButton from "../ui/MoboButton";
import { RequestController } from "@/lib/RequestController";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import DeleteAlert from "../ui/DeleteAlert";

const ProductForm = ({ product, state = "create", id = "" }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const HandleProductAction = async (data) => {
    setLoading(true);
    const url = `/products${state === "create" ? `/create` : `/update/${id}`}`;

    const ProductData = new FormData();
    ProductData.append("name", data.name);
    ProductData.append("product", data.product[0]);
    ProductData.append("price", data.price);
    ProductData.append("discount", data.discount);
    ProductData.append("specs", JSON.stringify(data.specs));
    ProductData.append("supplierId", data.supplierId);
    ProductData.append("categoryId", data.categoryId);

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
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">السعر</Label>
              <Input
                type="number"
                defaultValue={product?.price}
                {...register("price", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">التخفيض</Label>
              <Input
                type="number"
                defaultValue={product?.discount}
                {...register("discount")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">النوع</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    dir="rtl"
                    defaultValue={product?.categoryId}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="نوع المنتج" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      {product?.categories?.map((category) => (
                        <SelectItem value={category._id} key={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">البراند</Label>
              <Controller
                name="specs.brand"
                control={control}
                render={({ field }) => (
                  <Select dir="rtl" onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختار البراند" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      <SelectItem value="Apple">Apple</SelectItem>
                      <SelectItem value="Samsung">Samsung</SelectItem>
                      <SelectItem value="Honor">Honor</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">المورد</Label>
              <Controller
                name="supplierId"
                control={control}
                render={({ field }) => (
                  <Select
                    dir="rtl"
                    defaultValue={product?.supplierId}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختار المورد" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      {product?.suppliers?.map((supplier) => (
                        <SelectItem value={supplier._id} key={supplier._id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">متاح للطلب ؟</Label>
              <Controller
                name="isAvailable"
                control={control}
                render={({ field }) => (
                  <Select
                    dir="rtl"
                    defaultValue={product?.isAvailable}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختار الحالة" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      <SelectItem value="متاح">متاح</SelectItem>
                      <SelectItem value="غير متاح">غير متاح</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">صورة المنتج</Label>
              <Input
                type="file"
                placeholder="اختار صورة للمنتج"
                accept="image/*"
                defaultValue={product?.product}
                {...register("product", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="ProductDetails mt-20">
          <h1 className="mb-8">خصائص المنتج</h1>
          {/* <p className="text-sm text-muted-foreground mb-4">
          قم بملئ البيانات التالية لاضافة منتج جديد
        </p> */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">الرامات</Label>
              <Controller
                name="specs.ram"
                control={control}
                render={({ field }) => (
                  <Select
                    dir="rtl"
                    defaultValue={product?.specs?.ram}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="حجم الذاكرة العشوائية" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      <SelectItem value="2 GB">2 GB</SelectItem>
                      <SelectItem value="4 GB">4 GB</SelectItem>
                      <SelectItem value="8 GB">8 GB</SelectItem>
                      <SelectItem value="16 GB">16 GB</SelectItem>
                      <SelectItem value="32 GB">32 GB</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">الذاكرة</Label>
              <Controller
                name="specs.storage"
                control={control}
                render={({ field }) => (
                  <Select
                    dir="rtl"
                    defaultValue={product?.specs?.storage}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="حجم الذاكرة الداخلية" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      <SelectItem value="64 GB">64 GB</SelectItem>
                      <SelectItem value="128 GB">128 GB</SelectItem>
                      <SelectItem value="256 GB">256 GB</SelectItem>
                      <SelectItem value="512 GB">512 GB</SelectItem>
                      <SelectItem value="1 TB">1 TB</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">المعالج</Label>
              <Input
                type="text"
                placeholder="مثال: Intel i7, Snapdragon 888"
                defaultValue={product?.specs?.cpu}
                {...register("specs.cpu")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">حجم الشاشة</Label>
              <Input
                type="text"
                placeholder=" مثال: 15.6 بوصة, 6.7 انش"
                defaultValue={product?.specs?.screen}
                {...register("specs.screen")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">كرت الشاشة</Label>
              <Input
                type="text"
                placeholder=" مثال: NVIDIA GeForce RTX 3060"
                defaultValue={product?.specs?.gpu}
                {...register("specs.gpu")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">البطارية</Label>
              <Input
                type="text"
                placeholder="5500 ملي امبير وشاحن سريع بقوة 65 واط"
                defaultValue={product?.specs?.battery}
                {...register("specs.battery")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">البصمة</Label>
              <Input
                type="text"
                placeholder="مثال: مستشعر بصمة الأصبع"
                defaultValue={product?.specs?.fingerprint}
                {...register("specs.fingerprint")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">الكاميرا</Label>
              <Input
                type="text"
                placeholder="مثال: مستشعر 108 ميجابكسل"
                defaultValue={product?.specs?.camera}
                {...register("specs.camera")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">سنة الانتاج</Label>
              <Input
                type="text"
                placeholder="مثال: 2021"
                defaultValue={product?.specs?.model}
                {...register("specs.model")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">نظام التشغيل</Label>
              <Input
                type="text"
                placeholder="مثال: Windows 11"
                defaultValue={product?.specs?.os}
                {...register("specs.os")}
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex justify-center items-center mt-10">
          <MoboButton loading={loading} className="w-1/3">
            حفظ
          </MoboButton>
        </div>
      </form>
    </article>
  );
};

export default ProductForm;

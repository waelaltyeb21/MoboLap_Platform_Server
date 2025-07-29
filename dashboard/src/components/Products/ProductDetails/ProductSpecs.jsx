import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import React from "react";
import { Controller } from "react-hook-form";
import ProductVariants from "./ProductVariants";

const ProductSpecs = ({
  product,
  register,
  control,
  errors,
  fields,
  append,
  remove,
}) => {
  return (
    <div className="ProductDetails mt-20">
      <h1 className="mb-8">خصائص المنتج</h1>
      <div className="grid grid-cols-2 gap-6">
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
          <Controller
            name="specs.os"
            control={control}
            render={({ field }) => (
              <Select
                dir="rtl"
                defaultValue={product?.specs?.os}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر نظام التشغيل" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectItem value="Android">Android</SelectItem>
                  <SelectItem value="IOS">IOS</SelectItem>
                  <SelectItem value="Windows">Windows</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <ProductVariants
        product={product}
        register={register}
        fields={fields}
        append={append}
        remove={remove}
        errors={errors}
      />
    </div>
  );
};

export default ProductSpecs;

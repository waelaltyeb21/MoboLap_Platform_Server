"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MoboButton from "../ui/MoboButton";
import { Controller, useForm } from "react-hook-form";
import { RequestController } from "@/lib/RequestController";
import { redirect } from "next/navigation";
import DeleteAlert from "../ui/DeleteAlert";
import CustomInput from "../ui/CustomInput";

const CategoryForm = ({ category = {}, state = "create", id = "" }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category?.name,
      discount: category?.discount,
      brands: category.brands?.join(",  "),
      isAvailable: category?.isAvailable,
    },
  });

  const HandleCategoryAction = async (data) => {
    const url = `/categories${
      state === "create" ? `/create` : `/update/${id}`
    }`;

    console.log("Category: ", data);

    const method = state === "create" ? "POST" : "PUT";
    const Category = new FormData();
    Category.append("name", data?.name);
    Category.append("category", data.category[0]);
    Category.append("discount", parseInt(data.discount));
    Category.append(
      "brands",
      data?.brands?.split(/[,|-]/)?.map((brand) => brand.trim(""))
    );
    Category.append("isAvailable", true);

    const response = await RequestController(url, method, Category);

    if (response.status === 201 || response.status === 200) {
      return redirect("/dashboard/categories");
    }
  };

  const HandleDeleteCategory = async () => {
    const url = `/categories/delete/${id}`;
    const response = await RequestController(url, "DELETE");
    if (response.status === 201 || response.status === 200) {
      return redirect("/dashboard/categories");
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
          {state === "create" ? "اضافة قسم جديد" : "تعديل قسم"}
        </h1>

        {state === "update" && (
          <DeleteAlert text="حذف القسم" handler={HandleDeleteCategory} />
        )}
      </div>

      <form
        className="grid sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit(HandleCategoryAction)}
      >
        <div className="flex flex-col gap-4">
          <Label className="font-semibold">اسم القسم</Label>
          <Input
            type="text"
            placeholder="هواتف, لابتوبات"
            // defaultValue={category.name}
            {...register("name")}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="font-semibold">التخفيض</Label>
          <Input
            type="number"
            placeholder="%15"
            // defaultValue={category.discount}
            {...register("discount")}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="font-semibold">البراندات</Label>
          <Input
            type="text"
            placeholder="Samsung, Honor, Apple, Hp, Dell, Lenovo, Asus"
            // defaultValue={category.brands?.join(",  ")}
            {...register("brands")}
          />
          <span className="text-sm text-primary">
            قم بالفصل بين كل براند والاخر ب ( , ) او ( - )
          </span>
        </div>

        <CustomInput
          title="صورة الفئة"
          placeholder="اختار صورة الفئة"
          type="file"
          accept="image/*"
          fieldKey="category"
          register={register}
          required={state === "create" ? true : false}
        />

        <div className="flex flex-col gap-4">
          <Label className="font-semibold">متاح ؟</Label>
          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <Select
                dir="rtl"
                defaultValue={category?.isAvailable ? "متاح" : "غير متاح"}
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

        <div className="sm:col-span-2 flex justify-center items-center">
          <MoboButton>
            {state === "create" ? "اضافة القسم" : "تعديل القسم"}
          </MoboButton>
        </div>
      </form>
    </article>
  );
};

export default CategoryForm;

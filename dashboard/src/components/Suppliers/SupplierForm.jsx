"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import MoboButton from "../ui/MoboButton";
import { Controller, useForm } from "react-hook-form";
import { RequestController } from "@/lib/RequestController";
import { redirect } from "next/navigation";
import DeleteAlert from "../ui/DeleteAlert";

const SupplierForm = ({
  supplier = {},
  state = "create",
  id = "",
  categories,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const HandleSupplierAction = async (data) => {
    // setLoading(true);
    const url = `/suppliers${state === "create" ? `/create` : `/update/${id}`}`;
    const method = state === "create" ? "POST" : "PUT";
    console.log("Data: ", data);
    const response = await RequestController(url, method, data);
    if (response.status === 201 || response.status === 200) {
      setLoading(false);
      redirect("/dashboard/suppliers");
    }
  };

  const HandleDeleteSupplier = async () => {
    const url = `/suppliers/delete/${id}`;
    const response = await RequestController(url, "DELETE");
    if (response.status === 201 || response.status === 200) {
      redirect("/dashboard/suppliers");
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
          {state === "create" ? "اضافة مورد جديد" : "تعديل مورد"}
        </h1>

        {state === "update" && (
          <DeleteAlert text="حذف المورد" handler={HandleDeleteSupplier} />
        )}
      </div>

      <form onSubmit={handleSubmit(HandleSupplierAction)}>
        <div className="SupplierDetails">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">اسم المورد</Label>
              <Input
                type="text"
                placeholder="وائل الطيب"
                defaultValue={supplier?.name}
                {...register("name", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">مدينة المورد</Label>
              <Input
                type="text"
                placeholder="بورتسودان"
                defaultValue={supplier?.address?.city}
                {...register("address.city")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">موقع المورد</Label>
              <Input
                type="text"
                placeholder="السوق الكبير - مجمع مكة"
                defaultValue={supplier?.address?.place}
                {...register("address.place")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">متجر المورد</Label>
              <Input
                type="text"
                placeholder="موبو استور"
                defaultValue={supplier?.address?.store}
                {...register("address.store")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">هاتف المورد</Label>
              <Input
                type="number"
                placeholder="249121218005"
                defaultValue={supplier?.contact?.phone}
                {...register("contact.phone", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">رقم هاتف احتياطي</Label>
              <Input
                type="number"
                placeholder="24965132411"
                defaultValue={supplier?.contact?.secondPhone}
                {...register("contact.secondPhone")}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">نوع المنتجات</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    dir="rtl"
                    defaultValue={supplier?.categoryId}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="نوع المنتج" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      {categories?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-semibold">الحالة</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    dir="rtl"
                    defaultValue={supplier?.status}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="حالة المورد" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="pendding">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex justify-center items-center mt-10">
          <MoboButton loading={loading}>
            {state === "create" ? "اضافة المورد" : "تعديل المورد"}
          </MoboButton>
        </div>
      </form>
    </article>
  );
};

export default SupplierForm;

"use client";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { NumberFormat } from "@/lib/NumberFormat";

const Places = [
  {
    label: "حي المطار",
    value: "حي المطار",
  },
  {
    label: "سكة حديد",
    value: "سكة حديد",
  },
  {
    label: "ديم مدينة",
    value: "ديم مدينة",
  },
  {
    label: "ترانسيت",
    value: "ترانسيت",
  },
  {
    label: "الثورة",
    value: "الثورة",
  },
];

const CheckOutForm = () => {
  const router = useRouter();

  const { control, register, handleSubmit } = useForm();
  const { DataToStore, RemoveFromStorage } = useLocalStorage(
    "CartProducts",
    []
  );

  useEffect(() => {
    if (DataToStore?.length === 0) return router.push("/products");
  }, [DataToStore]);

  const PlaceOrderToWhatsapp = (data) => {
    const Order = { ...data, products: DataToStore };

    // Generate The Product Lines
    const ProductLines = Order?.products
      ?.map(
        (product, index) =>
          `${index + 1} - ${product?.name} - ${product?.variants[0].ram}/${
            product?.variants[0].storage
          }`
      )
      .join("\n");

    // Count The Total
    const total = DataToStore?.reduce(
      (prv, cur) => prv + cur?.price * cur?.quantity,
      0
    );
    // Generate The Message
    const Message = `
    *متجر موبولاب*

    طلب جديد🛒
    
    الاسم: ${Order?.name}
    رقم الهاتف: ${Order?.phone}
    رقم هاتف احتياطي: ${Order?.secondPhone}
    الحي: ${Order?.address}
    العنوان: ${Order?.place_description}
    طريقة الدفع: ${Order?.payment}
    ملاحظة: ${Order?.note}


    المنتجات:
    ${ProductLines}

    الاجمالي: ${NumberFormat(total)}
    `;

    // Clear The Cart After Sending The Order
    RemoveFromStorage();

    // Send The Order To Whatsapp
    const EncodedMessage = encodeURIComponent(Message);
    const StoreNumber = 249965132411;
    const WhatsappLink = `https://wa.me/${StoreNumber}?text=${EncodedMessage}`;
    window.open(WhatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <article>
      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-2 mb-8">
        <h1 className="text-2xl font-medium">إتمام عملية الشراء</h1>
        <p>
          يرجى تعبئة البيانات التالية لإكمال طلبك بنجاح. تأكد من صحة المعلومات
          لتفادي أي تأخير في التوصيل.
        </p>
      </div>
      {/* Steper >> Customer Info >  */}
      {/* Form */}
      <div
        className="border rounded-lg p-4"
        onSubmit={handleSubmit(PlaceOrderToWhatsapp)}
      >
        <form className="grid md:lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">الاسم كامل</Label>
            <Input
              type="text"
              id="name"
              name="name"
              {...register("name", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input
              type="number"
              id="phone"
              {...register("phone", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="second-phone">رقم هاتف بديل</Label>
            <Input
              type="number"
              id="second-phone"
              {...register("secondPhone", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address">منطقة السكن</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Select
                  id="address"
                  dir="rtl"
                  onValueChange={field.onChange}
                  name="place"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="الحي/الحارة" />
                  </SelectTrigger>
                  <SelectContent>
                    {Places?.map((place) => (
                      <SelectItem key={place?.value} value={place?.value}>
                        {place?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="place_description">وصف بسيط لمكان التوصيل</Label>
            <Input
              type="text"
              id="place_description"
              name="place_description"
              placeholder="مربع 15, المدينة الرياضية, جامعة الشرق الجديدة"
              {...register("place_description", {
                required: true,
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="payment" name="payment">
              طريقة الدفع
            </Label>
            <Controller
              name="payment"
              control={control}
              render={({ field }) => (
                <Select id="payment" onValueChange={field.onChange} dir="rtl">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختار طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="عند الاستلام">عند الاستلام</SelectItem>
                    <SelectItem value="دفع مقدم">دفع مقدم</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="note">
              <span>اضافة ملاحظة</span>
              <span>( اختياري )</span>
            </Label>
            <Textarea
              name="note"
              placeholder="عايز معاهو جراب واستيكر"
              {...register("note")}
            />
          </div>

          <div className="md:lg:col-span-2 w-full">
            <Button type="submit" className="w-full cursor-pointer">
              ارسال الطلب عبر الواتس
            </Button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default CheckOutForm;

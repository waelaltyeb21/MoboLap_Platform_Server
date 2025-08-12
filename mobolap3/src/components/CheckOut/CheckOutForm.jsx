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
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";

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
  const locale = getCookie("NEXT_LOCALE");
  const t = useTranslations("Sections.CheckOut");
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
    *${t("OrderForm.store")}*

    ${t("OrderForm.newOrder")}
    
    ${t("OrderForm.name")}: ${Order?.name}
    ${t("OrderForm.phone")} ${Order?.phone}
    ${t("OrderForm.secondPhone")}: ${Order?.secondPhone}
    ${t("OrderForm.address")}: ${Order?.address}
    ${t("OrderForm.placeDescription")}: ${Order?.place_description}
    ${t("OrderForm.payment")}: ${Order?.payment}
    ${t("OrderForm.note")}: ${Order?.note}


    ${t("OrderForm.products")}:
    ${ProductLines}

    ${t("OrderForm.total")}: ${NumberFormat(total)}
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
        <h1 className="text-2xl font-medium">{t("MainTitle")}</h1>
        <p>{t("SubTitle")}</p>
      </div>
      {/* Steper >> Customer Info >  */}
      {/* Form */}
      <div
        className="border rounded-lg p-4"
        onSubmit={handleSubmit(PlaceOrderToWhatsapp)}
      >
        <form className="grid md:lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">{t("OrderForm.name")}</Label>
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
            <Label htmlFor="phone">{t("OrderForm.phone")}</Label>
            <Input
              type="number"
              id="phone"
              {...register("phone", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="second-phone">
              <span>{t("OrderForm.secondPhone")}</span>
              <span>( {t("OrderForm.optinal")} )</span>
            </Label>

            <Input
              type="number"
              id="second-phone"
              {...register("secondPhone")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address">{t("OrderForm.address")}</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Select
                  id="address"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  onValueChange={field.onChange}
                  name="place"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t("OrderForm.addressPlaceholder")}
                    />
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
            <Label htmlFor="place_description">
              {t("OrderForm.placeDescription")}
            </Label>
            <Input
              type="text"
              id="place_description"
              name="place_description"
              placeholder={t("OrderForm.deliveryPlaceholder")}
              {...register("place_description", {
                required: true,
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="payment" name="payment">
              {t("OrderForm.payment")}
            </Label>
            <Controller
              name="payment"
              control={control}
              render={({ field }) => (
                <Select
                  id="payment"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t("OrderForm.paymentPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={t("OrderForm.paymentMethods.prepaid")}>
                      {t("OrderForm.paymentMethods.prepaid")}
                    </SelectItem>
                    <SelectItem value={t("OrderForm.paymentMethods.cash")}>
                      {t("OrderForm.paymentMethods.cash")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="note">
              <span>{t("OrderForm.note")}</span>
              <span>( {t("OrderForm.optinal")} )</span>
            </Label>
            <Textarea
              name="note"
              placeholder={t("OrderForm.note")}
              {...register("note")}
            />
          </div>

          <div className="md:lg:col-span-2 w-full">
            <Button type="submit" className="w-full cursor-pointer">
              {t("OrderForm.placeOrder")}
            </Button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default CheckOutForm;

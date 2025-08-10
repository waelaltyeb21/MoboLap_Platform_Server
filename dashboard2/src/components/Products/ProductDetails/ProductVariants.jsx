"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductVariants = ({ register, fields, append, remove }) => {
  return (
    <article className="ProductVariants mt-20">
      <h1 className="text-2xl font-medium mb-10">الاصدارات من المنتج</h1>
      <div className="">
        {fields?.map((_, index) => (
          <div
            key={index}
            className="not-first:mt-10 border rounded-lg px-4 py-8"
          >
            {/* Heading */}
            <div className="flex items-center justify-end mb-8">
              {/* <h1 className="mb-8">نسخة ال {} - {}</h1> */}
              <div className="flex gap-4">
                <Button variant="destructive" onClick={() => remove(index)}>
                  حذف نسخة
                </Button>
              </div>
            </div>
            {/* Varinats */}
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <Label className="font-semibold">حجم الذاكرة العشوائية</Label>
                <Input type="text" {...register(`variants[${index}].ram`)} />
              </div>
              <div className="flex flex-col gap-4">
                <Label className="font-semibold">حجم الذاكرة الداخلية</Label>
                <Input
                  type="text"
                  {...register(`variants[${index}].storage`)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label className="font-semibold">سعر المنتج</Label>
                <Input
                  type="number"
                  {...register(`variants[${index}].price`)}
                />
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          className="mt-8"
          variant="outline"
          onClick={() =>
            append({
              sku: Date.now(),
              ram: "",
              storage: "",
              color: "",
              price: "",
            })
          }
        >
          اضافة نسخة اخرى
        </Button>
      </div>
    </article>
  );
};

export default ProductVariants;

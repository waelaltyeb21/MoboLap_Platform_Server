import { NumberFormat } from "@/lib/NumberFormat";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import MoboButton from "../ui/MoboButton";
import { IconEdit, IconExchange } from "@tabler/icons-react";
import Link from "next/link";

const Product = ({ product }) => {
  console.log("Product: ", product?.specs);
  const Specs = [
    {
      lable: "الرام",
      value: product?.specs?.ram,
    },
    {
      lable: "التخزين",
      value: product?.specs?.storage,
    },
    {
      lable: "البطارية",
      value: product?.specs?.battery,
    },
    {
      lable: "الكاميرا",
      value: product?.specs?.camera,
    },
    {
      lable: "المعالج",
      value: product?.specs?.cpu,
    },
  ];
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/images/products/${product?.image}`;
  return (
    <div className="border p-4 rounded-lg  flex flex-col gap-4">
      {/* Product Card Image */}
      <div className="ImageContainer max-h-[250px] rounded-lg overflow-hidden">
        <Image
          src={IMAGE_URL}
          alt={product.name}
          width={250}
          height={250}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="Product_Details flex flex-col gap-4">
        {/* Product Card Header */}
        <h1>{product?.name}</h1>
        <div className="flex justify-between items-center">
          <span>{product.isAvailable}</span>
          <span>{NumberFormat(product.price)}</span>
        </div>

        {/* Product Specsfications As Badges */}
        <div className="flex flex-wrap gap-2 my-2">
          {Specs?.map((spec) => (
            <Badge variant="outline" key={spec.lable}>
              <span>
                {spec.lable} : {spec.value}
              </span>
            </Badge>
          ))}
        </div>

        {/* Product Card Footer */}
        <div className="flex flex-col gap-2">
          <MoboButton size="sm" variant="outline" className="text-black">
            <IconExchange />
            <span>المقارنة مع منتج اخر</span>
          </MoboButton>
          <MoboButton size="sm">
            <Link
              href={`/dashboard/products/${product?._id}`}
              className="flex gap-2"
            >
              <IconEdit />
              <span>تفاصيل المنتج</span>
            </Link>
          </MoboButton>
        </div>
      </div>
    </div>
  );
};

export default Product;

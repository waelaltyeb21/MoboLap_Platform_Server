import React from "react";
import { ChevronLeft, CreditCard, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import magicv5 from "../../../public/images/honor-magic-v5.webp";
// import lofi1 from "../../../public/images/lofi1.jpeg";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AnimatedNumberCounter from "../ui/animated-number-counter";

const CartProducts = [
  {
    id: 1,
    name: "هاتف آيفون 15 برو",
    price: 4499,
    quantity: 3,
    color: "فضي",
    ram: "6 جيجابايت",
    storage: "128 جيجابايت",
    image: "https://example.com/images/iphone-15-pro.jpg",
  },
  {
    id: 2,
    name: "لاب توب ديل XPS 13",
    price: 5899,
    quantity: 2,
    color: "فضي",
    ram: "16 جيجابايت",
    storage: "512 جيجابايت SSD",
    image: "https://example.com/images/dell-xps-13.jpg",
  },
  {
    id: 3,
    name: "هاتف سامسونج جالكسي S23",
    price: 3999,
    quantity: 1,
    color: "أسود",
    ram: "8 جيجابايت",
    storage: "256 جيجابايت",
    image: "https://example.com/images/galaxy-s23.jpg",
  },
  {
    id: 4,
    name: "لاب توب ماك بوك آير M2",
    price: 6299,
    quantity: 1,
    color: "فضي",
    ram: "8 جيجابايت",
    storage: "256 جيجابايت SSD",
    image: "https://example.com/images/macbook-air-m2.jpg",
  },
  {
    id: 5,
    name: "هاتف هواوي ميت 50 برو",
    price: 3599,
    quantity: 5,
    color: "أزرق",
    ram: "8 جيجابايت",
    storage: "512 جيجابايت",
    image: "https://example.com/images/huawei-mate-50-pro.jpg",
  },
  {
    id: 6,
    name: "سماعة أذن سوني WH-1000XM5",
    price: 1299,
    quantity: 2,
    color: "أسود",
    ram: "لا يوجد",
    storage: "لا يوجد",
    image: "https://example.com/images/sony-wh-1000xm5.jpg",
  },
  {
    id: 7,
    name: "شاحن لاسلكي سامسونج 15W",
    price: 249,
    quantity: 4,
    color: "أسود",
    ram: "لا يوجد",
    storage: "لا يوجد",
    image: "https://example.com/images/samsung-wireless-charger.jpg",
  },
  {
    id: 8,
    name: "حافظة آيفون 15 برو جلدية",
    price: 299,
    quantity: 3,
    color: "بني",
    ram: "لا يوجد",
    storage: "لا يوجد",
    image: "https://example.com/images/iphone-15-pro-case.jpg",
  },
  {
    id: 9,
    name: "شاشة كمبيوتر LG 27 بوصة 4K",
    price: 1599,
    quantity: 2,
    color: "أسود",
    ram: "لا يوجد",
    storage: "لا يوجد",
    image: "https://example.com/images/lg-27-inch-4k-monitor.jpg",
  },
  {
    id: 10,
    name: "كيبورد وماوس لاسلكي لوجيتك",
    price: 349,
    quantity: 3,
    color: "أسود",
    ram: "لا يوجد",
    storage: "لا يوجد",
    image: "https://example.com/images/logitech-wireless-keyboard-mouse.jpg",
  },
];

const CartList = () => {
  return (
    <article className="my-20">
      <div className="Cart-Heading flex justify-between items-center mb-8">
        <h1 className="text-xl md:lg:text-2xl font-medium">سلة الطلبات</h1>
        <Link href="/products" className="flex items-center gap-2">
          <Button className="flex items-center gap-2 cursor-pointer">
            <span>مواصلة التسوق</span>
            <ChevronLeft />
          </Button>
        </Link>
      </div>

      <div className="relative grid grid-cols-12 gap-4">
        {/* Orders Summery */}
        <div className="md:lg:sticky top-24 max-h-fit col-span-12 lg:col-span-4 p-4 border rounded-lg">
          <div className="">
            <h1 className="text-2xl font-medium">اجمالي الطلبات</h1>
          </div>

          <div className="list-of-products my-8 py-8 border-y" dir="ltr"></div>

          <div className="flex flex-col gap-4">
            <Link href="/checkout" className="w-full">
              <Button className="w-full cursor-pointer">
                <span>اتمام الطلب</span>
                <CreditCard />
              </Button>
            </Link>
          </div>
        </div>
        {/* List Of Ordered Products */}
        {/* <AnimatedNumberCounter /> */}
        <div className="col-span-12 lg:col-span-8 p-4 border rounded-lg min-h-dvh *:not-last:border-b">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="*:not-first:border-s">
                  <TableHead className="text-right">صورة المنتج</TableHead>
                  <TableHead className="text-right">المنتج</TableHead>
                  <TableHead className="text-center">السعر</TableHead>
                  <TableHead className="text-center">الكمية</TableHead>
                  <TableHead className="text-center">الاجمالي</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CartProducts?.map((product) => (
                  <TableRow key={product?.id} className="*:border-s *:p-4">
                    <TableCell>
                      <div className="Image_Container relative max-h-[120px] overflow-hidden rounded-lg">
                        <Image
                          src={magicv5}
                          alt="product_image"
                          width={120}
                          height={120}
                          className="w-auto h-auto object-contain aspect-square"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <h1 className="text-lg">
                          <Link href={`/products/${product?.id}`}>
                            {product?.name}
                          </Link>
                        </h1>

                        <div>
                          {product?.storage && (
                            <span>
                              {product?.storage} / {product?.ram}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {product?.price}
                    </TableCell>
                    <TableCell>
                      <AnimatedNumberCounter num={product?.quantity} />
                    </TableCell>
                    <TableCell className="text-center">
                      {product?.price * product?.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      <X />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartList;

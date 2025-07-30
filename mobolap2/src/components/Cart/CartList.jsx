"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, CreditCard, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import magicv5 from "../../../public/images/honor-magic-v5.webp";
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
import useLocalStorage from "@/hooks/useLocalStorage";
import { NumberFormat } from "@/lib/NumberFormat";
import Loading from "@/app/Loading";
import toast from "react-hot-toast";

const CartList = () => {
  const { GetFromStorage, SetToStorage } = useLocalStorage();
  const [CartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const StoredProducts = GetFromStorage("CartProducts", []);
    if (StoredProducts) {
      CalculateTotal(StoredProducts);
    }
    setCartProducts(StoredProducts);
    setLoading(false);
  }, []);

  // Calculate Totla Products Price
  const CalculateTotal = (products) => {
    console.log("Products: ", products);
    setTotal(
      products?.reduce((prv, cur) => prv + cur?.price * cur?.quantity, 0)
    );
  };

  // Increase Product Quantity
  const IncreaseQuantity = (id) => {
    const UpdateProducts = CartProducts?.map((prod) => {
      if (prod?.id === id) {
        return { ...prod, quantity: prod.quantity + 1 };
      }
    });
    // Update Data
    setCartProducts(UpdateProducts);
    CalculateTotal(UpdateProducts);
    SetToStorage("CartProducts", UpdateProducts);
  };
  // Decrease Product Quantity
  const DecreaseQuantity = (id) => {
    const UpdateProducts = CartProducts?.map((prod) => {
      if (prod?.id === id) {
        return { ...prod, quantity: prod.quantity - 1 };
      }
    });
    // Update Data
    setCartProducts(UpdateProducts);
    CalculateTotal(UpdateProducts);
    SetToStorage("CartProducts", UpdateProducts);
  };

  // Remove Product From Cart
  const RemoveProductFromCart = (id) => {
    const NewProducts = CartProducts?.filter((product) => product?.id !== id);
    toast.success("تم حذف المنتج من سلة الطلبات");
    setCartProducts(NewProducts);
    SetToStorage("CartProducts", NewProducts);
  };
  console.log(CartProducts);
  if (loading) return <Loading />;
  return (
    <article className="my-20">
      {CartProducts?.length === 0 && (
        <article className="min-h-[50dvh] flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl md:lg:text-4xl font-medium">
            سلة الطلبات فارغة
          </h1>
          <p className="text-lg">تصفح المنتجات وقم باضافتها الى سلة الطلبات</p>
          <Link
            href="/products"
            className="text-indigo-600 underline underline-offset-4 decoration-wavy"
          >
            الذهاب الى صفحة المنتجات
          </Link>
        </article>
      )}
      {CartProducts && CartProducts?.length !== 0 && (
        <>
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

              <div className="list-of-products my-8 py-8 border-y" dir="ltr">
                <h1 className="text-center text-4xl">{NumberFormat(total)}</h1>
              </div>

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
            <div className="col-span-12 lg:col-span-8 p- border rounded-lg *:not-last:border-b">
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
                            {product?.specs?.storage && (
                              <span>
                                {product?.specs?.storage} /{" "}
                                {product?.specs?.ram}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {NumberFormat(product?.price)}
                      </TableCell>
                      <TableCell>
                        <AnimatedNumberCounter
                          num={product?.quantity}
                          id={product?.id}
                          IncreaseQuantity={IncreaseQuantity}
                          DecreaseQuantity={DecreaseQuantity}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {NumberFormat(product?.price * product?.quantity)}
                      </TableCell>
                      <TableCell className="text-center">
                        <X onClick={() => RemoveProductFromCart(product?.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default CartList;

"use client";
import React, { useEffect, useState } from "react";
import { CreditCard, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
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
import { useTranslations } from "next-intl";

const CartList = () => {
  const t = useTranslations("Sections.Cart");
  const notify = useTranslations("Notifications");
  const { DataToStore: products, SetToStorage } = useLocalStorage(
    "CartProducts",
    []
  );
  const [CartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const ENV =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_SERVER_URL_DEV
      : process.env.NEXT_PUBLIC_SERVER_URL_PROD;
  const PRODUCT_IMAGE = `${ENV}/uploads/images/products`;

  // Update State On Mount
  useEffect(() => {
    if (products) {
      CalculateTotal(products);
    }
    console.log(products);
    setCartProducts(products);
    setLoading(false);
  }, []);

  // Calculate Totla Products Price
  const CalculateTotal = (products) => {
    setTotal(
      products?.reduce(
        (prv, cur) => prv + cur?.variants[0]?.price * cur?.quantity,
        0
      )
    );
  };

  // Increase Product Quantity
  const IncreaseQuantity = (id) => {
    const UpdateProducts = CartProducts?.map((prod) =>
      prod?._id === id ? { ...prod, quantity: prod.quantity + 1 } : prod
    );
    // Update Data
    setCartProducts(UpdateProducts);
    CalculateTotal(UpdateProducts);
    SetToStorage(UpdateProducts);
  };

  // Decrease Product Quantity
  const DecreaseQuantity = (id) => {
    const UpdateProducts = CartProducts?.map((prod) =>
      prod?._id === id ? { ...prod, quantity: prod.quantity - 1 } : prod
    );
    // Update Data
    setCartProducts(UpdateProducts);
    CalculateTotal(UpdateProducts);
    SetToStorage(UpdateProducts);
  };

  // Remove Product From Cart
  const RemoveProductFromCart = (id) => {
    const product = CartProducts?.find((prod) => prod?._id === id); // The Target Product
    const NewProducts = CartProducts?.filter((product) => product?._id !== id); // List Of Product Without The Removed One

    // Actionss
    toast.success(notify("removedFromCart")); // Notify The User
    setCartProducts(NewProducts); // Update The State
    setTotal((prev) => prev - product?.price * product?.quantity); // Update Total State
    SetToStorage(NewProducts); // Save Changes To Storage
  };
  if (loading) return <Loading />;
  return (
    <article className="my-20">
      {CartProducts?.length === 0 && (
        <article className="min-h-[50dvh] flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl md:lg:text-4xl font-medium">
            {t("EmptyCart.title")}
          </h1>
          <p className="text-lg">{t("EmptyCart.subTitle")}</p>
          <Button className="cursor-pointer mt-2 bg-indigo-600 hover:bg-indigo-700 text-slate-100">
            <Link href="/products">{t("EmptyCart.link")}</Link>
          </Button>
        </article>
      )}
      {CartProducts && CartProducts?.length !== 0 && (
        <>
          <div className="Cart-Heading flex justify-between items-center mb-8">
            <h1 className="text-xl md:lg:text-2xl font-medium">
              {t("mainTitle")}
            </h1>
            <Link href="/products" className="flex items-center gap-2">
              <Button className="cursor-pointer">
                {t("continueShopping")}
              </Button>
            </Link>
          </div>

          <div className="relative grid grid-cols-12 gap-4">
            {/* Orders Summery */}
            <div className="md:lg:sticky top-24 max-h-fit col-span-12 lg:col-span-4 p-4 border rounded-lg">
              <div className="">
                <h1 className="text-2xl font-medium">{t("productsTotal")}</h1>
              </div>

              <div className="list-of-products my-8 py-8 border-y" dir="ltr">
                <h1 className="text-center text-4xl">{NumberFormat(total)}</h1>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/checkout" className="w-full">
                  <Button className="w-full cursor-pointer">
                    <span>{t("placeOrder")}</span>
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
                    <TableHead className="text-center">
                      {t("productImage")}
                    </TableHead>
                    <TableHead className="text-right">{t("product")}</TableHead>
                    <TableHead className="text-center">{t("price")}</TableHead>
                    <TableHead className="text-center">
                      {t("quantity")}
                    </TableHead>
                    <TableHead className="text-center">{t("total")}</TableHead>
                    <TableHead className="text-center"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CartProducts?.map((product) => (
                    <TableRow key={product?._id} className="*:border-s *:p-4">
                      {console.log("Product: ", product)}
                      <TableCell>
                        <div className="Image_Container relative max-h-[120px] overflow-hidden rounded-lg">
                          <Image
                            src={`${PRODUCT_IMAGE}/${product?.image}`}
                            alt="product_image"
                            width={120}
                            height={120}
                            priority
                            className="w-auto h-auto object-contain aspect-square"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <h1 className="text-lg">
                            <Link href={`/products/${product?._id}`}>
                              {product?.name}
                            </Link>
                          </h1>

                          <div>
                            {product?.variants[0]?.storage && (
                              <span>
                                {`${product?.variants[0]?.storage}GB`} /{" "}
                                {`${product?.variants[0]?.ram}GB`}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {NumberFormat(product?.variants[0]?.price)}
                      </TableCell>
                      <TableCell>
                        <AnimatedNumberCounter
                          num={product?.quantity}
                          id={product?._id}
                          IncreaseQuantity={IncreaseQuantity}
                          DecreaseQuantity={DecreaseQuantity}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {NumberFormat(
                          product?.variants[0]?.price * product?.quantity
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <X
                          onClick={() => RemoveProductFromCart(product?._id)}
                        />
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

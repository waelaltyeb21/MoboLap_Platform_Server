import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import NotDataFound from "../NotDataFound";
import MoboButton from "../ui/MoboButton";
import Link from "next/link";
import { IconLibraryPlus } from "@tabler/icons-react";
import { NumberFormat } from "@/lib/NumberFormat";

const CompareList = ({ products, selectedProducts = [] }) => {
  const ProductsToCompare = products?.filter((product) => {
    return selectedProducts?.includes(product?._id);
  });
  return (
    <article>
      {/* If No Products Found */}
      <NotDataFound data={selectedProducts} message="لا يوجد منتجات لمقارنتها">
        <MoboButton>
          <Link href="/dashboard/products" className="flex items-center gap-2">
            <IconLibraryPlus />
            <span>اضافة منتج لمقارنته</span>
          </Link>
        </MoboButton>
      </NotDataFound>
      {/* Preview Products */}
      {/* Compare Products */}
      {/* {ProductsToCompare?.length !== 0 && (
        <Table className="border">
          <TableHeader>
            <TableRow className="*:text-right">
              <TableHead>#</TableHead>
              <TableHead>اسم المنتج</TableHead>
              <TableHead>السعر</TableHead>
              <TableHead>الرامات</TableHead>
              <TableHead>التخزين</TableHead>
              <TableHead>المعالج</TableHead>
              <TableHead>الكاميرا</TableHead>
              <TableHead>البطارية</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ProductsToCompare?.map((product, index) => (
              <TableRow key={product?._id}>
                <TableCell key={product?._id}>{index + 1}</TableCell>
                <TableCell>{product?.name}</TableCell>
                <TableCell>{NumberFormat(product?.price)}</TableCell>
                <TableCell dir="ltr" className="text-right">
                  {product?.specs?.ram}
                </TableCell>
                <TableCell dir="ltr" className="text-right">
                  {product?.specs?.storage}
                </TableCell>
                <TableCell dir="ltr" className="text-right">
                  {product?.specs?.cpu}
                </TableCell>
                <TableCell>{product?.specs?.camera}</TableCell>
                <TableCell>{product?.specs?.battery}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )} */}

      {ProductsToCompare?.length !== 0 && (
        <Table className="border font-semibold">
          <TableHeader>
            <TableRow className="*:text-right">
              <TableHead>المواصفات</TableHead>
              {ProductsToCompare.map((product) => (
                <TableHead key={product._id} className="border-s">
                  {product.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>السعر</TableCell>
              {ProductsToCompare.map((product) => (
                <TableCell key={product._id} className="border-s">
                  {NumberFormat(product?.price)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>الرامات</TableCell>
              {ProductsToCompare.map((product) => (
                <TableCell key={product._id} className="border-s">
                  {product?.specs?.ram}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>التخزين</TableCell>
              {ProductsToCompare.map((product) => (
                <TableCell key={product._id} className="border-s">
                  {product?.specs?.storage}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>المعالج</TableCell>
              {ProductsToCompare.map((product) => (
                <TableCell key={product._id} className="border-s">
                  {product?.specs?.cpu}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>الكاميرا</TableCell>
              {ProductsToCompare.map((product) => (
                <TableCell key={product._id} className="border-s">
                  {product?.specs?.camera}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>البطارية</TableCell>
              {ProductsToCompare.map((product) => (
                <TableCell key={product._id} className="border-s">
                  {product?.specs?.battery}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </article>
  );
};

export default CompareList;

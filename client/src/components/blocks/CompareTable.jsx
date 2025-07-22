import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NumberFormat } from "@/lib/NumberFormat";

const CompareTable = ({ ProductsToCompare }) => {
  return (
    <article>
      <div>
        <h1 className="text-2xl mb-4">المقارنة بين جهازين</h1>
      </div>
      <div className="border rounded-lg overflow-hidden my-10">
        <Table className="*:font-semibold">
          <TableHeader>
            <TableRow className="bg-slate-200 dark:bg-transparent *:text-right *:font-semibold">
              <TableHead>المواصفات</TableHead>
              {ProductsToCompare?.map((product) => (
                <TableHead key={product?._id} className="border-s">
                  {product?.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>السعر</TableCell>
              {ProductsToCompare?.map((product) => (
                <TableCell key={product?._id} className="border-s">
                  {NumberFormat(product?.price)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>الرامات</TableCell>
              {ProductsToCompare?.map((product) => (
                <TableCell key={product?._id} className="border-s">
                  {product?.specs?.ram}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>التخزين</TableCell>
              {ProductsToCompare?.map((product) => (
                <TableCell key={product?._id} className="border-s">
                  {product?.specs?.storage}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>المعالج</TableCell>
              {ProductsToCompare?.map((product) => (
                <TableCell key={product._id} className="border-s">
                  {product?.specs?.cpu}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>الكاميرا</TableCell>
              {ProductsToCompare?.map((product) => (
                <TableCell key={product?._id} className="border-s">
                  {product?.specs?.camera}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>البطارية</TableCell>
              {ProductsToCompare?.map((product) => (
                <TableCell key={product?._id} className="border-s">
                  {product?.specs?.battery}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </article>
  );
};

export default CompareTable;

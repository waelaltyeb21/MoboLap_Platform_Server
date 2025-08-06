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
                  <div className="flex items-center">
                    {product?.variants?.map((variant, index) => (
                      <div key={variant?.sku}>
                        <span>{NumberFormat(variant?.price)}</span>
                        {index < product?.variants?.length - 1 && (
                          <span className="mx-1">-</span>
                        )}
                      </div>
                    ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>الرامات</TableCell>
              {ProductsToCompare.map((product) => (
                <TableCell key={product._id} className="border-s">
                  <div className="flex items-center">
                    {product?.variants?.map((variant, index) => (
                      <div key={variant?.sku}>
                        <span>{`${variant?.ram}${
                          variant?.ram < 4 ? "TB" : "GB"
                        }`}</span>
                        {index < product?.variants?.length - 1 && (
                          <span className="mx-1">-</span>
                        )}
                      </div>
                    ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>التخزين</TableCell>
              {ProductsToCompare.map((product) => (
                <TableCell key={product._id} className="border-s">
                  <div className="flex items-center">
                    {product?.variants?.map((variant, index) => (
                      <div key={variant?.sku}>
                        <span>{variant?.storage + "GB"}</span>
                        {index < product?.variants?.length - 1 && (
                          <span className="mx-1">-</span>
                        )}
                      </div>
                    ))}
                  </div>
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

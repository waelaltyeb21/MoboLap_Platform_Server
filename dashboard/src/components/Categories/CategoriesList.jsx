import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

const CategoriesList = ({ categories = [] }) => {
  return (
    <article>
      {categories?.length === 0 && (
        <article className="flex items-center justify-center h-96">
          <h1>لا يوجد اقسام</h1>
        </article>
      )}
      {categories?.length !== 0 && (
        <Table className="border">
          <TableHeader>
            <TableRow className="*:text-right">
              <TableHead>#</TableHead>
              <TableHead>اسم الفئة</TableHead>
              <TableHead>عدد المنتجات</TableHead>
              <TableHead>التخفيض</TableHead>
              <TableHead>حالة الفئة</TableHead>
              <TableHead>الاجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category, index) => (
              <TableRow key={category?._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category?.name}</TableCell>
                <TableCell>{category?.productsCount}</TableCell>
                <TableCell>
                  {category?.discount === 1
                    ? category?.discount
                    : `${category?.discount}%`}
                </TableCell>
                <TableCell>
                  {category?.isAvailable ? "نشط" : "غير نشط"}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/categories/${category?._id}`}
                    className="text-primary underline underline-offset-4"
                  >
                    تفاصيل
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </article>
  );
};

export default CategoriesList;

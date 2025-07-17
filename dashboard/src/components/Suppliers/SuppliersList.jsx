import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import SuppliersFilters from "./SuppliersFilters";
import NotDataFound from "../NotDataFound";
import Heading from "../Heading";
import MoboButton from "../ui/MoboButton";

const SuppliersList = ({ suppliers = [], categories }) => {
  return (
    <>
      <NotDataFound data={suppliers} message="لا يوجد موردين">
        <Heading title="الموردين">
          <MoboButton>
            <Link href="/dashboard/suppliers/create">اضافة مورد</Link>
          </MoboButton>
        </Heading>
      </NotDataFound>
      {suppliers?.length !== 0 && (
        <article>
          <SuppliersFilters categories={categories} />
          <Table className="border">
            <TableHeader>
              <TableRow className="*:text-right">
                <TableHead>#</TableHead>
                <TableHead>اسم المورد</TableHead>
                <TableHead>نوع المنتجات</TableHead>
                <TableHead>عنوان المورد</TableHead>
                <TableHead>متجر المورد</TableHead>
                <TableHead>رقم هاتف</TableHead>
                <TableHead>رقم الهاتف الاحتياطي</TableHead>
                <TableHead>تاريخ الانضمام</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الاجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers?.map((supplier, index) => (
                <TableRow className="*:text-right" key={supplier?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{supplier?.name}</TableCell>
                  <TableCell>{supplier?.category}</TableCell>
                  <TableCell>{`${supplier?.address?.city} - ${supplier?.address?.place}`}</TableCell>
                  <TableCell>{supplier?.address?.store}</TableCell>
                  <TableCell>
                    <Link
                      href={`tel:${supplier?.contact?.phone}`}
                      className="text-primary underline underline-offset-2"
                    >
                      {supplier?.contact?.phone}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`tel:${supplier?.contact?.secondPhone}`}
                      className="text-primary underline underline-offset-2"
                    >
                      {supplier?.contact?.secondPhone}
                    </Link>
                  </TableCell>
                  <TableCell>{supplier?.joinedAt.split("T")[0]}</TableCell>
                  <TableCell>{supplier?.status}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/suppliers/${supplier?._id}`}>
                      تفاصيل
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </article>
      )}
    </>
  );
};

export default SuppliersList;

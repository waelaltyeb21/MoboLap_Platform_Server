import React from "react";
import { MagicCard } from "../magicui/magic-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

const mobiles = [
  {
    name: "Samsung Galaxy S23",
    brand: "Samsung",
    price: "$799",
    ram: "8GB",
    storage: "128GB",
    cpu: "Snapdragon 8 Gen 2",
    camera: "50 MP",
    battery: "4000mAh",
    display: "6.1 inches Dynamic AMOLED",
    os: "Android 13",
  },
  {
    name: "iPhone 14 Pro",
    brand: "Apple",
    price: "$999",
    ram: "6GB",
    storage: "128GB",
    cpu: "A16 Bionic",
    camera: "48 MP",
    battery: "3200mAh",
    display: "6.1 inches Super Retina XDR",
    os: "iOS 16",
  },
  {
    name: "OnePlus 11",
    brand: "OnePlus",
    price: "$749",
    ram: "12GB",
    storage: "256GB",
    cpu: "Snapdragon 8 Gen 2",
    camera: "50 MP",
    battery: "5000mAh",
    display: "6.7 inches Fluid AMOLED",
    os: "Android 13",
  },
];

const CompareTableRow = ({ TableRowStyle, mobiles, FieldKey, label }) => {
  return (
    <TableRow className={`${TableRowStyle}`}>
      <TableCell className="font-medium">{label}</TableCell>
      {mobiles?.map((mobile) => (
        <TableCell key={mobile?.name}>{mobile[FieldKey]}</TableCell>
      ))}
    </TableRow>
  );
};

const CompareList = ({ locale }) => {
  const t = useTranslations("Specsfications");
  const TableRowStyle = `${
    locale == "ar" ? "*:text-right" : "*:text-left"
  } *:border-s *:font-medium`;

  console.log(mobiles?.map((mobile) => Object.keys(mobile)));
  return (
    <article className="p-4 border rounded-xl overflow-hidden my-10">
      <h1 className="text-2xl font-semibold mb-4">قائمة مقارنة المنتجات</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table className="">
          {/* Header */}
          {/* <TableHeader className="bg-slate-200 dark:bg-slate-900">
            <TableRow
              className={`${TableRowStyle} text-lg border-s-slate-200 *:text-slate-700 dark:*:text-slate-200`}
            >
              <TableHead className="">المواصفات</TableHead>
              {mobiles?.map((mobile) => (
                <TableHead key={mobile?.name}>{mobile?.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader> */}

          {/* Body */}
          <TableBody>
            {Object.keys(mobiles[0]).map((FieldKey) => (
              <CompareTableRow
                key={FieldKey}
                mobiles={mobiles}
                TableRowStyle={TableRowStyle}
                label={t(FieldKey)}
                FieldKey={FieldKey}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </article>
  );
};

export default CompareList;

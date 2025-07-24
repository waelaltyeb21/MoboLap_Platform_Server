"use client";
import { Button, Table } from "@mantine/core";
import React from "react";

const CompareTable = ({ TableOfProducts, products }) => {
  return (
    <section className="my-10 grid gap-8">
      <article className="flex justify-between items-center">
        <h1 className="text-4xl font-medium">صفحة مقارنة المنتجات</h1>
        <Button>حذف المقارنات</Button>
      </article>
      <article className="grid sm:grid-cols-3 gap-4">
        <div className="min-h-56 border-2 border-slate-400 border-dashed rounded-xl flex justify-center items-center">
          <h1>المنتج الاول</h1>
        </div>

        <div className="min-h-56 border-2 border-slate-400 border-dashed rounded-xl flex justify-center items-center">
          <h1>المنتج الثاني</h1>
        </div>

        <div className="min-h-56 border-2 border-slate-400 border-dashed rounded-xl flex justify-center items-center">
          <h1>المنتج الثالث</h1>
        </div>
      </article>
      <article className="p-10 border border-slate-300 rounded-xl">
        <h1 className="text-3xl font-medium mb-8">مقارنة بين منتجين</h1>
        <Table
          data={TableOfProducts}
          className="text-lg whitespace-nowrap"
          layout="fixed"
          variant="vertical"
          verticalSpacing="sm"
          withTableBorder
          withRowBorders
          withColumnBorders
        />
      </article>
    </section>
  );
};

export default CompareTable;

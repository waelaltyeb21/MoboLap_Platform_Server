import { Button } from "@/components/ui/button";
import React from "react";

export default function Products() {
  return (
    <section className="grid grid-cols-12 gap-4">
      <article className="col-span-12 sm:col-span-2 bg-indigo-100 rounded-lg p-4">
        فلترة المنتجات
      </article>
      <article className="col-span-12 sm:col-span-10 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h1>المنتجات</h1>
          {/* Why Do You Need A Laptop / Phone ? =>> Select Modal =>> Router Url */}
          <Button>السلة</Button>
        </div>
      </article>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

export default function NotFound() {
  return (
    <section className="NotFound min-h-[60dvh] flex justify-center items-center">
      <article className="text-center flex flex-col">
        <h4 className="text-lg font-semibold">حدث خطأ - 404</h4>
        <h1 className="text-3xl font-medium">
          <q>الصفحة التي تحاول الوصول اليها غير موجودة او لم يتم انشاؤها بعد</q>
        </h1>
        <Link
          href="/"
          className="text-indigo-600 underline underline-offset-2 decoration-wavy flex justify-center items-center gap-2 mt-4"
        >
          <LinkIcon />
          <span>العودة الى الصفحة الرئيسية</span>
        </Link>
      </article>
    </section>
  );
}

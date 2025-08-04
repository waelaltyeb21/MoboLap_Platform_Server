import CategoriesList from "@/components/Categories/CategoriesList";
import Heading from "@/components/Heading";
import MoboButton from "@/components/ui/MoboButton";
import GetData from "@/lib/GetData";
import Link from "next/link";
import React from "react";

const Categories = async () => {
  const categories = await GetData("/categories");
  console.log("Categories: ", categories);
  return (
    <section>
      <Heading title="الاقسام">
        <MoboButton>
          <Link href="/dashboard/categories/create">اضافة قسم</Link>
        </MoboButton>
      </Heading>
      <CategoriesList categories={categories} />
    </section>
  );
};

export default Categories;

import CategoryForm from "@/components/Categories/CategoryForm";
import GetData from "@/lib/GetData";
import React from "react";

const CategoryDetails = async ({ params }) => {
  const { id } = await params;
  const category = await GetData(`/categories/${id}`);
  return (
    <section>
      <CategoryForm category={category} state="update" id={id} />
    </section>
  );
};

export default CategoryDetails;

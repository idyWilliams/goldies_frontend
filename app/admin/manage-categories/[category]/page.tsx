import React from "react";
import CategoryHeader from "@/components/admin-component/category-comp/CategoryHeader";
import CategoryForm from "@/components/admin-component/category-comp/CategoryForm";
import SubCategories from "@/components/admin-component/subcategory-comp/SubCategoriesTable";
import CatAndSubCatModals from "@/components/admin-component/category-comp/CatAndSubCatModals";

const Page = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <CategoryHeader />
        <CategoryForm />

        <SubCategories />
      </section>

      <CatAndSubCatModals />
    </>
  );
};

export default Page;

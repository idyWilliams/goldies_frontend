import React from "react";
import CategoryHeader from "@/components/admin-component/category-comp/CategoryHeader";
import CatAndSubCatModals from "@/components/admin-component/category-comp/CatAndSubCatModals";
import CategoryForm from "@/components/admin-component/category-comp/CategoryForm";
import SubCategories from "@/components/admin-component/subcategory-comp/SubCategories";
import AdminAuth from "@/components/admin-component/AdminAuth";

const Page = () => {
  return (
    <section>
      <section className="min-h-screen w-full bg-brand-100 px-4 py-4">
        <CategoryHeader />

        <CategoryForm />
        <SubCategories />
      </section>
      <CatAndSubCatModals />
    </section>
  );
};

export default Page;

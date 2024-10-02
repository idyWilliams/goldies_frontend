import React from "react";
import CategoryHeader from "@/components/admin-component/category-comp/CategoryHeader";

import AllCategories from "@/components/admin-component/category-comp/AllCategories";
import CatAndSubCatModals from "@/components/admin-component/category-comp/CatAndSubCatModals";

const Page = () => {
  return (
    <section>
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <CategoryHeader />

        <AllCategories />
      </section>
      <CatAndSubCatModals />
    </section>
  );
};

export default Page;

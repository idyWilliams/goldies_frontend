import React from "react";
import CategoryHeader from "@/components/admin-component/category-comp/CategoryHeader";
import AllCategories from "@/components/admin-component/category-comp/AllCategories";
import CatAndSubCatModals from "@/components/admin-component/category-comp/CatAndSubCatModals";
import { getAllCategories } from "@/services/hooks/category";

const Page = async () => {
  let data;
  let error = null;

  try {
    data = await getAllCategories();
  } catch (err) {
    error = err;
    console.error(error);
  }
  return (
    <section>
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <CategoryHeader />
        {error ? (
          <p className="flex h-[75dvh] w-full items-center justify-center">
            There was an error fetching data
          </p>
        ) : (
          <AllCategories cat={data} />
        )}
      </section>
      <CatAndSubCatModals />
    </section>
  );
};

export default Page;

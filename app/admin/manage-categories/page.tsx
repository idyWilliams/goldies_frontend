import React from "react";
import CategoryHeader from "@/components/admin-component/category-comp/CategoryHeader";
import AllCategories from "@/components/admin-component/category-comp/AllCategories";
import CatAndSubCatModals from "@/components/admin-component/category-comp/CatAndSubCatModals";
import { getAllCategories } from "@/services/hooks/category";
import getApiResponse from "@/helper/getApiResponse";
import AdminAuth from "@/components/admin-component/AdminAuth";

const Page = async () => {
  const { data, error } = await getApiResponse({ apiHook: getAllCategories });
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

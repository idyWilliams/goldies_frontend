"use client";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import { Information } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  const handleAddNewCategory = () => {
    router.push("/admin/manage-categories/create");
  };

  return (
    <>
      {/* <div className="mt-[64px]" /> */}
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <div className="mb-4 flex items-center justify-between border-b pb-4 ">
          <h1 className="text-xl font-bold">Categories</h1>
          {categories?.length >= 1 && (
            <Link
              href={"/admin/manage-categories/create"}
              className="inline-block bg-neutral-900 px-3 py-2 text-sm text-goldie-300"
            >
              New Category
            </Link>
          )}
        </div>
        {categories?.length < 1 && (
          <EmptyStateCard
            titleClassName="font-semibold text-center text-xl"
            buttonText={"Add Category"}
            handleClick={handleAddNewCategory}
            title={"No categories added yet"}
          />
        )}
      </section>
    </>
  );
};

export default Page;

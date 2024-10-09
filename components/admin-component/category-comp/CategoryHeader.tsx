"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";
import { usePathname } from "next/navigation";
import useBoundStore from "@/zustand/store";

const CategoryHeader = () => {
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
  const categoryFormRef = useBoundStore((state) => state.categoryFormRef);
  const submitStatus = useBoundStore((state) => state.submitStatus);
  const allCategories = useBoundStore((state) => state.categories);
  const isValid = useBoundStore((state) => state.isValid);

  const handleCategorySubmission = () => {
    if (categoryFormRef?.current) {
      categoryFormRef.current.requestSubmit();
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between border-b pb-4 ">
      {pathname.endsWith("/manage-categories") && (
        <>
          <h1 className="text-xl font-bold">Categories</h1>

          {allCategories.length >= 1 && (
            <Link
              href={"/admin/manage-categories/create"}
              className="inline-block rounded-md bg-neutral-900 px-3 py-2 text-sm text-goldie-300"
            >
              New Category
            </Link>
          )}
        </>
      )}
      {!pathname.endsWith("/manage-categories") && (
        <>
          <Link
            href={"/admin/manage-categories"}
            className="inline-flex cursor-pointer items-center gap-2"
          >
            <span>
              <ArrowLeft size="24" />
            </span>
            <h1 className="font-bold">
              {isNewCreate ? "New Category" : "Edit Category"}
            </h1>
          </Link>

          <button
            disabled={!isValid || submitStatus === 'submitting'}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-goldie-300 disabled:opacity-75 disabled:hover:cursor-not-allowed"
            onClick={() => handleCategorySubmission()}
          >
            {submitStatus === 'submitting'
              ? "Sending Category"
              : isNewCreate
                ? "Create Category"
                : "Save Changes"}
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryHeader;

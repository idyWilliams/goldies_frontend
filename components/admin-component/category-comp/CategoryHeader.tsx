"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";
import { usePathname } from "next/navigation";
import useBoundStore from "@/zustand/store";
import { log } from "console";

const CategoryHeader = () => {
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
  const categoryFormRef = useBoundStore((state) => state.categoryFormRef);
  const submitStatus = useBoundStore((state) => state.submitStatus);
  const setSubmitStatus = useBoundStore((state) => state.setSubmitStatus);
  const categories = useBoundStore((state) => state.categories);
  const isValid = useBoundStore((state) => state.isValid);
  const [isSubmitting, setIsSubmtting] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!pathname.endsWith("/manage-categories")) {
      if (submitStatus === "submitting") {
        setIsSubmtting(true);
      } else {
        setIsSubmtting(false);
      }

      if (isValid) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }

      // console.log(submitStatus);
      // console.log(isValid);
      // console.log(isSubmitting);
    }
  }, [isValid, submitStatus, pathname, isSubmitting]);

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

          {categories && categories.length >= 1 && (
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
          <div className="inline-flex  items-center gap-2">
            <Link
              href={"/admin/manage-categories"}
              className="inline-flex cursor-pointer items-center justify-center"
            >
              <span>
                <ArrowLeft size="24" />
              </span>
            </Link>
            <h1 className="font-bold">
              {isNewCreate ? "New Category" : "Edit Category"}
            </h1>
          </div>

          <button
            disabled={isFormValid && isSubmitting}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-goldie-300 disabled:opacity-75 disabled:hover:cursor-not-allowed"
            onClick={() => handleCategorySubmission()}
          >
            {isSubmitting
              ? "Saving Category"
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

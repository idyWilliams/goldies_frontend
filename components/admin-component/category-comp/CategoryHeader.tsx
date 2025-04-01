"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Category2 } from "iconsax-react";
import { usePathname, useRouter } from "next/navigation";
import useBoundStore from "@/zustand/store";
import { log } from "console";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import useCategories from "@/services/hooks/category/useCategories";
import { Badge } from "@/components/ui/badge";

const CategoryHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
  const categoryFormRef = useBoundStore((state) => state.categoryFormRef);
  const submitStatus = useBoundStore((state) => state.submitStatus);
  const setSubmitStatus = useBoundStore((state) => state.setSubmitStatus);
  const categories = useBoundStore((state) => state.categories);
  const isValid = useBoundStore((state) => state.isValid);
  const [isSubmitting, setIsSubmtting] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const { totalCategories } = useCategories();

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
          <div className="">
            <div className="items center flex gap-2 ">
              <Category2 variant="Bold" />
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold uppercase">Categories</h1>
                <Badge className=" bg-brand-200 text-[10px]">
                  {totalCategories}
                </Badge>
              </div>
            </div>
            <p className="text-sm"></p>
          </div>

          {categories && categories.length >= 1 && (
            <Link
              href={"/admin/manage-categories/create"}
              className="inline-block rounded-md bg-brand-200 px-3 py-2 text-sm text-brand-100"
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

          <div className="flex items-center gap-4">
            {/* <Button
              className="rounded-md bg-neutral-600  px-4 py-2 text-sm"
              onClick={() => router.back()}
            >
              Cancel
            </Button> */}

            <Button
              disabled={isFormValid && isSubmitting}
              className="rounded-md bg-brand-200 px-4 py-2 text-sm text-brand-100 disabled:opacity-75 disabled:hover:cursor-not-allowed"
              onClick={() => handleCategorySubmission()}
            >
              {isSubmitting && <CgSpinner className=" h-6 w-6 animate-spin" />}
              {isSubmitting
                ? "Saving Category..."
                : isNewCreate
                  ? "Create Category"
                  : "Save Changes"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryHeader;

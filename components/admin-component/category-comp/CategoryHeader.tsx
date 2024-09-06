import React, { RefObject } from "react";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";
import { usePathname } from "next/navigation";
import { CategoryProps } from "@/utils/categoryTypes";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

export default function CategoryHeader({
  formRef,
  loading,
}: {
  formRef: RefObject<HTMLFormElement>;
  loading: boolean;
}) {
  const pathname = usePathname();

  const isNewCreate = pathname.endsWith("/create");

  const handleCategorySubmission = () => {
    if (formRef?.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between border-b pb-4 ">
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
        disabled={loading}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-goldie-300 disabled:opacity-75 disabled:hover:cursor-not-allowed"
        onClick={() => handleCategorySubmission()}
      >
        {loading
          ? "Submitting"
          : isNewCreate
            ? "Create Category"
            : "Edit Category"}
      </button>
    </div>
  );
}

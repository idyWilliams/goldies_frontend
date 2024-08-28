import React, { RefObject } from "react";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";
import { usePathname } from "next/navigation";
import { CategoryProps } from "@/utils/categoryTypes";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

export default function CategoryHeader({
  formRef,
}: {
  formRef: RefObject<HTMLFormElement>;
}) {
  const pathname = usePathname();

  const isNewCreate = pathname.endsWith("/create");

  const handleOutsideButtonClick = () => {
    if (formRef?.current) {
      formRef.current.requestSubmit(); // Trigger the form submission using the ref
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
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-goldie-300"
        onClick={() => handleOutsideButtonClick()}
      >
        Create Category
      </button>
    </div>
  );
}

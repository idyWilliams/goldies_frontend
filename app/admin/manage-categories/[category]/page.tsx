"use client";
import CreateSubategory from "@/components/admin-component/category-comp/CreateSubcategory";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { newCategory, newSubcategory } from "@/utils/formData";
import { ArrowLeft, GalleryImport } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import Toggle from "react-toggle";
import "react-toggle/style.css";

type CategoryProps = {
  params: any;
};

type SubategoryProps = {
  category: string;
  subcategoryName: string;
  description: string;
  status: "active" | "inactive";
  image: any | File;
};

const Page = ({ params }: CategoryProps) => {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [showSub, setShowSub] = useState(false);
  const [cateStatus, setCateStatus] = useState(true);
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
  const router = useRouter();
  const { control } = useForm();

  const handleAddSubcategory = () => {
    setShowSub(true);
  };

  console.log(cateStatus, "status");

  return (
    <>
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
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
          <button className="bg-neutral-900 px-4 py-2 text-sm text-goldie-300">
            New Category
          </button>
        </div>

        <div className="md:grid md:grid-cols-[45%_1fr] md:items-center md:gap-5 xl:grid-cols-[450px_1fr]">
          <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed border-neutral-200 bg-white py-6 md:h-full xl:h-[250px]">
            <span>
              <GalleryImport size={42} />
            </span>
            <label htmlFor="file">Drop or click here to add image</label>
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              accept=".jpeg .png"
            />
          </div>

          <div className="mt-4 md:mt-0 md:h-min">
            <form
              id="create-category"
              className="md:grid md:gap-3 xl:grid-cols-2"
            >
              <EachElement
                of={newCategory}
                render={(data: any, index: number) => {
                  if (data.name === "status") {
                    return (
                      <>
                        <label
                          htmlFor={data?.name}
                          className="mt-2 inline-flex items-center gap-2 md:mt-0"
                        >
                          <span className="text-sm font-semibold">
                            {data?.label}:{" "}
                          </span>
                          <Controller
                            control={control}
                            name={data.name}
                            render={({ field: { onChange } }) => (
                              <Toggle
                                checked={cateStatus}
                                className="custom"
                                name={data.name}
                                value={cateStatus ? "yes" : "no"}
                                icons={{ checked: null, unchecked: null }}
                                onChange={(e) => {
                                  onChange(e.target.checked);
                                  setCateStatus(e.target.checked);
                                }}
                              />
                            )}
                          />
                        </label>
                      </>
                    );
                  }
                  return (
                    <>
                      <div
                        key={index}
                        className={cn(
                          "mt-3 md:mt-0",
                          data?.type === "richtext" && "xl:col-span-2",
                        )}
                      >
                        <label htmlFor={data.name} className="block w-full">
                          <span className="mb-1 inline-block text-sm font-semibold">
                            {data?.label}
                          </span>
                          {data?.type === "text" && (
                            <input
                              type={data.type}
                              id={data?.name}
                              name={data.name}
                              placeholder={data.place_holder}
                              className="form-input w-full rounded-md border-0 py-3 placeholder:text-sm placeholder:text-neutral-300 focus:ring-neutral-900"
                            />
                          )}
                          {data?.type === "richtext" && (
                            <textarea
                              id={data?.name}
                              name={data.name}
                              placeholder={data.place_holder}
                              className="form-textarea w-full resize-none rounded-md border-0 py-3 placeholder:text-sm placeholder:text-neutral-300 focus:ring-neutral-900"
                            />
                          )}
                        </label>

                        {/* <p>{data.error_message}</p> */}
                      </div>
                    </>
                  );
                }}
              />
            </form>
          </div>
        </div>

        <EmptyStateCard
          className="mt-6 p-4"
          buttonText={"Add Subategory"}
          handleClick={handleAddSubcategory}
          title={"No subcategories added yet"}
          buttonClassName="bg-neutral-900 text-goldie-300 text-sm"
          titleClassName="font-semibold text-xl text-center"
        />
      </section>
      <CreateSubategory showSub={showSub} setShowSub={setShowSub} />
    </>
  );
};

export default Page;

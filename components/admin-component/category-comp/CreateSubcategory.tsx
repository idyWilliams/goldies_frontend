"use client";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { newSubcategory } from "@/utils/formData";
import { GalleryImport } from "iconsax-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const CreateSubategory = ({
  showSub,
  setShowSub,
}: {
  showSub: boolean;
  setShowSub: any;
}) => {
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
  const [cateStatus, setCateStatus] = useState(true);
  const { control } = useForm();

  const handleClose = () => {
    setShowSub(false);
  };
  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed left-0 top-0 flex h-full w-full justify-center bg-black bg-opacity-20 px-4 pb-5 pt-[80px] opacity-0 duration-300",
          showSub && "pointer-events-auto opacity-100",
        )}
      >
        <div className="hide-scrollbar h-full w-full overflow-y-auto">
          <div className="h-min bg-white pb-4 sm:mx-auto sm:w-[600px] md:w-[500px]">
            <div className="flex items-center justify-between bg-neutral-50 px-4 py-3">
              <h2 className="font-semibold">
                {isNewCreate ? "Add Subcategory" : "Edit Subcategory"}
              </h2>
              <span className="cursor-pointer" onClick={handleClose}>
                <BsX size={24} />
              </span>
            </div>
            <div className="px-4 pt-4">
              <form id="create-subcategory">
                <EachElement
                  of={newSubcategory}
                  render={(data: any, index: number) => {
                    if (data.name === "status") {
                      return (
                        <>
                          <label
                            htmlFor={data?.name}
                            className="mt-2 inline-flex items-center gap-2"
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
                        <div key={index}>
                          <label
                            htmlFor={data.name}
                            className="mb-3 block w-full"
                          >
                            <span className="mb-1 inline-block text-sm font-semibold">
                              {data?.label}
                            </span>
                            {data?.type === "text" && (
                              <input
                                type={data.type}
                                id={data?.name}
                                name={data.name}
                                placeholder={data.place_holder}
                                className="form-input w-full rounded-md border-0 bg-neutral-50 py-3 placeholder:text-sm placeholder:text-neutral-300 focus:ring-neutral-900"
                              />
                            )}
                            {data?.type === "richtext" && (
                              <textarea
                                id={data?.name}
                                name={data.name}
                                placeholder={data.place_holder}
                                className="form-input w-full rounded-md border-0 bg-neutral-50 py-3 placeholder:text-sm placeholder:text-neutral-300 focus:ring-neutral-900"
                              />
                            )}
                          </label>

                          {/* <p>{data.error_message}</p> */}
                        </div>
                      </>
                    );
                  }}
                />

                <div className="mt-5">
                  <h3 className="mb-2 font-semibold">Subcategory Image</h3>
                  <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed border-neutral-200 bg-neutral-100 py-6">
                    <span>
                      <GalleryImport size={42} />
                    </span>
                    <label htmlFor="file">
                      Drop or click here to add image
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                      accept=".jpeg .png"
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="submit"
                    className="rounded-md bg-neutral-900 px-6 py-2 text-sm font-semibold text-goldie-300"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-md bg-goldie-300 px-6 py-2 text-sm font-semibold text-neutral-900"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubategory;

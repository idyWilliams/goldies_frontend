"use client";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { SubCategoryProps, SubcategoriesProps } from "@/utils/categoryTypes";
import { newSubcategory } from "@/utils/formData";
import { yupResolver } from "@hookform/resolvers/yup";
import { GalleryImport } from "iconsax-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import * as yup from "yup";

const schema = yup.object().shape({
  // parentCategory: yup.string().required("Parent category is required"),
  subCategoryName: yup.string().required("Subcategory name is required"),
  description: yup.string().required("Subcategory description is required"),
});

const CreateSubategory = ({
  showSub,
  setShowSub,
  setSubcategories,
  selectedSubcategory,
}: {
  showSub: boolean;
  setShowSub: any;
  category: any;
  setSubcategories: React.Dispatch<React.SetStateAction<SubcategoriesProps[]>>;
  selectedSubcategory?: any;
}) => {
  const [cateStatus, setCateStatus] = useState(true);
  const [dragging, setDragging] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
  const [subcategory, setSubcategory] = useState<SubCategoryProps>({
    // parentCategory: "",
    subCategoryName: "",
    description: "",
    status: "active",
  });

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  // HANDLE SUBCATEGORY FORM MODAL SUBMISSION
  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    console.log({ ...data, image: imageUrl, status: subcategory?.status });
    if (image) {
      setSubcategories((prev: any) => {
        return [
          ...prev,
          { ...data, image: imageUrl, status: subcategory?.status },
        ];
      });
      reset();
      setImage(null);
      setImageUrl("");
      setShowSub(false);
    }
  };

  // CLOSE SUCATEGORY FORM MODAL
  const handleClose = () => {
    setShowSub(false);
  };

  // ONDRAG EVENT LISTENER FUNCTIONS FOR IMAGE UPLOAD
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  // HANDLE IMAGE FILE UPLOAD
  const handleChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  // REMOVE IMAGE FILE UPLOAD
  const handleRemoveCateImg = () => {
    setImage(null);
    setImageUrl("");
    setDragging(false);
  };

  // HANDLE ONCHANGE EVENT ON FORM INPUT FILEDS
  const handleSubChange = (e: any, isChecked?: boolean) => {
    const name = e.target.name;
    const value = e.target.value;

    setSubcategory((prev: any) => {
      return {
        ...prev,
        [name]: value,
        // status: isChecked ? "active" : "inactive",
      };
    });

    console.log(name, value, "target");
  };

  console.log(subcategory);

  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed left-0 top-0 flex h-fit w-full justify-center bg-black bg-opacity-20 px-4 pb-5 pt-[80px] opacity-0 duration-300",
          showSub && "pointer-events-auto opacity-100",
        )}
      >
        {" "}
        modal
        <div className=" h-full w-full overflow-y-auto">
          <div className="h-min bg-white pb-4 sm:mx-auto sm:w-[450px] md:w-[500px]">
            <div className="flex items-center justify-between bg-neutral-50 px-4 py-3">
              <h2 className="font-semibold">
                {isNewCreate ? "Add Subcategory" : "Edit Subcategory"}
              </h2>
              <span className="cursor-pointer" onClick={handleClose}>
                <BsX size={24} />
              </span>
            </div>
            <div className="px-4 pt-2">
              <form id="create-subcategory" onSubmit={handleSubmit(onSubmit)}>
                <EachElement
                  of={newSubcategory}
                  render={(data: any, index: number) => {
                    if (data.name === "status") {
                      return (
                        // STATUS TOGGLE
                        <>
                          <label
                            htmlFor={data?.name}
                            className="inline-flex items-center gap-2"
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
                                  defaultChecked={true}
                                  className="custom"
                                  name={data.name}
                                  value={cateStatus ? "active" : "inactive"}
                                  icons={{ checked: null, unchecked: null }}
                                  onChange={(e) => {
                                    onChange(e.target.checked);
                                    setCateStatus(e.target.checked);
                                    handleSubChange(e);
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
                            className="mb-2 block w-full"
                          >
                            <span
                              className={cn(
                                "mb-1 inline-block text-sm font-semibold",
                                data?.required &&
                                  "after:inline-block after:pl-0.5 after:text-red-600 after:content-['*']",
                              )}
                            >
                              {data?.label}
                            </span>
                            {data?.type === "text" && (
                              <input
                                {...register(data.name)}
                                type={data.type}
                                id={data?.name}
                                name={data.name}
                                value={subcategory[data?.name] || ""}
                                placeholder={data.place_holder}
                                onChange={(event: any) =>
                                  handleSubChange(event)
                                }
                                className="form-input w-full rounded-md border-0 bg-neutral-50 py-3 text-sm placeholder:text-sm placeholder:text-neutral-400 focus:ring-neutral-900 md:text-base"
                              />
                            )}
                            {data?.type === "richtext" && (
                              <textarea
                                {...register(data.name)}
                                id={data?.name}
                                name={data?.name}
                                value={subcategory[data?.name] || ""}
                                onChange={(event: any) =>
                                  handleSubChange(event)
                                }
                                placeholder={data.place_holder}
                                className="form-input w-full rounded-md border-0 bg-neutral-50 py-3 text-sm placeholder:text-sm placeholder:text-neutral-400 focus:ring-neutral-900 md:text-base"
                              />
                            )}
                          </label>

                          {errors?.[data?.name] && (
                            <p
                              className={cn(
                                "hidden text-sm text-red-600",
                                errors?.[data?.name] && "block",
                              )}
                            >
                              {data?.error_message}
                            </p>
                          )}
                        </div>
                      </>
                    );
                  }}
                />

                <div className="mt-5">
                  <h3 className="mb-2 text-sm font-semibold">
                    Subcategory Image
                  </h3>
                  <input
                    type="file"
                    name="file2"
                    id="file2"
                    className="hidden"
                    onChange={(e) => handleChange(e)}
                    accept="image/jpeg, image/png, image/webp"
                  />
                  {!imageUrl && (
                    <div
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className={cn(
                        "flex h-[250px] w-full flex-col items-center justify-center rounded-md border border-dashed border-neutral-200 bg-zinc-50 px-4 py-4 xl:h-[250px]",
                        dragging &&
                          "border-2 border-solid border-neutral-900 bg-sky-100 shadow-inner",
                      )}
                    >
                      <span className="mb-3 inline-block text-neutral-400 opacity-50">
                        <GalleryImport size={60} />
                      </span>
                      <label
                        htmlFor="file2"
                        className="cursor-pointer text-balance text-center text-neutral-400"
                      >
                        Drop image here or <u>click here</u> to upload image
                      </label>
                    </div>
                  )}

                  {imageUrl && (
                    <div className="group relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-md md:h-[350px] xl:h-[250px]">
                      <Image
                        src={imageUrl}
                        alt="upload-image"
                        width={200}
                        height={300}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-black bg-opacity-25 opacity-0 duration-300 group-hover:opacity-100">
                        <label
                          htmlFor="file2"
                          className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                        >
                          Replace
                        </label>
                        <button
                          onClick={handleRemoveCateImg}
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
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

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
import CreateSubcategoryImage from "./CreateSubcategoryImage";
import CreateSubcategoryInput from "./CreateSubcategoryInput";
import SubCategoryBtn from "./SubCategoryBtn";
import { uploadImageToFirebase } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createSubCategory } from "@/services/hooks/category";

const schema = yup.object().shape({
  // parentCategory: yup.string().required("Parent category is required"),
  subCategoryName: yup.string().required("SubCategory name is required"),
  description: yup.string().required("Description is required"),
  image: yup.mixed().required("Image is required"),
  status: yup.boolean().required("Status is required"),
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
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
  const newSubCategory = useMutation({
    mutationFn: createSubCategory,
  });

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      subCategoryName: "",
      description: "",
      image: null,
      status: true,
    },
  });

  // WATCH IMAGE FIELD TO TRIGGER SETTING IMAGEURL
  const file = watch("image") && watch("image")[0];

  // HANDLE SUBCATEGORY FORM MODAL SUBMISSION
  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();
    console.log(data);
    const file = data.image[0];

    console.log(file);

    // console.log({ ...data, image: imageUrl, status: subcategory?.status });
    // if (image) {
    //   setSubcategories((prev: any) => {
    //     return [
    //       ...prev,
    //       { ...data, image: imageUrl, status: subcategory?.status },
    //     ];
    //   });
    //   reset();
    //   setImage(null);
    //   setImageUrl("");
    //   setShowSub(false);
    // }

    try {
      const imageURL = await uploadImageToFirebase(file);
      console.log(imageURL);
      const category = {
        ...data,
        image: imageURL,
      };
      console.log(category);

      newSubCategory
        .mutateAsync(category)
        .then((res) => {
          console.log(res);
          reset();
          setShowSub(false);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };

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
                <CreateSubcategoryInput
                  control={control}
                  register={register}
                  errors={errors}
                />

                <CreateSubcategoryImage
                  file={file}
                  register={register}
                  errors={errors}
                />

                <SubCategoryBtn handleClose={handleClose} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubategory;

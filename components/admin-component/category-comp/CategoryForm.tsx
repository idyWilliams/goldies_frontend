"use client";

import React, { ReactNode, RefObject, useEffect, useState } from "react";
import * as yup from "yup";
import CategoryImage from "./CategoryImage";
import EachElement from "@/helper/EachElement";
import { newCategory } from "@/utils/formData";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryInputs from "./CategoryInputs";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  categoryName: yup.string().required("Subcategory name is required"),
  categorySlug: yup.string().required("Subcategory slug is required"),
  description: yup.string().required("Subcategory description is required"),
  // image: yup.mixed().test("imageSize", "Image Size is too large", (value) => {
  //   // console.log(value[0]);

  //   if (!value || value.length === 0) return true;

  //   const file = value[0];
  //   return file.size <= 3000000; // 3MB
  // }),
  // status: yup.boolean().required("Status is required"),
});

export default function CategoryForm({
  formRef,
}: {
  formRef: RefObject<HTMLFormElement>;
}) {
  const [dragging, setDragging] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName: "Milestone Cakes",
      categorySlug: "milestone-cakes",
      description:
        "Milestone cakes commemorate significant life events and achievements.",
      // status: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(image);
    console.log(data.image[0]);

    // data.image = image?.name;

    reset();
  };

  // FILE UPLOAD FUNCTIONS
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

  const handleChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = e.target.files && e.target.files[0];
    console.log(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  const handleRemoveCateImg = () => {
    setImage(null);
    setImageUrl("");
    setDragging(false);
  };
  const file = watch("image") && watch("image")[0];

  useEffect(() => {
    // console.log(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  }, [file]);

  useEffect(() => {
    reset({
      categoryName: "Milestone Cakes",
      categorySlug: "milestone-cakes",
      description:
        "Milestone cakes commemorate significant life events and achievements.",
      // image: null,
      // status: true,
    });
    // setCategory({
    //   categoryName: "Milestone Cakes",
    //   categorySlug: "milestone-cakes",
    //   description:
    //     "Milestone cakes commemorate significant life events and achievements.",
    // });
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="create-category" ref={formRef}>
      <div className="md:grid md:grid-cols-[45%_1fr] md:items-center md:gap-5 xl:grid-cols-[450px_1fr]">
        <input
          type="file"
          id="file1"
          {...register("image")}
          className="hidden"
          // onChange={(e) => handleChange(e)}
          accept="image/jpeg, image/png, image/webp"
        />

        <CategoryImage
          imageUrl={imageUrl}
          dragging={dragging}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleRemoveCateImg={handleRemoveCateImg}
        />

        <div className="mt-4 md:mt-0 md:h-min">
          <div className="md:grid md:gap-3 xl:grid-cols-2">
            <CategoryInputs
              control={control}
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

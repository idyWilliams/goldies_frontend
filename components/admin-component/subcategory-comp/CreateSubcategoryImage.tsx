import { cn } from "@/helper/cn";
import { SubCategoryImageProps } from "@/utils/categoryTypes";
import { GalleryImport } from "iconsax-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function CreateSubcategoryImage({
  register,
  errors,
  imageUrl,
  setImageUrl,
}: SubCategoryImageProps) {

  const [dragging, setDragging] = useState<boolean>(false);



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
      setImageUrl(url);
    }
  };

  const handleRemoveCateImg = () => {
    setImageUrl("");
    setDragging(false);
  };

  return (
    <div className="mt-5">
      <h3 className="mb-2 text-sm font-semibold">Subcategory Image</h3>

      <p className={cn("hidden text-sm text-red-600", errors.image && "block")}>
        {errors.image && (errors.image.message as string)}
      </p>
      <input
        type="file"
        id="file2"
        {...register("image")}
        className="hidden"
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
  );
}

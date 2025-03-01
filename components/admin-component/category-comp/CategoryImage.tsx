import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/helper/cn";
import { GalleryImport } from "iconsax-react";
import { CategoryImageProps } from "@/utils/categoryTypes";
import Placeholder from "@/public/assets/placeholder3.png";
import { deleteImageFromFirebase } from "@/lib/utils";

export default function CategoryImage({
  register,
  errors,
  imageUrl,
  setImageUrl,
  handleRemoveImage,
}: CategoryImageProps & { handleRemoveImage: () => void }) {
  const [dragging, setDragging] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

  return (
    <div className="flex flex-col">
      <input
        type="file"
        id="file1"
        size={3000000}
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
            "flex h-[250px] w-full flex-col items-center justify-center rounded-md border border-dashed border-neutral-200 bg-zinc-50 px-4 py-6 md:h-full xl:h-[250px]",
            dragging &&
              "border-2 border-solid border-neutral-900 bg-sky-100 shadow-inner",
          )}
        >
          <span className="mb-3 inline-block text-neutral-400 opacity-50">
            <GalleryImport size={60} />
          </span>
          <label
            htmlFor="file1"
            className="cursor-pointer text-balance text-center text-neutral-400"
          >
            Drop image here or <u>click here</u> to upload image
          </label>
        </div>
      )}

      {imageUrl && (
        <div className="group relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-md md:h-[350px] xl:h-[250px]">
          {!isLoaded && (
            <Image
              src={Placeholder}
              alt="placeholder"
              placeholder="blur"
              priority
              fill
              sizes="(max-width: 1440px) 33vw"
              className="animate-pulse object-cover object-center duration-300 group-hover:scale-110"
            />
          )}

          <Image
            src={imageUrl}
            alt="upload-image"
            fill
            sizes="(max-width: 1440px) 33vw"
            className={`object-cover object-center  ${isLoaded ? "opacity-100" : "opacity-0"} `}
            onLoad={() => setIsLoaded(true)}
          />

          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-black bg-opacity-25 opacity-0 duration-300 group-hover:opacity-100">
            <label
              htmlFor="file1"
              className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
            >
              Replace
            </label>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <p
        className={cn(
          "hidden text-sm text-red-600",
          ` ${errors["image"] && "block"}`,
        )}
      >
        {errors["image"]?.message as string}
      </p>
    </div>
  );
}

import { ImagesTypes, ProductImagesPropTypes } from "@/types/products";
import Image from "next/image";
import React from "react";

interface IUploadProductImages extends ProductImagesPropTypes {
  handleRemove: (imgNo: number) => Promise<void>;
}

const CreateProductImages = ({
  images,
  setImages,
  imagesRef,
  handleRemove,
}: IUploadProductImages) => {
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const fileIndex = index - 1;

    const file = e.target.files?.[0];
    const name = e.target.name as keyof ImagesTypes;

    if (file) {
      const url = URL.createObjectURL(file);
      setImages((img: ImagesTypes) => {
        return {
          ...img,
          [name]: url,
        };
      });
      imagesRef.current[fileIndex] = file;
    }
  };

  return (
    <>
      {[1, 2, 3, 4].map((imgNo) => {
        const imageKey = `image${imgNo}` as keyof ImagesTypes;
        return (
          <div
            key={imgNo}
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]"
          >
            {!images[imageKey] && (
              <div className="text-balance px-3 text-center text-sm text-neutral-400">
                Drop files here or
                <label
                  htmlFor={`image${imgNo}`}
                  className="cursor-pointer italic underline"
                >
                  click here
                </label>
                &nbsp;to upload.
              </div>
            )}
            <input
              type="file"
              name={`image${imgNo}`}
              id={`image${imgNo}`}
              onChange={(e) => handleChange(e, imgNo)}
              className="hidden"
            />
            {images[imageKey] && (
              <div className="group absolute left-0 top-0 h-full w-full">
                <Image
                  src={images[imageKey]}
                  alt="image"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                  <label
                    htmlFor={`image${imgNo}`}
                    className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                  >
                    Replace
                  </label>
                  <button
                    type="button"
                    className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
                    onClick={() => handleRemove(imgNo)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CreateProductImages;

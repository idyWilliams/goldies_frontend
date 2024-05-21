import Image from "next/image";
import React, { useState } from "react";

export default function ProductImages() {
  const [images, setImages] = useState<any>({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });

  const handleRemove = (imgNo: number) => {
    setImages((img: any) => {
      return { ...img, [`image${imgNo}`]: "" };
    });
    // setImage1(null);
  };

  const handleChange = (e: any) => {
    const file = e.target.files && e.target.files[0];
    const name = e.target.name;

    // setImage1
    if (file) {
      const url = URL.createObjectURL(file);
      setImages((img: any) => {
        return {
          ...img,
          [name]: url,
        };
      });
      console.log(url, "url");
    }
    console.log(name, "nameee", file, e.target.name, e.target);
  };

  return (
    <section>
      <div>
        <div className="mt-6 grid h-full grid-cols-2 grid-rows-[repeat(2,200px)] gap-4">
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
            {!images.img1 && (
              <div className="text-balance px-3 text-center text-neutral-400">
                Drop files here or
                <label
                  htmlFor="img1"
                  className="cursor-pointer italic underline"
                >
                  click here
                </label>
                &nbsp;to upload.
              </div>
            )}
            <input
              type="file"
              name="img1"
              id="img1"
              onChange={(e: any) => handleChange(e)}
              className="hidden"
            />
            {images?.img1 && (
              <div className="group absolute left-0 top-0 h-full w-full">
                <Image
                  src={images.img1}
                  alt="image"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                  <label
                    htmlFor="img1"
                    className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                  >
                    Replace
                  </label>
                  <button
                    className="cursor-pointer rounded-md bg-main px-6 py-2"
                    onClick={() => handleRemove(1)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
            {!images.img2 && (
              <div className="text-balance px-3 text-center text-neutral-400">
                Drop files here or
                <label
                  htmlFor="img2"
                  className="cursor-pointer italic underline"
                >
                  click here
                </label>
                &nbsp;to upload.
              </div>
            )}
            <input
              type="file"
              name="img2"
              id="img2"
              onChange={(e: any) => handleChange(e)}
              className="hidden"
            />
            {images.img2 && (
              <div className="group absolute left-0 top-0 h-full w-full">
                <Image
                  src={images.img2}
                  alt="image"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                  <label
                    htmlFor="img2"
                    className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                  >
                    Replace
                  </label>
                  <button
                    className="cursor-pointer rounded-md bg-main px-6 py-2"
                    onClick={() => handleRemove(2)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
            {!images.img3 && (
              <div className="text-balance px-3 text-center text-neutral-400">
                Drop files here or
                <label
                  htmlFor="img3"
                  className="cursor-pointer italic underline"
                >
                  click here
                </label>
                &nbsp;to upload.
              </div>
            )}
            <input
              type="file"
              name="img3"
              id="img3"
              onChange={(e: any) => handleChange(e)}
              className="hidden"
            />
            {images.img3 && (
              <div className="group absolute left-0 top-0 h-full w-full">
                <Image
                  src={images.img3}
                  alt="image"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                  <label
                    htmlFor="img3"
                    className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                  >
                    Replace
                  </label>
                  <button
                    className="cursor-pointer rounded-md bg-main px-6 py-2"
                    onClick={() => handleRemove(3)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
            {!images.img4 && (
              <div className="text-balance px-3 text-center text-neutral-400">
                Drop files here or
                <label
                  htmlFor="img4"
                  className="cursor-pointer italic underline"
                >
                  click here
                </label>
                &nbsp;to upload.
              </div>
            )}
            <input
              type="file"
              name="img4"
              id="img4"
              onChange={(e: any) => handleChange(e)}
              className="hidden"
            />
            {images.img4 && (
              <div className="group absolute left-0 top-0 h-full w-full">
                <Image
                  src={images.img4}
                  alt="image"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                  <label
                    htmlFor="img4"
                    className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                  >
                    Replace
                  </label>
                  <button
                    className="cursor-pointer rounded-md bg-main px-6 py-2"
                    onClick={() => handleRemove(4)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

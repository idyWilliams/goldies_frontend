"use client";
import MultiSelectOption from "@/components/MultiSelect";
import Image from "next/image";
import cake1 from "../../../public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import React, { useState } from "react";
import CakeCategory from "@/components/CakeCategory";
import { Category } from "iconsax-react";
import { MultiSelect } from "react-multi-select-component";
import CustomSelect from "@/components/CustomSelect";
import MobileCreateStep1 from "@/components/admin-component/MobileCreateStep1";
import MobileCreateStep2 from "@/components/admin-component/MobileCreateStep3";
import MobileCreateStep3 from "@/components/admin-component/MobileCreateStep2";
import CreateProductLayout from "@/components/admin-component/create-product/CreateProductLayout";

const options = [
  { label: "Milestone Cakes", value: "milestone cakes", disabled: false },
  { label: "Kids' Cakes", value: "kids cakes" },
  { label: "Cupcakes", value: "cupcakes", disabled: false },
  { label: "Wedding Cakes", value: "wedding cakes" },
];

export type SelectOptionType = {
  label: string | number;
  value: string | number;
  description?: string;
} | null;

export default function Page() {
  const [category, setCategory] = useState<SelectOptionType>(null);
  const [subCategory, setSubCategory] = useState([]);

  const [images, setImages] = useState<any>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const handleRemove = (imgNo: number) => {
    setImages((img: any) => {
      return { ...img, [`image${imgNo}`]: "" };
    });
    // setImage1(null);
    console.log("hello");
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
    console.log(file, e.target.name);
  };
  return (
    <section className="p-6">
      <div className="hidden md:block">
        <div className="flex justify-between">
          <h1 className="font-bold">Create New Products</h1>
          <button className="rounded-md bg-black px-10 py-2 text-[12px] text-main">
            Save Changes
          </button>
        </div>
        <hr className="my-6 text-neutral-400" />
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h1 className="mb-6 font-bold">Product Information</h1>
            <div className="h-full rounded-md border border-neutral-300 p-4">
              <label htmlFor="ProductName" className="">
                <span className="mb-1 block">Product Name</span>
                <input
                  name="productName"
                  type="text"
                  autoComplete="off"
                  id="productName"
                  placeholder="Product name"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100"
                />
              </label>
              <label htmlFor="productDescription" className="">
                <span className="mb-1 block">Product Description</span>
                <textarea
                  name="productDescription"
                  autoComplete="off"
                  id="productDescription"
                  placeholder="Product Description"
                  className="h-[110px] w-full resize-none rounded-sm border-none bg-gray-100"
                />
              </label>
              <div className="flex gap-4">
                <div className="mt-3 w-full">
                  <h1 className="mb-1">Product Category</h1>

                  <CustomSelect
                    selectedOption={category}
                    setSelectOption={setCategory}
                    options={options || []}
                  />
                </div>
                <div className="mt-3 w-full">
                  <h1 className="mb-1">Product Subcategory</h1>
                  <MultiSelect
                    disabled={category == null}
                    options={options}
                    value={subCategory}
                    onChange={setSubCategory}
                    labelledBy="Select subcategory"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="mb-6 font-bold">Product Images</h1>
            <div className="grid h-full grid-cols-2 gap-4 rounded-md border border-neutral-300 p-4">
              <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
                {!images.image1 && (
                  <div className="text-balance px-3 text-center text-neutral-400">
                    Drop files here or
                    <label
                      htmlFor="image1"
                      className="cursor-pointer italic underline"
                    >
                      click here
                    </label>
                    &nbsp;to upload.
                  </div>
                )}
                <input
                  type="file"
                  name="image1"
                  id="image1"
                  onChange={(e: any) => handleChange(e)}
                  className="hidden"
                />
                {images.image1 && (
                  <div className="group absolute left-0 top-0 h-full w-full">
                    <Image
                      src={images.image1}
                      alt="image"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                      <label
                        htmlFor="image1"
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
                {!images.image2 && (
                  <div className="text-balance px-3 text-center text-neutral-400">
                    Drop files here or
                    <label
                      htmlFor="image2"
                      className="cursor-pointer italic underline"
                    >
                      click here
                    </label>
                    &nbsp;to upload.
                  </div>
                )}
                <input
                  type="file"
                  name="image2"
                  id="image2"
                  onChange={(e: any) => handleChange(e)}
                  className="hidden"
                />
                {images.image2 && (
                  <div className="group absolute left-0 top-0 h-full w-full">
                    <Image
                      src={images.image2}
                      alt="image"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                      <label
                        htmlFor="image2"
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
                {!images.image3 && (
                  <div className="text-balance px-3 text-center text-neutral-400">
                    Drop files here or
                    <label
                      htmlFor="image3"
                      className="cursor-pointer italic underline"
                    >
                      click here
                    </label>
                    &nbsp;to upload.
                  </div>
                )}
                <input
                  type="file"
                  name="image3"
                  id="image3"
                  onChange={(e: any) => handleChange(e)}
                  className="hidden"
                />
                {images.image3 && (
                  <div className="group absolute left-0 top-0 h-full w-full">
                    <Image
                      src={images.image3}
                      alt="image"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                      <label
                        htmlFor="image3"
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
                {!images.image4 && (
                  <div className="text-balance px-3 text-center text-neutral-400">
                    Drop files here or
                    <label
                      htmlFor="image4"
                      className="cursor-pointer italic underline"
                    >
                      click here
                    </label>
                    &nbsp;to upload.
                  </div>
                )}
                <input
                  type="file"
                  name="image4"
                  id="image4"
                  onChange={(e: any) => handleChange(e)}
                  className="hidden"
                />
                {images.image4 && (
                  <div className="group absolute left-0 top-0 h-full w-full">
                    <Image
                      src={images.image4}
                      alt="image"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                      <label
                        htmlFor="image4"
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
          <div className="mt-10">
            <h1 className="mb-6 font-bold">Product Pricing</h1>
            <div className="flex h-full gap-4 rounded-md border border-neutral-300 p-4">
              <label htmlFor="priceFrom" className="block">
                <span className="mb-1 inline-block">Price From</span>
                <input
                  name="priceFrom"
                  type="text"
                  autoComplete="off"
                  id="priceFrom"
                  placeholder="Product price ranges from"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100"
                />
              </label>
              <label htmlFor="priceTo" className="block">
                <span className="mb-1 inline-block">Price To</span>
                <input
                  name="priceTo"
                  type="text"
                  autoComplete="off"
                  id="priceTo"
                  placeholder="Product price ranges to"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100"
                />
              </label>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="mb-6 font-bold">Product Variant</h1>
            <div className="grid h-full grid-cols-2 gap-4 rounded-md border border-neutral-300 p-4">
              <label htmlFor="ProductName" className="block">
                <span className="mb-1 inline-block">Product Name</span>
                <input
                  name="productName"
                  type="text"
                  autoComplete="off"
                  id="productName"
                  placeholder="Product name"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100"
                />
              </label>
              <label htmlFor="ProductName" className="block">
                <span className="mb-1 inline-block">Product Name</span>
                <input
                  name="productName"
                  type="text"
                  autoComplete="off"
                  id="productName"
                  placeholder="Product name"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100"
                />
              </label>
              <label htmlFor="ProductName" className="block">
                <span className="mb-1 inline-block">Product Name</span>
                <input
                  name="productName"
                  type="text"
                  autoComplete="off"
                  id="productName"
                  placeholder="Product name"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100"
                />
              </label>
              <label htmlFor="ProductName" className="block">
                <span className="mb-1 inline-block">Product Name</span>
                <input
                  name="productName"
                  type="text"
                  autoComplete="off"
                  id="productName"
                  placeholder="Product name"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CreateProductLayout />
      </div>
      <div className="block md:hidden">
        <MobileCreateStep1 />
      </div>

      <div className="block md:hidden">
        <MobileCreateStep2 />
      </div>
      <div className="block md:hidden">
        <MobileCreateStep3 />
      </div>
    </section>
  );
}

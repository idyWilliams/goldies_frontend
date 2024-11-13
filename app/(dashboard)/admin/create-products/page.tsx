"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import CreateProductLayout from "@/components/admin-component/create-product/CreateProductLayout";
import AnimatedMulti from "@/components/admin-component/CustomSelect";
import { MultiValue } from "react-select";
import * as yup from "yup";
import useCategories from "@/services/hooks/category/useCategories";
import { useForm } from "react-hook-form";
import { captalizedName } from "@/helper/nameFormat";
import { uploadImageToFirebase } from "@/lib/utils";
import {
  cakeSizes,
  toppings,
  cakeShapes,
  fillingsList,
} from "@/utils/productDetails";
import { useMutation } from "@tanstack/react-query";
import { createNewProduct, getAllProducts } from "@/services/hooks/products";
import { toast, Toaster } from "sonner";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export type SelectOptionType = {
  label: string | number;
  value: string | number;
  description?: string;
} | null;

type ProductType = {
  name: string;
  description: string;
  images: string[];
};

const defaultValues = {
  name: "",
  description: "",
  images: [],
  category: {
    name: "",
    id: "",
  },
  subCategory: [],
  minPrice: "00.00",
  maxPrice: "00.00",
  sizes: [],
  productType: "",
  toppings: [""],
  flavour: [""],
};

export default function Page() {
  const [category, setCategory] = useState<any>();
  const [subCategory, setSubCategory] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [sizes, setSizes] = useState([]);
  const imagesRef = useRef<(File | null)[]>([null, null, null, null]);
  const [addOn, setAddOn] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<any>>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [product, setProduct] = useState<any>();

  const { categories } = useCategories();
  // console.log(imagesRef);

  const categoryOptions = categories?.map((item) => ({
    label: item.name,
    value: item.name.toLowerCase(),
    disabled: false,
    id: item._id,
    subCategories: [...item.subCategories],
  }));

  const getCategory = (value: string) => {
    if (categoryOptions) {
      const category = categoryOptions.filter(
        (option) => option.value === value,
      );

      return { name: value, id: category[0].id };
    }
  };

  const submitProduct = useMutation({
    mutationFn: createNewProduct,
    onSuccess: (data) => {
      toast.success(data.message);
      const allProducts = getAllProducts();
      console.log(allProducts);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error);
      const resError = error.response?.data;
      // toast.error(error.response?.data.message);
      // console.log(error.response.data.message);
      toast.error(
        `Error creating product. ${resError ? resError.message : "Unknown error"}`,
      );
      // error.response.data.message && toast.error(error.response.data.message);
    },
  });

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
    const fileIndex = imgNo - 1;

    imagesRef.current[fileIndex] = null;
  };

  const handleOptionsChange = (newOptions: MultiValue<any>) => {
    setSelectedOptions(newOptions);
  };

  const handleChange = (e: any, index: number) => {
    const fileIndex = index - 1;

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
    }
    imagesRef.current[fileIndex] = file;
    // console.log(file, e.target.name);
  };

  let sub;

  if (!sub || !categoryOptions) {
    sub = (
      <MultiSelect
        disabled={true}
        options={[]}
        value={subCategory}
        onChange={setSubCategory}
        labelledBy="Select subcategory"
      />
    );
  }

  categoryOptions?.forEach((option: any) => {
    if (option.value === category) {
      const subcategories = [...option.subCategories].map((sub) => ({
        label: captalizedName(sub.name),
        value: sub.name.toLowerCase(),
        id: sub._id,
      }));
      // console.log(subcategories);

      sub = (
        <MultiSelect
          disabled={category == null}
          options={subcategories}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
    }
  });

  const createProduct = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    let newImageArr: (string | null)[] = [];

    for (const file of imagesRef.current) {
      if (typeof file === "string") {
        newImageArr.push(file);
      } else if (file instanceof File) {
        try {
          const imageURL = await uploadImageToFirebase(file);
          newImageArr.push(imageURL);
        } catch (error) {
          console.error(error);
          newImageArr.push(null);
        }
      } else {
        newImageArr.push(null);
      }
    }

    const imageArr = newImageArr.filter((url) => url !== null);

    const data = {
      name: formData.get("productName"),
      description: formData.get("productDescription"),
      shapes: [...shapes].map((shape: any) => shape.value),
      sizes: [...sizes].map((size: any) => size.value),
      fillings: [...fillings].map((filling: any) => filling.value),
      toppings: [...toppings].map((topping: any) => topping.value),

      category: category ? getCategory(category) : "",
      subCategory: [...subCategory].map((sub: any) => ({
        name: sub.label,
        id: sub.id,
      })),
      minPrice: Number(formData.get("priceFrom")),
      maxPrice: Number(formData.get("priceTo")),
      images: [...imageArr],
    };

    console.log(data);
    submitProduct.mutate(data, {
      onSettled: () => setIsSubmitting(false),
    });
  };

  return (
    <section className="p-6">
      <Toaster richColors position="top-right" />
      <div className="hidden md:block">
        <form onSubmit={createProduct}>
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Create New Products</h1>
            <button
              className="rounded-md bg-black px-10 py-2 text-[12px] text-goldie-300 disabled:pointer-events-none disabled:opacity-75"
              type="submit"
              disabled={isSubmitting}
            >
              Save Changes
            </button>
          </div>
          <hr className="my-3 mb-8 hidden border-0 border-t border-[#D4D4D4] md:block" />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="">
              <h2 className="mb-3 font-bold">Product Information</h2>
              <div className="h-full rounded-md border border-neutral-300 p-4">
                <label htmlFor="productName" className="">
                  <span className="mb-1 block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Name
                  </span>
                  <input
                    name="productName"
                    type="text"
                    autoComplete="off"
                    id="productName"
                    placeholder="Product name"
                    className="mb-4 w-full rounded-sm border-none bg-gray-100 placeholder:text-sm"
                  />
                </label>
                <label htmlFor="productDescription" className="">
                  <span className="mb-1 block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Description
                  </span>
                  <textarea
                    name="productDescription"
                    autoComplete="off"
                    id="productDescription"
                    placeholder="Product Description"
                    className="h-[110px] w-full resize-none rounded-sm border-none bg-gray-100 placeholder:text-sm"
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-3 w-full">
                    <h2 className="mb-1 after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                      Category
                    </h2>

                    <select
                      id="category"
                      name="category"
                      className="form-select w-full rounded-md border-neutral-300 text-neutral-400"
                      onChange={(e: any) => setCategory(e.target.value)}
                      value={category}
                    >
                      <option className="" value={"select_category"}>
                        Select category
                      </option>
                      {categoryOptions &&
                        categoryOptions.map((option: any, index: number) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mt-3 w-full">
                    <h2 className="mb-1 after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                      Subcategory
                    </h2>
                    {sub}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-10 xl:mt-0">
              <h1 className="mb-3 font-bold after:text-xl after:text-[#E10] after:content-['*']">
                Product Images
              </h1>
              <div className="grid grid-cols-4 grid-rows-[180px] gap-4 rounded-md border border-neutral-300 p-4 xl:h-full xl:grid-cols-2">
                <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
                  {!images.image1 && (
                    <div className="text-balance px-3 text-center text-sm text-neutral-400">
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
                    onChange={(e: any) => handleChange(e, 1)}
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
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
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
                    <div className="text-balance px-3 text-center text-sm text-neutral-400">
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
                    onChange={(e: any) => handleChange(e, 2)}
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
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
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
                    <div className="text-balance px-3 text-center text-sm text-neutral-400">
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
                    onChange={(e: any) => handleChange(e, 3)}
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
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
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
                    <div className="text-balance px-3 text-center text-sm text-neutral-400">
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
                    onChange={(e: any) => handleChange(e, 4)}
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
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
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
              <h1 className="mb-3 font-bold">Product Pricing</h1>
              <div className="flex h-full w-full gap-4 rounded-md border border-neutral-300 p-4">
                <label htmlFor="priceFrom" className="block flex-grow">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Price From
                  </span>
                  <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
                    <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
                      &euro;
                    </span>
                    <input
                      name="priceFrom"
                      type="number"
                      autoComplete="off"
                      id="priceFrom"
                      placeholder="Price ranges from"
                      className="w-full border-none bg-transparent pl-12 focus:border-0 focus:ring-0"
                    />
                  </div>
                </label>
                <label htmlFor="priceTo" className="block flex-grow">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Price To
                  </span>
                  <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
                    <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
                      &euro;
                    </span>
                    <input
                      name="priceTo"
                      type="number"
                      autoComplete="off"
                      id="priceTo"
                      placeholder="Price ranges to"
                      className="w-full border-none bg-transparent pl-12 focus:border-0 focus:ring-0"
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="mb-3 font-bold">Product Variant</h2>
              <div className="grid h-full grid-cols-2 gap-2 rounded-md border border-neutral-300 p-4">
                <div className="block">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Shapes
                  </span>
                  <MultiSelect
                    options={cakeShapes}
                    value={shapes}
                    onChange={setShapes}
                    labelledBy="Select shapes"
                  />
                </div>
                <div className="block">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Sizes
                  </span>
                  <MultiSelect
                    options={cakeSizes}
                    value={sizes}
                    onChange={setSizes}
                    labelledBy="Select sizes"
                  />
                </div>
                <div className="block">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Fillings
                  </span>
                  <MultiSelect
                    options={fillingsList}
                    value={fillings}
                    onChange={setFillings}
                    labelledBy="Select fillings"
                  />
                </div>
                <div className="block">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Toppings/Add-ons
                  </span>
                  <MultiSelect
                    options={toppings}
                    value={addOn}
                    onChange={setAddOn}
                    labelledBy="Select toppings/add-ons"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="block md:hidden">
        <CreateProductLayout />
      </div>
    </section>
  );
}

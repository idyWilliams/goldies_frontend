"use client";
import React, { useEffect, useRef, useState } from "react";

import CreateProductLayout from "@/components/admin-component/create-product/CreateProductLayout";

import { uploadImageToFirebase } from "@/lib/utils";

import { useMutation } from "@tanstack/react-query";
import { createNewProduct } from "@/services/hooks/products";
import { toast } from "sonner";
import { AxiosError } from "axios";
import CreateProductImages from "@/components/admin-component/create-product/CreateProductImages";
import CreateProductPricing from "@/components/admin-component/create-product/CreateProductPricing";
import CreateProductVariants from "@/components/admin-component/create-product/CreateProductVariants";
import CreateProductHeader from "@/components/admin-component/create-product/CreateProductHeader";
import CreatePdctNameAndDesc from "@/components/admin-component/create-product/CreatePdctNameAndDesc";
import CreatePdctCatAndSubCat from "@/components/admin-component/create-product/CreatePdctCatAndSubCat";
import CreatePdctType from "@/components/admin-component/create-product/CreatePdctType";
import { useMediaQuery } from "react-responsive";
import useFormValues from "@/services/hooks/category/useFormValues";
import { useSearchParams } from "next/navigation";

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export default function Page() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const data = useFormValues();
  const {
    formValues,
    setFormValues,
    handleChange,
    images,
    setImages,
    imagesRef,
    category,
    categoryOptions,
    subcatOptions,
    multiSelect,
  } = data;

  const {
    categoryData,
    subCategory,
    setSubCategory,
    shapes,
    setShapes,
    flavour,
    setFlavours,
    sizes,
    setSizes,
    addOn,
    setAddOn,
  } = multiSelect;

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const submitProduct = useMutation({
    mutationFn: createNewProduct,
    onSettled: () => setIsSubmitting(false),
    onSuccess: (data) => {
      console.log("created product successfully");

      toast.success(data.message);
      formRef.current?.reset();
      setFormValues({
        productName: "",
        productDescription: "",
        category: "",
        productType: "",
        maxPrice: 0,
        minPrice: 0,
      });
      setSubCategory([]);
      setFlavours([]);
      setShapes([]);
      setSizes([]);
      setAddOn([]);
      setImages({
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error);
      const resError = error.response?.data;
      console.error(resError);
      toast.error(`Error: ${resError?.message ? resError?.message : resError}`);
    },
  });

  useEffect(() => {
    if (formValues.productType !== "preorder") {
      setFlavours([]);
    }
  }, [formValues.productType, setFlavours]);

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
      name: formValues.productName,
      description: formValues.productDescription,
      category: categoryData,
      subCategory: [...subCategory].map((sub: any) => ({
        name: sub.label,
        id: sub.id,
      })),
      productType: formValues.productType,
      images: [...imageArr],
      minPrice: Number(formValues.minPrice),
      maxPrice: Number(formValues.maxPrice),
      shapes: [...shapes].map((shape: any) => shape.value),
      sizes: [...sizes].map((size: any) => size.value),
      flavour: [...flavour].map((filling: any) => filling.value),
      toppings: [...addOn].map((topping: any) => topping.value),
    };

    console.log(data);
    // setIsSubmitting(false);
    submitProduct.mutate(data);
  };

  return (
    <section className="p-6">
      <div className="hidden md:block">
        <form ref={formRef} onSubmit={createProduct}>
          <CreateProductHeader
            title={editId ? "Edit Product" : "Create New Product"}
            isSubmitting={isSubmitting}
          />
          <hr className="my-3 mb-8 hidden border-0 border-t border-[#D4D4D4] md:block" />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="">
              <h2 className="mb-3 font-bold">Product Information</h2>
              <div className="h-full rounded-md border border-neutral-300 p-4">
                <CreatePdctNameAndDesc
                  productName={formValues.productName}
                  productDescription={formValues.productDescription}
                  handleChange={handleChange}
                />

                <CreatePdctCatAndSubCat
                  categoryOptions={categoryOptions}
                  category={category}
                  subcatOptions={subcatOptions}
                  handleChange={handleChange}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                />

                <CreatePdctType
                  productType={formValues.productType}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="lg:mt-10 xl:mt-0">
              <h1 className="mb-3 font-bold after:text-xl after:text-[#E10] after:content-['*']">
                Product Images
              </h1>
              <div className="grid grid-cols-4 grid-rows-[180px] gap-4 rounded-md border border-neutral-300 p-4 xl:h-full xl:grid-cols-2">
                <CreateProductImages
                  images={images}
                  setImages={setImages}
                  imagesRef={imagesRef}
                />
              </div>
            </div>
            <div className="mt-10">
              <CreateProductPricing
                maxPrice={formValues.maxPrice}
                minPrice={formValues.minPrice}
                handleChange={handleChange}
              />
            </div>

            <div className="mt-10">
              <CreateProductVariants
                shapes={shapes}
                setShapes={setShapes}
                sizes={sizes}
                setSizes={setSizes}
                flavour={flavour}
                setFlavours={setFlavours}
                addOn={addOn}
                setAddOn={setAddOn}
                productType={formValues.productType}
              />
            </div>
          </div>
        </form>
      </div>

      {isMobile && (
        <div className="block md:hidden">
          <CreateProductLayout
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            // images={images}
            // setImages={setImages}
            // imagesRef={imagesRef}
            data={data}
          />
        </div>
      )}
    </section>
  );
}

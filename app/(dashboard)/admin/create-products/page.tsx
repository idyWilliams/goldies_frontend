"use client";
import React, { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import CreateProductLayout from "@/components/admin-component/create-product/CreateProductLayout";
import { MultiValue } from "react-select";
import useCategories from "@/services/hooks/category/useCategories";
import { captalizedName } from "@/helper/nameFormat";
import { uploadImageToFirebase } from "@/lib/utils";

import { useMutation, useQuery } from "@tanstack/react-query";
import { createNewProduct, getAllProducts } from "@/services/hooks/products";
import { toast } from "sonner";
import { AxiosError } from "axios";
import CreateProductImages from "@/components/admin-component/create-product/CreateProductImages";
import CreateProductPricing from "@/components/admin-component/create-product/CreateProductPricing";
import CreateProductVariants from "@/components/admin-component/create-product/CreateProductVariants";
import CreateProductHeader from "@/components/admin-component/create-product/CreateProductHeader";
import CreatePdctNameAndDesc from "@/components/admin-component/create-product/CreatePdctNameAndDesc";
import CreatePdctCatAndSubCat from "@/components/admin-component/create-product/CreatePdctCatAndSubCat";
import CreatePdctType from "@/components/admin-component/create-product/CreatePdctType";

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export default function Page() {
  const [category, setCategory] = useState<string>("");
  const [categoryData, setCategoryData] = useState<{
    name: string;
    id: string;
  }>({ name: "", id: "" });

  const [subCategory, setSubCategory] = useState<any[]>([]);
  const [productType, setProductType] = useState("");

  const [shapes, setShapes] = useState<[]>([]);
  const [flavour, setFlavours] = useState<[]>([]);
  const [sizes, setSizes] = useState<[]>([]);
  const [addOn, setAddOn] = useState<[]>([]);

  const [images, setImages] = useState<any>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const formRef = useRef<HTMLFormElement>(null);
  const imagesRef = useRef<(File | null)[]>([null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitProduct = useMutation({
    mutationFn: createNewProduct,
    onSettled: () => setIsSubmitting(false),
    onSuccess: (data) => {
      toast.success(data.message);
      formRef.current?.reset();
      setCategory("");
      setImages({
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      });
      setFlavours([]);
      setShapes([]);
      setSizes([]);
      setAddOn([]);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error);
      const resError = error.response?.data;
      console.log(resError);
      toast.error(`Error: ${resError?.message}`);
    },
  });

  useEffect(() => {
    if (productType === "available") {
      setFlavours([]);
    }
  }, [productType]);

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
      category: categoryData,
      subCategory: [...subCategory].map((sub: any) => ({
        name: sub.label,
        id: sub.id,
      })),
      productType: formData.get("productType"),
      images: [...imageArr],
      minPrice: Number(formData.get("priceFrom")),
      maxPrice: Number(formData.get("priceTo")),
      shapes: [...shapes].map((shape: any) => shape.value),
      sizes: [...sizes].map((size: any) => size.value),
      flavour: [...flavour].map((filling: any) => filling.value),
      toppings: [...addOn].map((topping: any) => topping.value),
    };

    console.log(data);
    setIsSubmitting(false);
    submitProduct.mutate(data, {
      onSettled: () => setIsSubmitting(false),
    });
  };

  return (
    <section className="p-6">
      <div className="hidden md:block">
        <form onSubmit={createProduct} ref={formRef}>
          <CreateProductHeader isSubmitting={isSubmitting} />
          <hr className="my-3 mb-8 hidden border-0 border-t border-[#D4D4D4] md:block" />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="">
              <h2 className="mb-3 font-bold">Product Information</h2>
              <div className="h-full rounded-md border border-neutral-300 p-4">
                <CreatePdctNameAndDesc />

                <CreatePdctCatAndSubCat
                  category={category}
                  setCategoryData={setCategoryData}
                  setCategory={setCategory}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                />

                <CreatePdctType
                  productType={productType}
                  setProductType={setProductType}
                />
              </div>
            </div>
            <div className="lg:mt-10 xl:mt-0">
              <CreateProductImages
                images={images}
                setImages={setImages}
                imagesRef={imagesRef}
              />
            </div>
            <div className="mt-10">
              <CreateProductPricing />
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
                productType={productType}
              />
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

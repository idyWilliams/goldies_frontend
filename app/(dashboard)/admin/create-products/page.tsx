"use client";
import React, { useEffect, useRef, useState } from "react";

import CreateProductLayout from "@/components/admin-component/create-product/CreateProductLayout";

import { deleteImageFromFirebase, uploadImageToFirebase } from "@/lib/utils";

import CreatePdctCatAndSubCat from "@/components/admin-component/create-product/CreatePdctCatAndSubCat";
import CreatePdctNameAndDesc from "@/components/admin-component/create-product/CreatePdctNameAndDesc";
import CreatePdctType from "@/components/admin-component/create-product/CreatePdctType";
import CreateProductHeader from "@/components/admin-component/create-product/CreateProductHeader";
import CreateProductImages from "@/components/admin-component/create-product/CreateProductImages";
import CreateProductPricing from "@/components/admin-component/create-product/CreateProductPricing";
import CreateProductVariants from "@/components/admin-component/create-product/CreateProductVariants";
import { IProduct, ISubCategory } from "@/interfaces/product.interface";
import useFormValues from "@/services/hooks/category/useFormValues";
import {
  createNewProduct,
  getProduct,
  updateProduct,
} from "@/services/hooks/products";
import { ImagesTypes, SubCategoriesOption } from "@/types/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Option } from "react-multi-select-component";
import { useMediaQuery } from "react-responsive";
import { toast } from "sonner";

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
    subCategoriesOptions,
    multiSelect,
  } = data;

  const {
    categoryData,
    subCategories,
    setSubCategories,
    shapes,
    setShapes,
    flavour,
    setFlavours,
    sizes,
    setSizes,
    addOn,
    setAddOn,
    setCategoryData,
  } = multiSelect;

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {
    data: productData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", editId],
    queryFn: async () => getProduct(editId!),
    enabled: !!editId,
  });

  const product: IProduct = productData?.productDetails;

  const convertToOptions = (items: string[]): Option[] =>
    items.map((item) => ({
      label: item
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      value: item,
    }));

  const convertToOptionsWithId = (
    items: ISubCategory[],
  ): SubCategoriesOption[] =>
    items.map((item) => ({
      label: item.name,
      value: item._id,
      id: item._id,
      disabled: !item.status,
    }));

  useEffect(() => {
    if (product) {
      setFormValues({
        productName: product.name,
        productDescription: product.description,
        category: product.category._id,
        productType: product.productType,
        maxPrice: Number(product.maxPrice),
        minPrice: Number(product.minPrice),
        status: product.status,
      });

      setCategoryData({
        name: product.category.name,
        id: product.category._id,
      });

      setImages(
        product.images && Array.isArray(product.images)
          ? {
              image1: product.images[0] || "",
              image2: product.images[1] || "",
              image3: product.images[2] || "",
              image4: product.images[3] || "",
            }
          : { image1: "", image2: "", image3: "", image4: "" },
      );

      setSubCategories(convertToOptionsWithId(product.subCategories));

      setShapes(convertToOptions(product.shapes));
      setSizes(convertToOptions(product.sizes));
      setFlavours(convertToOptions(product.flavour));
      setAddOn(convertToOptions(product.toppings));
    } else {
      setFormValues({
        productName: "",
        productDescription: "",
        category: "",
        productType: "",
        maxPrice: 0,
        minPrice: 0,
        status: formValues.status,
      });
      setSubCategories([]);
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
    }
  }, [
    product,
    setFormValues,
    setImages,
    setSubCategories,
    setShapes,
    setSizes,
    setFlavours,
    setAddOn,
    setCategoryData,
    formValues.status,
  ]);

  const submitProductMutation = useMutation({
    // mutationFn: createNewProduct,
    mutationFn: async (data: {
      name: string;
      description: string;
      category: string;
      subCategories: Option[];
      productType: string;
      images: string[];
      minPrice: number;
      maxPrice: number;
      shapes: string[];
      sizes: string[];
      flavour: string[];
      toppings: string[];
      status: string;
    }) => (editId ? updateProduct(data, editId) : createNewProduct(data)),
    onSettled: () => setIsSubmitting(false),
    onSuccess: (data) => {
      toast.success(data.message);

      formRef.current?.reset();
      setFormValues({
        productName: "",
        productDescription: "",
        category: "",
        productType: "",
        maxPrice: 0,
        minPrice: 0,
        status: formValues.status,
      });
      setSubCategories([]);
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

      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      router.push("/admin/products");
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

  const createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    let newImageArr: (string | null)[] = [];

    for (const file of imagesRef.current) {
      if (typeof file === "string") {
        newImageArr.push(file);
      } else if (file instanceof File) {
        try {
          const imageURL = await uploadImageToFirebase(file);
          // console.log("Uploaded image URL:", imageURL);
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
    const finalImages = editId
      ? [...imageArr, ...(product?.images || [])].filter(Boolean)
      : [...imageArr];

    // Validation: Ensure at least one image is present
    if (finalImages.length === 0) {
      toast.warning("Please upload at least one product image.");
      setIsSubmitting(false);
      return;
    }

    const data = {
      name: formValues.productName,
      description: formValues.productDescription,
      category: formValues.category,
      subCategories: [...subCategories].map((sub: any) => sub.id),
      productType: formValues.productType,
      images: finalImages as string[],
      minPrice: Number(formValues.minPrice),
      maxPrice: Number(formValues.maxPrice),
      shapes: [...shapes].map((shape: any) => shape.value),
      sizes: [...sizes].map((size: any) => size.value),
      flavour: [...flavour].map((filling: any) => filling.value),
      toppings: [...addOn].map((topping: any) => topping.value),
      status: formValues.status,
    };

    // console.log("form data on submit>>>", data);
    submitProductMutation.mutate(data);
  };

  // remove product images
  const handleRemove = async (imgNo: number) => {
    const imageKey = `image${imgNo}` as keyof ImagesTypes;
    const imageUrl = images[imageKey];

    // If the image is stored in Firebase, delete it
    if (typeof imageUrl === "string" && imageUrl.startsWith("https://")) {
      try {
        await deleteImageFromFirebase(imageUrl);
        // console.log("Image deleted from Firebase successfully");
      } catch (error: any) {
        if (error.code === "storage/object-not-found") {
          console.warn("Image not found in Firebase Storage:", imageUrl);
        } else {
          console.error("Failed to delete image from Firebase:", error);
        }
      }
    }
    // Remove the image from the state
    setImages((img: ImagesTypes) => {
      return { ...img, [imageKey]: "" };
    });

    // Remove the file from the imagesRef
    const fileIndex = imgNo - 1;
    imagesRef.current[fileIndex] = null;

    // If editing a product, update the product's images array
    if (editId && product) {
      const updatedProductImages = product.images.filter(
        (url) => url !== imageUrl,
      );

      // Update the product in the database
      try {
        await updateProduct(
          {
            ...product,
            images: updatedProductImages,
          },
          editId,
        );

        await refetch();

        toast.success("Image removed");
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-primary" role="status">
          <span className="">Loading...</span>
        </div>
      </div>
    );

  return (
    <section className="p-6 pb-16">
      <div className="hidden md:block">
        <form ref={formRef} onSubmit={createProduct}>
          <CreateProductHeader editId={editId!} isSubmitting={isSubmitting} />
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
                  subCategoriesOptions={subCategoriesOptions}
                  handleChange={handleChange}
                  subCategories={subCategories}
                  setSubCategories={setSubCategories}
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
                  handleRemove={handleRemove}
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
            editId={editId!}
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

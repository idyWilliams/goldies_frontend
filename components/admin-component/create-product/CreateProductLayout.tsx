import React, { useEffect, useRef, useState } from "react";
import Stepper from "./Stepper";
import InformationAndPricing from "../InformationAndPricing";
import ProductVariants from "../ProductVariants";
import { createProductContext } from "../../../context/CreateProductContext";
import StepperController from "./StepperController";
import { useMutation } from "@tanstack/react-query";
import { createNewProduct } from "@/services/hooks/products";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { uploadImageToFirebase } from "@/lib/utils";
import { CreateProductMobilePropTypes, formValuesType } from "@/types/products";
import useCategoryOptions from "@/services/hooks/category/useCategoryOptions";
import useCategories from "@/services/hooks/category/useCategories";
import CreateProductImages from "./CreateProductImages";

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

const productStep = ["information", "variants", "images"];

export default function CreateProductLayout({
  isSubmitting,
  setIsSubmitting,
  // images,
  // setImages,
  // imagesRef,
  data,
}: CreateProductMobilePropTypes) {
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

  const formRefMobile = useRef<HTMLFormElement>(null);

  const submitProductMobile = useMutation({
    mutationFn: createNewProduct,
    onSettled: () => setIsSubmitting(false),
    onSuccess: (data) => {
      toast.success(data.message);
      setFormValues({
        productName: "",
        productDescription: "",
        category: {
          id: "",
          name: "",
        },
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
      toast.error(`Error: ${resError?.message}`);
    },
  });

  useEffect(() => {
    if (formValues.productType !== "preorder") {
      setFlavours([]);
    }
  }, [formValues.productType, setFlavours]);

  const createProductMobile = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

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
    const finalImages = [...imageArr, ...Object.values(images)].filter(Boolean);

    // Validation: Ensure at least one image is present
    if (finalImages.length === 0) {
      toast.warning("Please upload at least one product image.");
      setIsSubmitting(false);
      return;
    }

    const data = {
      name: formValues.productName,
      description: formValues.productDescription,
      category: categoryData,
      subCategory: [...subCategory].map((sub: any) => ({
        name: sub.label,
        id: sub.id,
      })),
      productType: formValues.productType,
      images: finalImages as string[],
      minPrice: Number(formValues.minPrice),
      maxPrice: Number(formValues.maxPrice),
      shapes: [...shapes].map((shape: any) => shape.value),
      sizes: [...sizes].map((size: any) => size.value),
      flavour: [...flavour].map((filling: any) => filling.value),
      toppings: [...addOn].map((topping: any) => topping.value),
    };

    console.log(data);
    // setIsSubmitting(false);
    submitProductMobile.mutate(data);
  };

  const [currentStep, setCurrentStep] = useState(1);

  // const stepNumber = 3;
  const checkoutStep = productStep;
  const stepDisplay = (productStep: any) => {
    switch (productStep) {
      case 1:
        return (
          <InformationAndPricing
            category={category}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            categoryOptions={categoryOptions}
            subcategories={subcatOptions}
            formValues={formValues}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <ProductVariants
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
        );
      case 3:
        return (
          <section>
            <div>
              <div className="mt-6 grid h-full grid-cols-2 grid-rows-[repeat(2,200px)] gap-4">
                <CreateProductImages
                  images={images}
                  setImages={setImages}
                  imagesRef={imagesRef}
                />
              </div>
            </div>
          </section>
        );

      default:
        break;
    }
  };

  const handleClick = (direction: string) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= checkoutStep?.length && setCurrentStep(newStep);
  };
  console.log(images);

  console.log(checkoutStep, currentStep);
  return (
    <section>
      <div className="">
        <h1 className="mb-3 font-bold uppercase">Create New Products</h1>
        <hr className="border-1 mb-3 border-black" />
      </div>
      <form ref={formRefMobile} onSubmit={createProductMobile}>
        <Stepper checkoutStep={checkoutStep} currentStep={currentStep} />

        <createProductContext.Provider
          value={{
            checkoutStep,
            currentStep,
            handleClick,
          }}
        >
          {stepDisplay(currentStep)}
          <StepperController isSubmitting={isSubmitting} />
        </createProductContext.Provider>
      </form>
    </section>
  );
}

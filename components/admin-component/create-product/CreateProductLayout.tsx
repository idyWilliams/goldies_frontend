import { uploadImageToFirebase } from "@/lib/utils";
import { createNewProduct } from "@/services/hooks/products";
import { CreateProductMobilePropTypes } from "@/types/products";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CreateProductContext } from "../../../context/CreateProductContext";
import InformationAndPricing from "../InformationAndPricing";
import ProductVariants from "../ProductVariants";
import CreateProductImages from "./CreateProductImages";
import Stepper from "./Stepper";
import StepperController from "./StepperController";

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

const productStep = ["Information", "Variants", "Images"];

export default function CreateProductLayout({
  isSubmitting,
  setIsSubmitting,
  // images,
  // setImages,
  // imagesRef,
  data,
  editId,
  handleRemove,
}: CreateProductMobilePropTypes & {
  handleRemove: (imgNo: number) => Promise<void>;
}) {
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
      subCategory: [...subCategories].map((sub: any) => ({
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

  const validateCurrentStep = (step: number) => {
    switch (step) {
      case 1: // Information step
        if (
          !formValues.productName ||
          !formValues.category ||
          !formValues.productType ||
          formValues.minPrice <= 0 ||
          formValues.maxPrice <= 0
        ) {
          toast.error("Please fill out all required fields.");
          return false;
        }
        return true;
      case 2: // Variants step
        if (formValues.productType === "preorder") {
          if (
            shapes.length === 0 ||
            sizes.length === 0 ||
            flavour.length === 0 ||
            addOn.length === 0
          ) {
            toast.error(
              "Please fill out all variant fields for preorder products.",
            );
            return false;
          }
        }
        return true;
      case 3: // Images step
        if (Object.values(images).filter(Boolean).length === 0) {
          toast.error("Please upload at least one product image.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleClick = (direction: string) => {
    let newStep = currentStep;

    if (direction === "next") {
      if (!validateCurrentStep(currentStep)) {
        return;
      }
      newStep++;
    } else {
      newStep--;
    }

    if (newStep > 0 && newStep <= productStep.length) {
      setCurrentStep(newStep);
    }
  };

  // const stepNumber = 3;
  const checkoutStep = productStep;
  const stepDisplay = (productStep: any) => {
    switch (productStep) {
      case 1:
        return (
          <InformationAndPricing
            category={category}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            categoryOptions={categoryOptions}
            subCategoriesOptions={subCategoriesOptions}
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
                  handleRemove={handleRemove}
                />
              </div>
            </div>
          </section>
        );

      default:
        break;
    }
  };

  return (
    <section>
      <div className="">
        <h1 className="mb-3 font-bold uppercase">
          {editId ? "Edit Product" : "Create New Product"}
        </h1>
        <hr className="border-1 mb-3 border-black" />
      </div>
      <form ref={formRefMobile} onSubmit={createProductMobile}>
        <Stepper checkoutStep={checkoutStep} currentStep={currentStep} />

        <CreateProductContext.Provider
          value={{
            checkoutStep,
            currentStep,
            handleClick,
          }}
        >
          {stepDisplay(currentStep)}
          <StepperController isSubmitting={isSubmitting} />
        </CreateProductContext.Provider>
      </form>
    </section>
  );
}

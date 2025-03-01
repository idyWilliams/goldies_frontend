"use client";

import { deleteImageFromFirebase, uploadImageToFirebase } from "@/lib/utils";
import {
  createCategory,
  editCategory,
  getCategory,
} from "@/services/hooks/category";
import { Category } from "@/services/types";
import { CategoryProps } from "@/utils/categoryTypes";
import { optimisticCategoryUpdate } from "@/utils/optimisticCategoryUpdate";
import useBoundStore from "@/zustand/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import CategoryImage from "./CategoryImage";
import CategoryInputs from "./CategoryInputs";
import CategorySlugSkeleton from "./CategorySlugSkeleton";

const schema = yup.object().shape({
  categoryName: yup.string().required("Category name is required"),
  categorySlug: yup.string().required("Category slug is required"),
  description: yup.string().required("Category description is required"),
  image: yup
    .mixed()
    .test("fileOrUrl", "Image is required", function (value: any) {
      if (!value) return false;
      if (typeof value === "string" && value !== "") return true;
      if (value instanceof File) return true;
      return false;
    })
    .required("Category image is required"),
  status: yup.boolean().required("Status is required"),
});

export type QueryDataType = {
  [x: string]: any;
  categories: [];
};

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export default function CategoryForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathName = usePathname();
  const isNewCreate = pathName.endsWith("create");
  const queryParams = useSearchParams();
  const categoryId = queryParams.get("categoryId");
  const formRef = useRef<HTMLFormElement | null>(null);

  const page = useBoundStore((state) => state.page);
  const limit = useBoundStore((state) => state.limit);
  const category = useBoundStore((state) => state.activeCategory);
  const setCategory = useBoundStore((state) => state.setActiveCategory);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(function () {
    return category ? category?.image : "";
  });

  const setFormRef = useBoundStore((state) => state.setCategoryFormRef);
  const setSubmitStatus = useBoundStore((state) => state.setSubmitStatus);
  const setIsValid = useBoundStore((state) => state.setIsValid);

  const initialCatData = {
    error: false,
    category: category ? category : null,
    message: "Category fetched successfully",
  };

  // ADD FORM REF FOR USE IN THE CATEGORY HEADER BUTTON TO TRIGGER SUBMISSION
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (formRef.current) {
        setFormRef(formRef);
      }
    }
  }, [setFormRef]);

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: category
      ? {
          categoryName: category?.name,
          categorySlug: category?.categorySlug,
          description: category?.description,
          image: category?.image,
          status: category?.status,
        }
      : {
          categoryName: "",
          categorySlug: "",
          description: "",
          image: null,
          status: true,
        },
  });

  // SET STATE TO DISABLE SUBMISSION BUTTON WHEN FORM FIELDS ARE INVALID
  useEffect(() => {
    setIsValid(isValid);
  }, [setIsValid, isValid]);
  // MUTATION HOOK TO FETCH A CATEGORY FROM API IF NOT FOUND IN STORE

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategory(categoryId),
    initialData: () => category && initialCatData,
    enabled: isNewCreate ? false : true,
    // staleTime: 60 * 1000,
  });

  const categoryData: Category | null = useMemo(() => {
    if (isSuccess) {
      return data?.category;
    }
    return null;
  }, [isSuccess, data?.category]);

  // useEffect(() => {
  //   console.log(categoryData);
  // }, [categoryData, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.error(error?.message);
    }
  }, [isError, error?.message]);

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
      reset({
        categoryName: categoryData?.name,
        categorySlug: categoryData?.categorySlug,
        description: categoryData?.description,
        image: categoryData?.image,
        status: categoryData?.status,
      });
      setImageUrl(categoryData?.image);
    }
  }, [categoryData, setCategory, reset]);

  // MUTATION HOOK TO ADD NEW CATEGORY
  const newCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/admin/manage-categories");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setImageUrl("");
      reset();
      setCategory(null);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  // MUTATION HOOK TO EDIT EXSITING CATEGORY
  const editActiveCategory = useMutation({
    mutationFn: editCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/admin/manage-categories");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const checkChanges = useCallback(() => {
    const name = getValues("categoryName");
    const slug = getValues("categorySlug");
    const description = getValues("description");
    const image = getValues("image");
    const status = getValues("status");

    if (category) {
      return (
        name !== category.name ||
        slug !== category.categorySlug ||
        description !== category.description ||
        image !== category.image ||
        status !== category.status
      );
    } else {
      return true;
    }
  }, [category, getValues]);

  // SET CATEGORY SLUG VALUE ON ENETERING CATEGORY NAME
  useEffect(() => {
    const subscription = watch((value) => {
      const currentSlug = value.categorySlug || "";

      if (value.categoryName) {
        const slug = value.categoryName
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/\./g, "");

        if (slug !== currentSlug) setValue("categorySlug", slug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // Handle image selection
  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file); // Create a temporary URL for preview
      setImageUrl(url);
      setValue("image", file); // Update the form value
    }
  };

  // FORM SUBMISSION FOR CREATING NEW OR UPDATING EXISTING CATEGORY
  const onSubmit = async (data: CategoryProps) => {
    if (!isNewCreate && !checkChanges()) {
      toast.error("No changes to save.");
      return;
    }

    setSubmitStatus("submitting");

    try {
      let imageURL = "";

      // Upload the image to Firebase if a new file is selected
      if (imageFile) {
        imageURL = await uploadImageToFirebase(imageFile);
      } else if (typeof data.image === "string") {
        // Use the existing URL if it's already a string
        imageURL = data.image;
      }

      const payload = {
        name: data.categoryName,
        description: data.description,
        categorySlug: data.categorySlug,
        status: data.status,
        image: imageURL,
      };

      if (pathName.endsWith("/create")) {
        // console.log(payload);

        newCategoryMutation.mutate(payload);
      } else {
        editActiveCategory.mutate({
          ...payload,
          categoryId: category?._id,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitStatus("idle");
    }
  };

  const handleRemoveImage = useCallback(async () => {
    if (
      imageUrl &&
      typeof imageUrl === "string" &&
      imageUrl.startsWith("https://")
    ) {
      try {
        await deleteImageFromFirebase(imageUrl);
      } catch (error: any) {
        if (error.code === "storage/object-not-found") {
          console.warn("Image not found in Firebase Storage:", imageUrl);
        } else {
          console.error("Failed to delete image from Firebase:", error);
        }
      }
    }

    setImageUrl("");
    setValue("image", ""); // Reset the form value for the image
    toast.success("Image removed");
  }, [imageUrl, setValue]);

  if (isLoading) {
    return <CategorySlugSkeleton />;
  }

  if (isError) {
    return (
      <p className="flex h-[75dvh] w-full items-center justify-center">
        There was an error fetching data: {error.message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="create-category" ref={formRef}>
      <div className=" md:grid md:grid-cols-[45%_1fr] md:items-center md:gap-5 xl:grid-cols-[450px_1fr]">
        <CategoryImage
          register={register}
          errors={errors}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          handleRemoveImage={handleRemoveImage}
          setImageFile={handleImageChange}
        />

        <div className="mt-4 md:mt-0 md:h-min">
          <div className="md:grid md:gap-3 xl:grid-cols-2">
            <CategoryInputs
              control={control}
              register={register}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

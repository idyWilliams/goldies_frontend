"use client";

import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import CategoryImage from "./CategoryImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryInputs from "./CategoryInputs";
import { uploadImageToFirebase } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  editCategory,
  getCategory,
} from "@/services/hooks/category";
import { CategoryProps } from "@/utils/categoryTypes";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useBoundStore from "@/zustand/store";
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
      if (value && value[0] instanceof File) return true;
      return false;
    })
    .required("Category image is required"),

  status: yup.boolean().required("Status is required"),
});

export default function CategoryForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathName = usePathname();
  const isNewCreate = pathName.endsWith("create");
  const queryParams = useSearchParams();
  const categoryId = queryParams.get("categoryId");
  const formRef = useRef<HTMLFormElement | null>(null);

  const [imageUrl, setImageUrl] = useState<string>("");
  const activeCategory = useBoundStore((state) => state.activeCategory);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);
  const setFormRef = useBoundStore((state) => state.setCategoryFormRef);
  const setSubmitStatus = useBoundStore((state) => state.setSubmitStatus);
  const setIsValid = useBoundStore((state) => state.setIsValid);
  const setRefetchCategory = useBoundStore((state) => state.setRefetchCategory);
  const setIsFetchingCategory = useBoundStore(
    (state) => state.setIsFetchingCategory,
  );
  const isFetchingCategory = useBoundStore((state) => state.isFetchingCategory);

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
    defaultValues: isNewCreate
      ? {
          categoryName: "",
          categorySlug: "",
          description: "",
          image: null,
          status: true,
        }
      : {
          categoryName: activeCategory?.name,
          categorySlug: activeCategory?.categorySlug,
          description: activeCategory?.description,
          image: activeCategory?.image,
          status: activeCategory?.status,
        },
  });

  // SET STATE TO DISABLE SUBMISSION BUTTON WHEN FORM FIELDS ARE INVALID
  useEffect(() => {
    setIsValid(isValid);
  }, [setIsValid, isValid]);

  // ADD FORM REF FOR USE IN THE CATEGORY HEADER BUTTON TO TRIGGER SUBMISSION
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (formRef.current) {
        setFormRef(formRef);
      }
    }
  }, [setFormRef]);

  // MUTATION HOOK TO FETCH A CATEGORY FROM API IF NOT FOUND IN STORE
  const { data, error, isPending, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategory(categoryId),
    enabled: !isNewCreate && !activeCategory,
    // initialData: () => activeCategory && activeCategory,
  });

  useEffect(() => {
    setIsFetchingCategory(isFetching);
  }, [setIsFetchingCategory, isFetching]);

  useEffect(() => {
    setRefetchCategory(refetch);

    if (data && !isFetching) {
      setActiveCategory(data?.category);
    }
  }, [data, setActiveCategory, refetch, setRefetchCategory, isFetching]);

  // MUTATION HOOK TO ADD NEW CATEGORY
  const newCategory = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/admin/manage-categories");
      toast.success(data.message);
      setImageUrl("");
      reset();
      setActiveCategory(null);
    },
    onError(error) {
      console.error(error);
      toast.error(error.message);
    },
  });

  // MUTATION HOOK TO EDIT EXSITING CATEGORY
  const editActiveCategory = useMutation({
    mutationFn: editCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/admin/manage-categories");
      toast.success(data.message);
      setImageUrl("");
      reset();
      setActiveCategory(null);

      // router.push("/admin/manage-categories");
    },
    onError(error) {
      console.error(error);
      toast.error(error.message);
    },
  });

  // SET THE IMAGE URL AND IMAGE FIELD VALUE ON EDITING CATEGORY ON MOUNT
  useEffect(() => {
    if (!isNewCreate && activeCategory) {
      reset({
        categoryName: activeCategory?.name || "",
        categorySlug: activeCategory?.categorySlug || "",
        description: activeCategory?.description || "",
        image: null,
        status: activeCategory?.status || true,
      });

      if (!watch("image")?.[0]) {
        setImageUrl(activeCategory?.image || "");
        setValue("image", activeCategory?.image);
      }
    }
  }, [activeCategory, reset, watch, setValue, isNewCreate]);

  // SET IMAGE URL FOR NEW CATEGORY OR EXISTING CATEGORY IMAGE CHANGE
  useEffect(() => {
    const imageSubscription = watch(({ image }) => {
      if (typeof image === "string") return;
      if (image && image[0] instanceof File) {
        const url = URL.createObjectURL(image[0]);
        setImageUrl(url);

        return () => URL.revokeObjectURL(url);
      }
    });

    return () => imageSubscription.unsubscribe();
  }, [watch]);

  // SET CATEGORY SLUG VALUE ON ENETERING CATEGORY NAME
  useEffect(() => {
    const nameSubscription = watch((value) => {
      const currentSlug = value.categorySlug || "";

      if (value.categoryName) {
        const slug = value.categoryName
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/\./g, "");

        if (slug !== currentSlug) setValue("categorySlug", slug);
      }
    });

    return () => nameSubscription.unsubscribe();
  }, [watch, setValue]);

  // FORM SUBMISSION FOR CREATING NEW OR UPDATING EXISTING CATEGORY
  const onSubmit = async (data: CategoryProps) => {
    setSubmitStatus("submittingCategory");

    const category = {
      name: data.categoryName,
      description: data.description,
      categorySlug: data.categorySlug,
      status: data.status,
      image: "",
    };

    if (typeof data.image === "string") {
      category.image = data.image;
    }

    try {
      if (data.image[0] instanceof File) {
        const file = data.image[0];
        const imageURL = await uploadImageToFirebase(file);
        category.image = imageURL;
      }

      if (pathName.endsWith("/create")) {
        newCategory.mutate(category);
      } else {
        editActiveCategory.mutate({
          category: category,
          categoryId: activeCategory?._id,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitStatus("idle");
    }
  };

  return (
    <>
      {isFetchingCategory && <CategorySlugSkeleton />}
      {!isFetchingCategory && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="create-category"
          ref={formRef}
        >
          <div className=" md:grid md:grid-cols-[45%_1fr] md:items-center md:gap-5 xl:grid-cols-[450px_1fr]">
            {/* {isPending && !activeCategory && <LoadingCategories />} */}
            <CategoryImage
              register={register}
              errors={errors}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
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
      )}
    </>
  );
}

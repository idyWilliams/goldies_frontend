"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as yup from "yup";
import CategoryImage from "./CategoryImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryInputs from "./CategoryInputs";
import { uploadImageToFirebase } from "@/lib/utils";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createCategory,
  editCategory,
  getAllCategories,
  getCategory,
} from "@/services/hooks/category";
import { CategoryProps } from "@/utils/categoryTypes";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useBoundStore from "@/zustand/store";
import CategorySlugSkeleton from "./CategorySlugSkeleton";
import { Category } from "@/services/types";
import { optimisticCategoryUpdate } from "@/utils/optimisticCategoryUpdate";

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

export type QueryDataType = {
  [x: string]: any;
  categories: [];
};

function getQuery(
  client: QueryClient,
  key: string,
  page?: number,
  limit?: number,
) {
  const previousCategories = client.getQueryData([key, page, limit]);
  return previousCategories;
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
    console.log(typeof window);

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
  // useQuery({
  //   queryKey: ["categories"],
  //   queryFn: getAllCategories,
  //   enabled: isNewCreate && !category ? true : false,
  //   // staleTime: 60 * 1000,
  // });

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
  const newCategory = useMutation({
    mutationFn: createCategory,

    onMutate: async (variable) => {
      await queryClient.cancelQueries({
        queryKey: ["categories", page, limit],
      });
      const previousCategories = queryClient.getQueryData([
        "categories",
        1,
        50,
      ]);
      if (!previousCategories) return;
      queryClient.setQueryData(
        ["categories", page, limit],
        (old: QueryDataType) => {
          const newData = optimisticCategoryUpdate("create", old, variable);

          return { ...newData };
        },
      );

      return { previousCategories };
    },
    onSettled: () => {
      const previousCategories = queryClient.getQueryData([
        "categories",
        page,
        limit,
      ]);
      if (previousCategories) {
        queryClient.invalidateQueries({
          queryKey: ["categories", page, limit],
        });
      }
    },

    onSuccess: () => {
      router.push("/admin/manage-categories");
    },

    onError: (error, newCategory, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(
          ["categories", page, limit],
          context?.previousCategories,
        );
      }

      console.error(error);
      toast.error("There was an error creating this category");
    },
  });

  // MUTATION HOOK TO EDIT EXSITING CATEGORY
  const editActiveCategory = useMutation({
    mutationFn: editCategory,

    onMutate: async (variable) => {
      // if(!data?.category) return
      await queryClient.cancelQueries({
        queryKey: ["categories", page, limit],
      });
      const previousCategories = queryClient.getQueryData([
        "categories",
        page,
        limit,
      ]);
      if (!previousCategories) return;

      queryClient.setQueryData(
        ["categories", page, limit],
        (old: QueryDataType) => {
          const newData = optimisticCategoryUpdate("edit", old, variable);
          return { ...newData };
        },
      );

      return { previousCategories };
    },
    onSettled: () => {
      const previousCategories = queryClient.getQueryData([
        "categories",
        page,
        limit,
      ]);
      if (previousCategories) {
        queryClient.invalidateQueries({
          queryKey: ["categories", page, limit],
        });
      }
    },
    onSuccess: () => {
      router.push("/admin/manage-categories");
      toast.success("Category updated successfully");
    },

    onError: (error, newCategory, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(
          ["categories", page, limit],
          context?.previousCategories,
        );
      }

      console.error(error);
      toast.error("There was an error updating this category");
    },
  });

  function checkChanges() {
    const name = getValues("categoryName");
    const slug = getValues("categorySlug");
    const description = getValues("description");
    const image = getValues("image");
    const status = getValues("status");

    console.log({ name, slug, description, image, status });
    console.log(category);

    if (category) {
      if (
        name !== category.name ||
        slug !== category.categorySlug ||
        description !== category.description ||
        image !== category.image ||
        status !== category.status
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  // SET IMAGE URL FOR NEW CATEGORY OR EXISTING CATEGORY IMAGE CHANGE
  useEffect(() => {
    const imageSubscription = watch(({ image }) => {
      if (image && typeof image === "string") return;
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
    if (!isNewCreate && !checkChanges()) {
      toast.error("No changes to save.");
      // router.push("/admin/manage-categories");
      return;
    }
    console.log("this ran");

    setSubmitStatus("submitting");

    const payload = {
      name: data.categoryName,
      description: data.description,
      categorySlug: data.categorySlug,
      status: data.status,
      image: "",
    };

    if (typeof data.image === "string") {
      payload.image = data.image;
    }

    try {
      if (data.image[0] instanceof File) {
        const file = data.image[0];
        const imageURL = await uploadImageToFirebase(file);
        payload.image = imageURL;
      }

      if (pathName.endsWith("/create")) {
        console.log(payload);

        newCategory
          .mutateAsync(payload)
          .then((data) => {
            toast.success(data.message);
            setImageUrl("");
            reset();
            setCategory(null);
          })
          .catch((error) => {
            console.log("this ran second error");

            toast.error("second error");
          });
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

  return (
    <>
      {isLoading && <CategorySlugSkeleton />}
      {/* {isLoading && !category && <CategorySlugSkeleton />} */}
      {isError && !category && (
        <p className="flex h-[75dvh] w-full items-center justify-center">
          There was an error fetching data: {error.message}
        </p>
      )}

      {(isNewCreate || category) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="create-category"
          ref={formRef}
        >
          <div className=" md:grid md:grid-cols-[45%_1fr] md:items-center md:gap-5 xl:grid-cols-[450px_1fr]">
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

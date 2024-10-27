"use client";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { SubCategoryProps } from "@/utils/categoryTypes";
import { newSubcategory } from "@/utils/formData";
import { yupResolver } from "@hookform/resolvers/yup";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import "react-toggle/style.css";
import * as yup from "yup";
import CreateSubcategoryImage from "./CreateSubcategoryImage";
import CreateSubcategoryInput from "./CreateSubcategoryInput";
import SubCategoryBtn from "./SubCategoryBtn";
import { uploadImageToFirebase } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubCategory,
  editSubCategory,
  getSubCategory,
} from "@/services/hooks/category";
import useBoundStore from "@/zustand/store";
import { toast } from "react-toastify";
import { Category, SubCategory } from "@/services/types";
import { optimisticSubCatUpdate } from "@/utils/optimisticCategoryUpdate";

type SubCatQueryDataType = {
  [x: string]: any;
  category: Category;
};

const schema = yup.object().shape({
  // parentCategory: yup.string().required("Parent category is required"),
  name: yup.string().required("SubCategory name is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .test("fileOrUrl", "Image is required", function (value: any) {
      if (!value) return false;
      if (typeof value === "string" && value !== "") return true;
      if (value && value[0] instanceof File) return true;
      return false;
    })
    .required(" Image is required"),
  status: yup.boolean().required("Status is required"),
});

const CreateSubategory = () => {
  const queryClient = useQueryClient();
  const queryParams = useSearchParams();
  const categoryId = queryParams.get("categoryId");

  const [imageUrl, setImageUrl] = useState<string>("");

  const activeSubcategory = useBoundStore((state) => state.activeSubcategory);
  const setActiveSubcategory = useBoundStore(
    (state) => state.setActiveSubcategory,
  );
  const setShowSub = useBoundStore((state) => state.setShowSub);
  const showSub = useBoundStore((state) => state.showSub);
  const refetchCategory = useBoundStore((state) => state.refetchCategory);
  // const isFetchingCategory = useBoundStore((state) => state.isFetchingCategory);

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<SubCategoryProps>({
    resolver: yupResolver(schema),
    defaultValues: activeSubcategory
      ? {
          name: activeSubcategory?.name,
          description: activeSubcategory?.description,
          image: activeSubcategory?.image,
          status: activeSubcategory?.status,
        }
      : {
          name: "",
          description: "",
          image: null,
          status: true,
        },
  });

  // MUTATION HOOK TO FETCH A SUBCATEGORY FROM API IF NOT FOUND IN STORE AND SEARCH DIRECTLY

  // const { data } = useQuery({
  //   queryKey: ["subCategories", activeSubcategory?._id],
  //   queryFn: () => getSubCategory(activeSubcategory?._id),
  //   enabled: !activeSubcategory && showSub,
  // });

  // useEffect(() => {
  //   if (data) {
  //     setActiveSubcategory(data?.category);
  //   }
  // }, [data, setActiveSubcategory]);

  // MUTATION HOOK TO ADD NEW SUBCATEGORY
  const newSubCategory = useMutation({
    mutationFn: createSubCategory,

    onMutate: async (variable) => {
      await queryClient.cancelQueries({ queryKey: ["categories", categoryId] });
      const previousCategory = queryClient.getQueryData([
        "categories",
        categoryId,
      ]);
      console.log(previousCategory);

      if (!previousCategory) return;

      queryClient.setQueryData(
        ["categories", categoryId],
        (old: SubCatQueryDataType) => {
          const newData = optimisticSubCatUpdate("create", old, variable);
          console.log(newData);

          return { ...newData };
        },
      );
      return { previousCategory };
    },

    onSettled: (variable) => {
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
    },

    onSuccess: (data) => {
      setShowSub(false);
      toast.success("Subcategory succesfully created");
    },

    onError: (error, newCategory, context) => {
      queryClient.setQueryData(
        ["categories", categoryId],
        context?.previousCategory,
      );
      console.error(error);
      toast.error("There was an error creating this Subcategory");
    },
  });

  // MUTATION HOOK TO EDIT EXSITING SUBCATEGORY
  const editActiveSubcategory = useMutation({
    mutationFn: editSubCategory,
    onMutate: async (variable) => {
      console.log(variable);
      console.log(categoryId);

      await queryClient.cancelQueries({ queryKey: ["categories", categoryId] });
      const previousCategory = queryClient.getQueryData([
        "categories",
        categoryId,
      ]);
      console.log(previousCategory);

      if (!previousCategory) return;

      queryClient.setQueryData(
        ["categories", categoryId],
        (old: SubCatQueryDataType) => {
          const newData = optimisticSubCatUpdate("edit", old, variable);
          console.log(newData);

          return { ...newData };
        },
      );
      return { previousCategory };
    },

    onSettled: (variable) => {
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
    },

    onSuccess: (data) => {
      setShowSub(false);
      toast.success("Subcategory succesfully updated");
    },

    onError: (error, newCategory, context) => {
      queryClient.setQueryData(
        ["categories", categoryId],
        context?.previousCategory,
      );
      console.error(error);
      toast.error("There was an error updating this Subcategory");
    },
  });

  // SET THE IMAGE URL AND IMAGE FIELD VALUE ON EDITING CATEGORY ON MOUNT
  useEffect(() => {
    if (activeSubcategory) {
      reset({
        name: activeSubcategory?.name,
        description: activeSubcategory?.description,
        image: null,
        status: activeSubcategory?.status,
      });
      if (!watch("image")?.[0]) {
        setImageUrl(activeSubcategory?.image || "");
        setValue("image", activeSubcategory?.image);
      }
    }
  }, [activeSubcategory, reset, watch, setValue]);

  // SET IMAGE URL FOR NEW AND EDITING CATEG0RY ON IMAGE UPLOAD
  useEffect(() => {
    const imageSubscription = watch(({ image }) => {
      if (typeof image === "string") return;

      if (image && image[0] instanceof File) {
        const url = URL.createObjectURL(image[0]);
        setImageUrl(url);

        return () => URL.revokeObjectURL(url);
      }

      if (!image) {
        setImageUrl("");
      }
    });

    return () => imageSubscription.unsubscribe();
  }, [watch]);

  // HANDLE SUBCATEGORY FORM MODAL SUBMISSION
  const onSubmit = async (data: SubCategoryProps) => {
    const subcategory: SubCategory = {
      name: data.name,
      description: data.description,
      image: "",
      status: data.status,
      categoryId: categoryId,
    };

    if (typeof data.image === "string") {
      subcategory.image = data.image;
    }

    try {
      if (data.image[0] instanceof File) {
        const file = data.image[0];
        const imageURL = await uploadImageToFirebase(file);
        subcategory.image = imageURL;
      }
      if (!activeSubcategory) {
        newSubCategory.mutate(subcategory);
      } else {
        const updatedSubCategory = { ...subcategory };
        delete updatedSubCategory.categoryId;

        editActiveSubcategory.mutate({
          subCategory: updatedSubCategory,
          subCategoryId: activeSubcategory?._id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowSub(false);
    setActiveSubcategory(null);
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 flex h-full w-full justify-center bg-black bg-opacity-20 px-4 pb-5 pt-[80px] opacity-0 duration-300",
        showSub && "pointer-events-auto opacity-100",
      )}
    >
      <div className="hide-scrollbar h-full w-full overflow-y-auto">
        <div className="h-min bg-white pb-4 sm:mx-auto sm:w-[450px] md:w-[500px]">
          <div className="flex items-center justify-between bg-neutral-50 px-4 py-3">
            <h2 className="font-semibold">
              {activeSubcategory ? "Edit Subcategory" : "Add Subcategory"}
            </h2>
            <span className="cursor-pointer" onClick={handleClose}>
              <BsX size={24} />
            </span>
          </div>
          <div className="px-4 pt-2">
            <form id="create-subcategory" onSubmit={handleSubmit(onSubmit)}>
              <CreateSubcategoryInput
                control={control}
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
              />

              <CreateSubcategoryImage
                register={register}
                errors={errors}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />

              <SubCategoryBtn
                isValid={isValid}
                handleClose={handleClose}
                isPending={{
                  editing: editActiveSubcategory.isPending,
                  creating: newSubCategory.isPending,
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubategory;

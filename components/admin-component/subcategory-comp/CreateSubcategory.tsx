"use client";
import { cn } from "@/helper/cn";
import { SubCategoryProps } from "@/utils/categoryTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteImageFromFirebase, uploadImageToFirebase } from "@/lib/utils";
import { createSubCategory, editSubCategory } from "@/services/hooks/category";
import { Category, SubCategory } from "@/services/types";
import { optimisticSubCatUpdate } from "@/utils/optimisticCategoryUpdate";
import useBoundStore from "@/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import "react-toggle/style.css";
import { toast } from "sonner";
import * as yup from "yup";
import CreateSubcategoryImage from "./CreateSubcategoryImage";
import CreateSubcategoryInput from "./CreateSubcategoryInput";
import SubCategoryBtn from "./SubCategoryBtn";
import { AxiosError } from "axios";

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
      if (value instanceof File) return true;
      return false;
    })
    .required(" Image is required"),
  status: yup.boolean().required("Status is required"),
});

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

const CreateSubategory = () => {
  const queryClient = useQueryClient();
  const queryParams = useSearchParams();
  const categoryId = queryParams.get("categoryId");

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

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
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
      setShowSub(false);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  // MUTATION HOOK TO EDIT EXSITING SUBCATEGORY
  const editActiveSubcategory = useMutation({
    mutationFn: editSubCategory,
  
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
      setShowSub(false);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
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

  // Handle image selection
  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file); // Create a temporary URL for preview
      setImageUrl(url);
      setValue("image", file); // Update the form value
    }
  };

  // HANDLE SUBCATEGORY FORM MODAL SUBMISSION
  const onSubmit = async (data: SubCategoryProps) => {
    try {
      let imageURL = "";

      // Upload the image to Firebase if a new file is selected
      if (imageFile) {
        imageURL = await uploadImageToFirebase(imageFile);
      } else if (typeof data.image === "string") {
        // Use the existing URL if it's already a string
        imageURL = data.image;
      }

      const payload: SubCategory = {
        name: data.name,
        description: data.description,
        image: imageURL,
        status: data.status,
        categoryId: categoryId,
      };

      if (!activeSubcategory) {
        newSubCategory.mutate(payload);
      } else {
        const updatedSubCategory = { ...payload };
        delete updatedSubCategory.categoryId;

        editActiveSubcategory.mutate({
          subCategory: updatedSubCategory,
          subCategoryId: activeSubcategory?._id,
        });
        setActiveSubcategory(null);
      }
    } catch (error) {
      console.error(error);
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
                handleRemoveImage={handleRemoveImage}
                setImageFile={handleImageChange}
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

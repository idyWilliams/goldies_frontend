import React, { RefObject, useEffect, useState } from "react";
import * as yup from "yup";
import CategoryImage from "./CategoryImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryInputs from "./CategoryInputs";
import { uploadImageToFirebase } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/services/hooks/category";
import { log } from "console";

const schema = yup.object().shape({
  categoryName: yup.string().required("Category name is required"),
  categorySlug: yup.string(),
  description: yup.string().required("Category description is required"),
  image: yup.mixed().required("Category image is required"),
  status: yup.boolean().required("Status is required"),
});

export default function CategoryForm({
  formRef,
  setLoading,
}: {
  formRef: RefObject<HTMLFormElement>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [imageUrl, setImageUrl] = useState<string>("");

  const newCategory = useMutation({
    mutationFn: createCategory,
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    trigger,
    setValue,
    getValues,
    reset,
    formState: { errors, touchedFields },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName: "",
      categorySlug: "",
      description: "",
      image: null,
      status: true,
    },
  });

  const categoryName = watch("categoryName");

  useEffect(() => {
    if (categoryName && categoryName !== " ") {
      const slug = categoryName.toLowerCase().replace(/\s+/g, "_");
      // .replace(/[^\w-]+/g, "");

      setValue("categorySlug", slug);
      console.log(watch());
      console.log(getValues("categorySlug"));
      console.log(errors);
    }
  }, [categoryName, setValue]);

  useEffect(() => {
    if (categoryName && categoryName.startsWith(" ")) {
      setValue("categoryName", categoryName.trimStart());
    }
  }, [categoryName, setValue]);

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(getValues("categorySlug"));
    console.log(data.image[0]);
    const file = data.image[0];
    // setLoading(true);

    // try {
    //   const imageURL = await uploadImageToFirebase(file);
    //   console.log(imageURL);
    //   const category = {
    //     name: data.categoryName,
    //     description: data.description,
    //     image: imageURL,
    //     categorySlug: data.categorySlug,
    //     status: data.status,
    //   };
    //   console.log(category);

    //   newCategory
    //     .mutateAsync(category)
    //     .then((res) => {
    //       console.log(res);
    //       setImageUrl("");
    //       reset();
    //     })
    //     .catch((err) => console.error(err));
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const file: File | null = watch("image", null) && watch("image")[0];

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      console.log(file);
    }
  }, [file]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="create-category" ref={formRef}>
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
  );
}

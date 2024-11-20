import { captalizedName } from "@/helper/nameFormat";
import { Category } from "@/services/types";
import React, { useMemo } from "react";

type CatOptionsParamsType = {
  categories: Category[] | null;
  category: string;
};

const useCategoryOptions = ({ categories, category }: CatOptionsParamsType) => {
  const categoryOptions = useMemo(() => {
    return categories?.map((item) => ({
      label: item.name,
      value: item.name.toLowerCase(),
      disabled: !item.status || item.subCategories.length < 1,
      id: item._id,
      subCategories: [...item.subCategories],
    }));
  }, [categories]);

  const subcategories = useMemo(() => {
    const selectedCategory = categoryOptions?.find(
      (option) => option.value === category,
    );
    return selectedCategory
      ? selectedCategory.subCategories.map((sub) => ({
          label: captalizedName(sub.name),
          value: sub.name.toLowerCase(),
          id: sub._id,
          disabled: !sub.status,
        }))
      : [];
  }, [category, categoryOptions]);

  return { categoryOptions, subcategories };
};

export default useCategoryOptions;

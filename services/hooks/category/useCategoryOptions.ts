import { captalizedName } from "@/helper/nameFormat";
import { Category } from "@/services/types";
import { useMemo } from "react";

type CatOptionsParamsType = {
  categories: Category[] | null;
  category: string;
};

const useCategoryOptions = ({ categories, category }: CatOptionsParamsType) => {
  const categoryOptions = useMemo(() => {
    return categories?.map((item) => ({
      label: item.name,
      value: item._id,
      disabled: !item.status || item.subCategories.length < 1,
      id: item._id,
      subCategories: [...item.subCategories],
    }));
  }, [categories]);

  const subCategoriesOptions = useMemo(() => {
    const selectedCategory = categoryOptions?.find(
      (option) => option.value === category,
    );

    return selectedCategory
      ? selectedCategory.subCategories.map((sub) => ({
          label: captalizedName(sub.name),
          value: sub._id,
          id: sub._id,
          disabled: !sub.status,
        }))
      : [];
  }, [category, categoryOptions]);

  return { categoryOptions, subCategoriesOptions };
};

export default useCategoryOptions;

import { captalizedName } from "@/helper/nameFormat";
import useCategories from "@/services/hooks/category/useCategories";
import useCategoryOptions from "@/services/hooks/category/useCategoryOptions";
import { CreatePdctCatAndSubCatPropType } from "@/types/products";
import React, { useEffect, useMemo } from "react";
import { MultiSelect } from "react-multi-select-component";

const CreatePdctCatAndSubCat = ({
  category,
  setCategoryData,
  setCategory,
  subCategory,
  setSubCategory,
}: CreatePdctCatAndSubCatPropType) => {
  const { categories } = useCategories();

  const { categoryOptions, subcategories } = useCategoryOptions({
    categories,
    category,
  });

  function setActiveCategory(value: string) {
    if (value === "select_category") {
      setCategory("");
    } else setCategory(value);
  }

  useEffect(() => {
    if (category) {
      setSubCategory([]);
      const activeCategory = categoryOptions?.find(
        (option) => option.value === category,
      );

      if (activeCategory)
        setCategoryData({ name: activeCategory.value, id: activeCategory.id });
    }
  }, [category, setSubCategory, categoryOptions, setCategoryData]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="mt-3 w-full">
        <h2 className="mb-1 after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
          Category
        </h2>

        <select
          id="category"
          name="category"
          className="form-select w-full rounded-md border-neutral-300 text-neutral-400"
          onChange={(e: any) => setActiveCategory(e.target.value)}
          value={category}
        >
          <option value={"select_category"}>Select category</option>
          {categoryOptions &&
            categoryOptions.map((option: any, index: number) => (
              <option
                disabled={option.disabled}
                key={option.id}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
        </select>
      </div>
      <div className="mt-3 w-full">
        <h2
          className={`${!category ? "opacity-50" : ""} mb-1 after:ml-1 after:text-xl after:text-[#E10] after:content-['*']`}
        >
          Subcategory
        </h2>
        <div className={`${!category ? "cursor-not-allowed" : ""}`}>
          <MultiSelect
            disabled={!category}
            options={subcategories}
            value={subCategory}
            labelledBy="Select subcategory"
            onChange={setSubCategory}
            className={`${!category ? "pointer-events-none" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePdctCatAndSubCat;

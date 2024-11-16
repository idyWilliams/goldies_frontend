import { captalizedName } from "@/helper/nameFormat";
import useCategories from "@/services/hooks/category/useCategories";
import React, { useEffect, useMemo } from "react";
import { MultiSelect } from "react-multi-select-component";

type CreatePdctCatAndSubCatPropType = {
  category: string;
  setCategoryData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: string;
    }>
  >;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  subCategory: any[];
  setSubCategory: React.Dispatch<React.SetStateAction<any[]>>;
};

const CreatePdctCatAndSubCat = ({
  category,
  setCategoryData,
  setCategory,
  subCategory,
  setSubCategory,
}: CreatePdctCatAndSubCatPropType) => {
  const { categories } = useCategories();

  const categoryOptions = useMemo(() => {
    return categories?.map((item) => ({
      label: item.name,
      value: item.name.toLowerCase(),
      disabled: !item.status || item.subCategories.length < 1,
      id: item._id,
      subCategories: [...item.subCategories],
    }));
  }, [categories]);

  let sub;

  if (!sub || !categoryOptions) {
    sub = (
      <MultiSelect
        disabled={true}
        options={[]}
        value={subCategory}
        onChange={setSubCategory}
        labelledBy="Select subcategory"
        className="pointer-events-none"
      />
    );
  }

  categoryOptions?.forEach((option: any) => {
    if (option.value === category) {
      const subcategories = [...option.subCategories].map((sub) => ({
        label: captalizedName(sub.name),
        value: sub.name.toLowerCase(),
        id: sub._id,
        disabled: !sub.status,
      }));

      sub = (
        <MultiSelect
          disabled={category == null}
          options={subcategories}
          value={subCategory}
          labelledBy="Select subcategory"
          onChange={setSubCategory}
          className={`${category == null ? "pointer-events-none" : ""}`}
        />
      );
    }
  });

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
          onChange={(e: any) => setCategory(e.target.value)}
          value={category}
        >
          <option className="" value={"select_category"}>
            Select category
          </option>
          {categoryOptions &&
            categoryOptions.map((option: any, index: number) => (
              <option
                disabled={option.disabled}
                key={index}
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
        <div className={`${!category ? "cursor-not-allowed" : ""}`}>{sub}</div>
      </div>
    </div>
  );
};

export default CreatePdctCatAndSubCat;

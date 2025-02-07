import { CreatePdctCatAndSubCatPropType } from "@/types/products";
import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

const CreatePdctCatAndSubCat = ({
  categoryOptions,
  category,
  subcatOptions,
  handleChange,
  subCategory,
  setSubCategory,
}: CreatePdctCatAndSubCatPropType) => {

 
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="mt-3 w-full">
        <h2 className="mb-1 after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
          Category
        </h2>

        <select
          id="category"
          name="category"
          className="form-select w-full rounded-md border-neutral-300 disabled:text-neutral-400"
          onChange={handleChange}
          value={category}
        >
          <option value={""} disabled>Select category</option>
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
            options={subcatOptions}
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

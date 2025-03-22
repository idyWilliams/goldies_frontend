import React, { useEffect, useState } from "react";
import CustomSelect, { SelectOptionType } from "../CustomSelect";
import { MultiSelect } from "react-multi-select-component";
import useCategoryOptions from "@/services/hooks/category/useCategoryOptions";
import useCategories from "@/services/hooks/category/useCategories";
import { InformationAndPricingType } from "@/types/products";

export default function InformationAndPricing({
  category,
  subCategories,
  setSubCategories,
  categoryOptions,
  subCategoriesOptions,
  formValues,
  handleChange,
}: InformationAndPricingType) {
  return (
    <section>
      <div>
        <div>
          <label htmlFor="productName" className="">
            <span className="mb-1 mt-6 block  after:ml-1  after:text-[#E10] after:content-['*']">
              Product Name
            </span>
            <input
              name="productName"
              value={formValues.productName}
              onChange={handleChange}
              type="text"
              autoComplete="off"
              id="productName"
              placeholder="Product name"
              className="mb-4 w-full rounded-sm border-neutral-300 bg-white "
            />
          </label>
          <label htmlFor="productDescription" className="">
            <span className="mb-1 block  after:ml-1  after:text-[#E10] after:content-['*']">
              Product Description
            </span>
            <textarea
              name="productDescription"
              value={formValues.productDescription}
              onChange={handleChange}
              autoComplete="off"
              id="productDescription"
              placeholder="Product Description"
              className="h-[110px] w-full resize-none rounded-sm border-neutral-300 bg-white "
            />
          </label>

          <div className="">
            <div className="mt-3 w-full">
              <label className="mb-1 after:ml-1  after:text-[#E10] after:content-['*']">
                Product Category
              </label>

              <select
                name="category"
                value={category}
                // value={category === "select_category" ? "" : category}
                id="category"
                className="form-select w-full rounded-md border-neutral-300 "
                onChange={handleChange}
              >
                <option value={""}>Select category</option>
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
              <label
                className={`${!category ? "opacity-50" : ""} mb-1  after:ml-1  after:text-[#E10] after:content-['*']`}
              >
                Subcategory
              </label>
              <div className={`${!category ? "cursor-not-allowed" : ""}`}>
                <MultiSelect
                  disabled={!category}
                  options={subCategoriesOptions}
                  value={subCategories}
                  labelledBy="Select subcategory"
                  onChange={setSubCategories}
                  className={`${!category ? "pointer-events-none" : ""}`}
                />
              </div>
            </div>

            <div className="mt-3 w-full">
              <label className="mb-1 after:ml-1 after:text-[#E10] after:content-['*']">
                Product Type
              </label>

              <select
                id="productType"
                name="productType"
                className="form-select w-full rounded-md border-neutral-300"
                onChange={handleChange}
                value={formValues.productType}
              >
                <option className="" value={""}>
                  Select product type
                </option>

                <option value="preorder">Preorder</option>
                <option value="available">Available</option>
              </select>
            </div>
          </div>
          <div className="">
            <h1 className="my-3 text-lg font-semibold ">Product Pricing</h1>
            <div className="flex h-full gap-4">
              <label htmlFor="minPrice" className="block">
                <span className="mb-1 inline-block  after:ml-1  after:text-[#E10] after:content-['*']">
                  Price From
                </span>
                <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
                  <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
                    ₦
                  </span>
                  <input
                    name="minPrice"
                    type="number"
                    value={formValues.minPrice === 0 ? "" : formValues.minPrice}
                    min={0}
                    onChange={handleChange}
                    autoComplete="off"
                    id="minPrice"
                    placeholder="Price from"
                    className="w-full border-none bg-transparent pl-12  focus:border-0 focus:ring-0"
                  />
                </div>
              </label>
              <label htmlFor="maxPrice" className="block">
                <span className="mb-1 inline-block  after:ml-1  after:text-[#E10] after:content-['*']">
                  Price To
                </span>
                <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
                  <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
                    ₦
                  </span>
                  <input
                    name="maxPrice"
                    type="number"
                    value={formValues.maxPrice === 0 ? "" : formValues.maxPrice}
                    min={0}
                    onChange={handleChange}
                    autoComplete="off"
                    id="maxPrice"
                    placeholder="Price to"
                    className="w-full border-none bg-transparent pl-12  focus:border-0 focus:ring-0"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import CustomSelect, { SelectOptionType } from "../CustomSelect";
import { MultiSelect } from "react-multi-select-component";

const milestoneSub = [
  { label: "Birthday Cakes", value: "birthday_cakes" },
  { label: "Anniversary Cakes", value: "anniversary_cakes" },
  { label: "Graduation Cakes", value: "graduation_cakes" },
  { label: "Baby Shower Cakes", value: "baby_shower_cakes" },
  { label: "Retirement Cakes", value: "retirement_cakes" },
];
const kidsCakeSub = [
  { label: "Cartoon Character Cakes", value: "cartoon_character_cakes" },
  { label: "Princess Cakes", value: "princess_cakes" },
  { label: "Superhero Cakes", value: "superhero_cakes" },
  { label: "Animal Cakes", value: "animal_cakes" },
  { label: "Fantasy Cakes", value: "fantasy_cakes" },
];
const cupCakeSub = [
  { label: "Classic Cupcakes", value: "classic_cupcakes" },
  { label: "Gourmet Cupcakes", value: "gourmet_cupcakes" },
  { label: "Vegan Cupcakes", value: "vegan_cupcakes" },
  { label: "Gluten-Free Cupcakes", value: "gluten_free_cupcakes" },
  { label: "Seasonal Cupcakes", value: "seasonal_cupcakes" },
];
const weddingCakeSub = [
  {
    label: "Traditional Wedding Cakes",
    value: "traditional_wedding_cakes",
  },
  { label: "Modern Wedding Cakes", value: "modern_wedding_cakes" },
  { label: "Floral Wedding Cakes", value: "floral_wedding_cakes" },
  { label: "Rustic Wedding Cakes", value: "rustic_wedding_cakes" },
  { label: "Themed Wedding Cakes", value: "themed_wedding_cakes" },
];

const selectedSubCategory = (key: any) => {};

const options = [
  { label: "Milestone Cakes", value: "milestone cakes", disabled: false },
  { label: "Kids' Cakes", value: "kids cakes" },
  { label: "Cupcakes", value: "cupcakes", disabled: false },
  { label: "Wedding Cakes", value: "wedding cakes" },
];

export default function InformationAndPricing() {
  const [category, setCategory] = useState<any>();
  const [subCategory, setSubCategory] = useState([]);

  let sub;
  switch (category && category) {
    case "milestone cakes":
      sub = (
        <MultiSelect
          disabled={category == null}
          options={milestoneSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
      break;

    case "kids cakes":
      sub = (
        <MultiSelect
          disabled={category == null}
          options={kidsCakeSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
      break;
    case "cupcakes":
      sub = (
        <MultiSelect
          disabled={category == null}
          options={cupCakeSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
      break;
    case "wedding cakes":
      sub = (
        <MultiSelect
          disabled={category == null}
          options={weddingCakeSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
      break;

    default:
      sub = (
        <MultiSelect
          disabled={true}
          options={weddingCakeSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
          className="text-[10px]"
        />
      );
      break;
  }

  const data = {
    category: {
      name: category,
      subCategory: subCategory,
    },
  };

  return (
    <section>
      <div>
        <div>
          <label htmlFor="ProductName" className="">
            <span className="mb-1 mt-6 block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
              Product Name
            </span>
            <input
              name="productName"
              type="text"
              autoComplete="off"
              id="productName"
              placeholder="Product name"
              className="mb-4 w-full rounded-sm border-none bg-gray-100 placeholder:text-xs"
            />
          </label>
          <label htmlFor="productDescription" className="">
            <span className="mb-1 block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
              Product Description
            </span>
            <textarea
              name="productDescription"
              autoComplete="off"
              id="productDescription"
              placeholder="Product Description"
              className="h-[110px] w-full resize-none rounded-sm border-none bg-gray-100 placeholder:text-[10px]"
            />
          </label>

          <div className="">
            <div className="mt-3 w-full">
              <h2 className="mb-1 text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Product Category
              </h2>

              <select
                className="form-select w-full rounded-md border-neutral-300 text-[10px] text-neutral-400"
                onChange={(e: any) => setCategory(e.target.value)}
                value={category}
              >
                <option
                  className=""
                  value={"select_category"}
                  // disabled
                  // selected
                >
                  Select category
                </option>
                {options.map((option: any, index: number) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 w-full">
              <h2 className="mb-1 text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Subcategory
              </h2>
              {sub}
            </div>
          </div>
          <div className="">
            <h1 className="my-3 text-[14px] font-semibold ">Product Pricing</h1>
            <div className="flex h-full gap-4">
              <label htmlFor="priceFrom" className="block">
                <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                  Price From
                </span>
                <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
                  <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
                    &euro;
                  </span>
                  <input
                    name="priceFrom"
                    type="number"
                    autoComplete="off"
                    id="priceFrom"
                    placeholder="Price from"
                    className="w-full border-none bg-transparent pl-12 placeholder:text-[10px] focus:border-0 focus:ring-0"
                  />
                </div>
              </label>
              <label htmlFor="priceTo" className="block">
                <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                  Price To
                </span>
                <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
                  <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
                    &euro;
                  </span>
                  <input
                    name="priceTo"
                    type="number"
                    autoComplete="off"
                    id="priceTo"
                    placeholder="Price to"
                    className="w-full border-none bg-transparent pl-12 placeholder:text-[10px] focus:border-0 focus:ring-0"
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

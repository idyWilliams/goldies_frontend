import React, { useState } from "react";
import CustomSelect, { SelectOptionType } from "../CustomSelect";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Milestone Cakes", value: "milestone cakes", disabled: false },
  { label: "Kids' Cakes", value: "kids cakes" },
  { label: "Cupcakes", value: "cupcakes", disabled: false },
  { label: "Wedding Cakes", value: "wedding cakes" },
];

export default function MobileCreateStep1() {
  const [category, setCategory] = useState<SelectOptionType>(null);
  const [subCategory, setSubCategory] = useState([]);

  return (
    <section>
      <div>
        <h1 className="mb-3 font-bold uppercase">Create New Products</h1>
        <hr className="border-1 mb-3 border-black" />
        <div>
          <label htmlFor="ProductName" className="">
            <span className="mb-1 block text-[12px]">Product Name</span>
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
            <span className="mb-1 block text-[12px]">Product Description</span>
            <textarea
              name="productDescription"
              autoComplete="off"
              id="productDescription"
              placeholder="Product Description"
              className="h-[110px] w-full resize-none rounded-sm border-none bg-gray-100 placeholder:text-xs"
            />
          </label>

          <div className="">
            <div className="mt-3 w-full">
              <h1 className="mb-1 text-[12px]">Product Category</h1>

              <CustomSelect
                selectedOption={category}
                setSelectOption={setCategory}
                options={options || []}
              />
            </div>
            <div className="mt-3 w-full">
              <h1 className="mb-1 text-[12px]">Product Subcategory</h1>
              <MultiSelect
                disabled={category == null}
                options={options}
                value={subCategory}
                onChange={setSubCategory}
                labelledBy="Select subcategory"
                className="bg-gray-100"
              />
            </div>
          </div>
          <div className="">
            <h1 className="my-3 font-bold ">Product Pricing</h1>
            <div className="flex h-full gap-4">
              <label htmlFor="priceFrom" className="block">
                <span className="mb-1 inline-block text-[12px]">
                  Price From
                </span>
                <input
                  name="priceFrom"
                  type="text"
                  autoComplete="off"
                  id="priceFrom"
                  placeholder="Product price from"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100 placeholder:text-xs"
                />
              </label>
              <label htmlFor="priceTo" className="block">
                <span className="mb-1 inline-block text-[12px]">Price To</span>
                <input
                  name="priceTo"
                  type="text"
                  autoComplete="off"
                  id="priceTo"
                  placeholder="Product price to"
                  className="mb-4 w-full rounded-sm border-none bg-gray-100 placeholder:text-xs"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

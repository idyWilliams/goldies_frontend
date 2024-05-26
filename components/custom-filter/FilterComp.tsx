import { categories } from "@/utils/cakeCategories";
import { Add, ArrowRotateRight, Minus } from "iconsax-react";
import React, { useState } from "react";
import RangeInput from "./RangeInput";

const FilterComp = ({ min, max }: { min: number; max: number }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [minValue, set_minValue] = useState(min);
  const [maxValue, set_maxValue] = useState(max);
  const handleInput = (e: any) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const handleClick = (index: any) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const handleReset = () => {
    set_minValue(min);
    set_maxValue(max);

    console.log("clicked");
  };

  const handleChage = (e: any) => {
    set_minValue(e.min);
    set_maxValue(e.max);
  };

  // console.log(min(), "min", max());
  return (
    <div className="w-full">
      <div className="space-y-3">
        {categories.map((cat: any, index: number) => {
          const isOpen = index === openIndex;
          return (
            <div className="border-t border-neutral-200 pt-3" key={index}>
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleClick(index)}
              >
                <span className="inline-block font-semibold capitalize text-neutral-800">
                  {cat?.label}
                </span>{" "}
                <span className="text-neutral-500">
                  {isOpen ? <Minus /> : <Add />}
                </span>{" "}
              </div>

              <div
                className={`mb-3 mt-3 w-full space-y-4 overflow-hidden pl-1.5 duration-300 ${isOpen ? "block" : "hidden"}`}
              >
                {cat?.subcategories?.map((sub: any, index: number) => (
                  <label
                    htmlFor={sub?.value}
                    className="flex items-center gap-2"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      name={sub?.value}
                      id={sub?.value}
                      className="rounded-sm checked:bg-black checked:hover:bg-black focus:border-black focus:ring-black checked:focus:bg-black"
                    />
                    <span className="whitespace-nowrap text-neutral-500">
                      {sub?.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
        <div className="flex cursor-pointer flex-col border-t border-neutral-200 pt-3">
          <label
            htmlFor="priceRange"
            className="block font-semibold capitalize text-neutral-800"
          >
            Price
          </label>
          <RangeInput
            min={minValue}
            max={maxValue}
            // onChange={(e: any) => handleChage(e)}
          />
          {/* <RangeInput min={0} max={10} onChange={() => {}} /> */}
        </div>
        <div
          onClick={handleReset}
          className="group flex cursor-pointer items-center gap-2 border-t border-neutral-200 pt-3 text-neutral-600"
        >
          <span className="inline-block font-medium capitalize group-hover:text-neutral-900">
            Reset Filter
          </span>
          <span className="group-hover:text-neutral-900">
            <ArrowRotateRight size={20} />
          </span>
        </div>
        {/* <div className="border-t border-neutral-200 pt-3" key={index}>
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={() => handleClick(index)}
          >
            <span className="inline-block font-semibold capitalize text-neutral-800">
              {cat?.label}
            </span>{" "}
            <span className="text-neutral-500">
              {isOpen ? <Minus /> : <Add />}
            </span>{" "}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FilterComp;

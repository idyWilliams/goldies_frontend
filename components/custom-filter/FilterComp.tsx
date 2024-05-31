import { categories as CategoriesList } from "@/utils/cakeCategories";
import { Add, ArrowRotateRight, Minus } from "iconsax-react";
import React, { useEffect, useState } from "react";
import RangeInput from "./RangeInput";
import { useSearchParams } from "next/navigation";

const FilterComp = ({
  min,
  max,
  category,
  subcategory,
  selectedOptions,
  setSelectedOptions,
}: {
  min: number;
  max: number;
  category?: string | null;
  subcategory?: string | null;
  setSelectedOptions: any;
  selectedOptions: any[];
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [categories, setCategories] = useState<any[]>(CategoriesList);
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
    setSelectedOptions([]);
    console.log("clicked");
  };

  const handleRangeChange = (values: { min: number; max: number }) => {
    set_minValue(values.min);
    set_maxValue(values.max);
  };

  const handleSelectedItem = (e: any, val: string) => {
    const name = e.target.name;
    const value = e.target.value;
    const isChecked = e.target.checked;
    // setSelectedOptions(value);
    setSelectedOptions((value: any) => {
      return [...value, { checked: isChecked, value: name }];
    });
    // setSelectedOptions((prev: any) =>
    //   prev?.filter((item: any) => item?.value !== val),
    // );
    console.log(name, value, isChecked, "value");
  };

  useEffect(() => {
    if (category) {
      setCategories(
        CategoriesList?.filter((cat) => cat.label.toLowerCase() === category),
      );
      setOpenIndex((prev: any) => (prev === null ? 0 : prev));
      setSelectedOptions([
        {
          value: subcategory?.replace(/ /g, "_"),
          checked: true,
        },
      ]);
    } else {
      setCategories(CategoriesList);
      setOpenIndex(null);
      setSelectedOptions([]);
    }
  }, [category, subcategory]);

  console.log(selectedOptions);
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
                      onChange={(event: any) =>
                        handleSelectedItem(event, sub?.value)
                      }
                      id={sub?.value}
                      checked={selectedOptions?.some(
                        (opt: any) =>
                          opt.value.toLowerCase() ===
                            sub?.value.toLowerCase() && opt.checked,
                      )}
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
          <RangeInput min={100} max={238} onChange={handleRangeChange} />
        </div>
        <div className="grid grid-cols-2 justify-center gap-2 pt-7">
          <button className="group flex cursor-pointer items-center justify-center gap-2 rounded-md bg-neutral-900 p-3 px-8 text-white">
            <span className="inline-block font-medium capitalize ">Filter</span>
          </button>
          <button
            onClick={handleReset}
            className="group flex cursor-pointer items-center justify-center gap-2 rounded-md border border-red-600 p-3 text-red-600"
          >
            <span className="inline-block font-medium capitalize">
              Reset Filter
            </span>
            {/* <span className="group-hover:text-neutral-900">
              <ArrowRotateRight size={20} />
            </span> */}
          </button>
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

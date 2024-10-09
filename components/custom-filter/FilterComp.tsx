import { categories as CategoriesList } from "@/utils/cakeCategories";
import { Add, ArrowRotateRight, Minus } from "iconsax-react";
import React, { useEffect, useState } from "react";
import RangeInput from "./RangeInput";
import { useSearchParams } from "next/navigation";
import Checkbox from "./Checkbox";
import { captalizedName } from "@/helper/nameFormat";
import { fetchCategories } from "@/services/hooks/category";
import { useQuery } from "@tanstack/react-query";

const FilterComp = ({
  min,
  max,
  category,
  subcategory,
  selectedOptions,
  setSelectedOptions,
  onFilter,
  query,
}: {
  min: number;
  max: number;
  category?: string | null;
  subcategory?: string | null;
  setSelectedOptions: any;
  selectedOptions: any[];
  onFilter: any;
  query?: any;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [minValue, set_minValue] = useState(min);
  const [maxValue, set_maxValue] = useState(max);
  const { data, isPending, isSuccess } = useQuery({
    queryFn: fetchCategories,
    queryKey: ["all categories"],
  });

  useEffect(() => {
    if (!isPending && isSuccess) {
      setCategories(data?.categories);
    } else {
      setCategories([]);
    }
  }, [isPending, isSuccess, data]);

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

  // const handleSelectedItem = (e: any, val: string) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   const isChecked = e.target.checked;
  //   // setSelectedOptions(value);
  //   setSelectedOptions((value: any) => {
  //     return [...value, { checked: isChecked, value: name }];
  //   });
  //   // setSelectedOptions((prev: any) =>
  //   //   prev?.filter((item: any) => item?.value !== val),
  //   // );
  //   console.log(name, value, isChecked, "value");
  // };

  const handleSelectedItem = (label: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedOptions((prevSelectedItems: any) => [
        ...prevSelectedItems,
        label?.toLowerCase(),
      ]);
    } else {
      setSelectedOptions((prevSelectedItems: any) =>
        prevSelectedItems.filter((item: any) => item !== label),
      );
    }
  };

  useEffect(() => {
    if (category) {
      setCategories((prevcat: any) =>
        prevcat?.filter((cat: any) => cat?.name?.toLowerCase() === category),
      );
      setOpenIndex((prev: any) => (prev === null ? 0 : prev));
      setSelectedOptions([captalizedName(subcategory || "")]);
    } else {
      setCategories(data?.categories);
      setOpenIndex(0);
      setSelectedOptions((prev: any) => [...prev]);
    }
  }, [category, subcategory]);

  return (
    <div className="w-full">
      <div className="space-y-3">
        
        <div>
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="mb-3 animate-pulse border-t border-gray-200 pt-3"
                  key={index}
                >
                  <div className="flex items-center">
                    <div className="h-5 w-2/3 rounded-md bg-gray-300"></div>
                    <div className="ml-3 h-5 w-5 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="mt-2 h-4 w-4/5 rounded-md bg-gray-300"></div>
                  <div className="mt-2 h-4 w-4/5 rounded-md bg-gray-300"></div>
                </div>
              ))
            : categories?.map((cat: any, index: number) => {
                const isOpen = index === openIndex;
                if (cat?.subCategories?.length < 1) return null;
                return (
                  <div className="border-t border-neutral-200 pt-3" key={index}>
                    <div
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() => handleClick(index)}
                    >
                      <span className="inline-block font-semibold capitalize text-neutral-800">
                        {cat?.name}
                      </span>{" "}
                      <span className="text-neutral-500">
                        {isOpen ? <Minus /> : <Add />}
                      </span>{" "}
                    </div>

                    <div
                      className={`mb-3 mt-3 w-full space-y-4 overflow-hidden pl-1.5 duration-300 ${isOpen ? "block" : "hidden"}`}
                    >
                      {cat?.subCategories?.map((sub: any, subindex: number) => (
                        // <label
                        //   htmlFor={sub?.value}
                        //   className="flex items-center gap-2"
                        //   key={index}
                        // >

                        //   <input
                        //     type="checkbox"
                        //     name={sub?.value}
                        //     onChange={(event: any) =>
                        //       handleSelectedItem(
                        //         sub?.value,
                        //         selectedOptions?.includes(sub?.value),
                        //       )
                        //     }
                        //     id={sub?.value}
                        //     checked={selectedOptions?.some(
                        //       (opt: any) =>
                        //         opt.value.toLowerCase() ===
                        //           sub?.value.toLowerCase() && opt.checked,
                        //     )}
                        //     className="rounded-sm checked:bg-black checked:hover:bg-black focus:border-black focus:ring-black checked:focus:bg-black"
                        //   />
                        //   <span className="whitespace-nowrap text-neutral-500">
                        //     {sub?.label}
                        //   </span>
                        // </label>

                        <Checkbox
                          key={subindex}
                          label={sub?.name}
                          isChecked={selectedOptions.includes(sub?.name)}
                          onCheckboxChange={handleSelectedItem}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
        </div>

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
            <span
              className="inline-block font-medium capitalize "
              onClick={onFilter}
            >
              Filter
            </span>
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

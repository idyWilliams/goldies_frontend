import React, { useEffect, useState } from "react";

type CreatePdctPricingPropType = {
  maxPrice: number;
  minPrice: number;
  handleChange: (e: any) => void;
};

export const formatNumberWithCommas = (value: number): string => {
  return value === 0 ? "" : value.toLocaleString("en-US");
};

const CreateProductPricing = ({
  maxPrice,
  minPrice,
  handleChange,
}: CreatePdctPricingPropType) => {
  const [formattedMinPrice, setFormattedMinPrice] = useState<string>("");
  const [formattedMaxPrice, setFormattedMaxPrice] = useState<string>("");

  useEffect(() => {
    setFormattedMinPrice(formatNumberWithCommas(minPrice));
    setFormattedMaxPrice(formatNumberWithCommas(maxPrice));
  }, [minPrice, maxPrice]);

  const handleFormattedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Remove all non-digit characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Format with commas
    const formattedValue =
      numericValue === ""
        ? ""
        : parseFloat(numericValue).toLocaleString("en-US");

    // Update the local formatted state
    if (name === "minPrice") {
      setFormattedMinPrice(formattedValue);
    } else {
      setFormattedMaxPrice(formattedValue);
    }

    // Create a synthetic event with the parsed numeric value
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: numericValue === "" ? "0" : numericValue,
      },
    };

    handleChange(syntheticEvent);
  };

  return (
    <>
      <h1 className="mb-3 font-bold">Product Pricing</h1>
      <div className="flex h-full w-full gap-4 rounded-md border border-neutral-300 p-4">
        <label htmlFor="minPrice" className="block flex-grow">
          <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
            Price From
          </span>
          <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
            <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
              ₦
            </span>
            <input
              name="minPrice"
              type="text"
              value={formattedMinPrice}
              onChange={handleFormattedChange}
              autoComplete="off"
              id="minPrice"
              placeholder="Price ranges from"
              className="w-full border-none bg-transparent pl-12 focus:border-0 focus:ring-0"
            />
          </div>
        </label>
        <label htmlFor="maxPrice" className="block flex-grow">
          <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
            Price To
          </span>
          <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
            <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
              ₦
            </span>
            <input
              name="maxPrice"
              type="text"
              value={formattedMaxPrice}
              onChange={handleFormattedChange}
              autoComplete="off"
              id="maxPrice"
              placeholder="Price ranges to"
              className="w-full border-none bg-transparent pl-12 focus:border-0 focus:ring-0"
            />
          </div>
        </label>
      </div>
    </>
  );
};

export default CreateProductPricing;

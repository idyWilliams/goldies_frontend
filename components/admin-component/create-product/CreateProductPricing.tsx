import React from "react";

type CreatePdctPricingPropType = {
  maxPrice: number;
  minPrice: number;
  handleChange: (e: any) => void;
};

const CreateProductPricing = ({
  maxPrice,
  minPrice,
  handleChange,
}: CreatePdctPricingPropType) => {
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
              &euro;
            </span>
            <input
              name="minPrice"
              type="number"
              value={minPrice === 0 ? "" : minPrice}
              min={0}
              step={0.01}
              onChange={handleChange}
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
              &euro;
            </span>
            <input
              name="maxPrice"
              type="number"
              value={maxPrice === 0 ? "" : maxPrice}
              min={0}
              step={0.01}
              onChange={handleChange}
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

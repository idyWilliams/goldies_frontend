import React from "react";

const CreateProductPricing = () => {
  return (
    <>
      <h1 className="mb-3 font-bold">Product Pricing</h1>
      <div className="flex h-full w-full gap-4 rounded-md border border-neutral-300 p-4">
        <label htmlFor="priceFrom" className="block flex-grow">
          <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
            Price From
          </span>
          <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
            <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
              &euro;
            </span>
            <input
              name="priceFrom"
              min={0}
              type="number"
              autoComplete="off"
              id="priceFrom"
              placeholder="Price ranges from"
              className="w-full border-none bg-transparent pl-12 focus:border-0 focus:ring-0"
            />
          </div>
        </label>
        <label htmlFor="priceTo" className="block flex-grow">
          <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
            Price To
          </span>
          <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
            <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
              &euro;
            </span>
            <input
              name="priceTo"
              type="number"
              min={0}
              autoComplete="off"
              id="priceTo"
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

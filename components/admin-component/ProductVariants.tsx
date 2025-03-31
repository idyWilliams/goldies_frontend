import { ProductVariantsPropType } from "@/types/products";
import {
  cakeShapes,
  cakeSizes,
  fillingsList,
  toppings,
} from "@/utils/productDetails";
import { InfoCircle } from "iconsax-react";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

export default function ProductVariants({
  shapes,
  setShapes,
  sizes,
  setSizes,
  flavour,
  setFlavours,
  addOn,
  setAddOn,
  productType,
}: ProductVariantsPropType) {
  return (
    <section>
      <div>
        <div className="mt-6 w-full">
          <div className="inline-flex items-center mb-2 text-red-500">
            <InfoCircle size={16} />
            <em className="ml-1">Only preorder products can have variants</em>
          </div>
          <div className="grid h-full grid-cols-1 gap-2">
            <label htmlFor="ProductShapes" className="block">
              <span
                className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block  after:ml-1  after:text-[#E10] after:content-['*']`}
              >
                Product Shapes
              </span>
              <div
                className={`${productType !== "preorder" ? "cursor-not-allowed" : ""}`}
              >
                <MultiSelect
                  className={`${productType !== "preorder" ? "pointer-events-none" : ""} `}
                  options={cakeShapes}
                  value={shapes}
                  onChange={setShapes}
                  labelledBy="Select shapes"
                />
              </div>
            </label>
            <label htmlFor="ProductSizes" className="block">
              <span
                className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block  after:ml-1  after:text-[#E10] after:content-['*']`}
              >
                Product Sizes
              </span>
              <div
                className={`${productType !== "preorder" ? "cursor-not-allowed" : ""}`}
              >
                <MultiSelect
                  className={`${productType !== "preorder" ? "pointer-events-none" : ""} `}
                  options={cakeSizes}
                  value={sizes}
                  onChange={setSizes}
                  labelledBy="Select sizes"
                />
              </div>
            </label>
            <label htmlFor="ProductFillings" className="block">
              <span
                className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block  after:ml-1  after:text-[#E10] after:content-['*']`}
              >
                Product Flavours
              </span>
              <div
                className={`${productType !== "preorder" ? "cursor-not-allowed" : ""}`}
              >
                <MultiSelect
                  className={`${productType !== "preorder" ? "pointer-events-none" : ""} `}
                  disabled={productType !== "preorder"}
                  options={fillingsList}
                  value={flavour}
                  onChange={setFlavours}
                  labelledBy="Select fillings"
                />
              </div>
            </label>
            <label htmlFor="ProductToppings" className="block">
              <span
                className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block  after:ml-1  after:text-[#E10] after:content-['*']`}
              >
                Toppings/Add-ons
              </span>
              <div
                className={`${productType !== "preorder" ? "cursor-not-allowed" : ""}`}
              >
                <MultiSelect
                  options={toppings}
                  value={addOn}
                  onChange={setAddOn}
                  labelledBy="Select toppings/add-ons"
                  className={`${productType !== "preorder" ? "pointer-events-none" : ""} `}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

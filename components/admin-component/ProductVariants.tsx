import { ProductVariantsPropType } from "@/types/products";
import {
  cakeShapes,
  cakeSizes,
  fillingsList,
  toppings,
} from "@/utils/productDetails";
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
          <div className="grid h-full grid-cols-1 gap-2">
            <label htmlFor="ProductShapes" className="block">
              <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Product Shapes
              </span>
              <MultiSelect
                className="text-[10px]"
                options={cakeShapes}
                value={shapes}
                onChange={setShapes}
                labelledBy="Select shapes"
              />
            </label>
            <label htmlFor="ProductSizes" className="block">
              <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Product Sizes
              </span>
              <MultiSelect
                className="text-[10px]"
                options={cakeSizes}
                value={sizes}
                onChange={setSizes}
                labelledBy="Select sizes"
              />
            </label>
            <label htmlFor="ProductFillings" className="block">
              <span
                className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']`}
              >
                Product Flavours
              </span>
              <div
                className={`${productType !== "preorder" ? "cursor-not-allowed" : ""}`}
              >
                <MultiSelect
                  className={`${productType !== "preorder" ? "pointer-events-none" : ""} text-[10px]`}
                  disabled={productType !== "preorder"}
                  options={fillingsList}
                  value={flavour}
                  onChange={setFlavours}
                  labelledBy="Select fillings"
                />
              </div>
            </label>
            <label htmlFor="ProductToppings" className="block">
              <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Toppings/Add-ons
              </span>
              <MultiSelect
                className="text-[10px]"
                options={toppings}
                value={addOn}
                onChange={setAddOn}
                labelledBy="Select toppings/add-ons"
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

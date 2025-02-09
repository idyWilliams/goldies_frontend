import React from "react";
import { MultiSelect } from "react-multi-select-component";
import {
  cakeSizes,
  toppings,
  cakeShapes,
  fillingsList,
} from "@/utils/productDetails";
import { ProductVariantsPropType } from "@/types/products";

const CreateProductVariants = ({
  shapes,
  setShapes,
  sizes,
  setSizes,
  flavour,
  setFlavours,
  addOn,
  setAddOn,
  productType,
}: ProductVariantsPropType) => {
  return (
    <>
      <h2 className="mb-3 font-bold">Product Variant</h2>
      <div className="grid h-full grid-cols-2 gap-2 rounded-md border border-neutral-300 p-4">
        <div className="block">
          <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
            Product Shapes
          </span>
          <MultiSelect
            options={cakeShapes}
            value={shapes}
            onChange={setShapes}
            labelledBy="Select shapes"
          />
        </div>
        <div className="block">
          <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
            Product Sizes
          </span>
          <MultiSelect
            options={cakeSizes}
            value={sizes}
            onChange={setSizes}
            labelledBy="Select sizes"
          />
        </div>
        <div className="block">
          <span
            className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']`}
          >
            Product Flavours
          </span>
          <div
            className={`${productType !== "preorder" ? "cursor-not-allowed" : ""}`}
          >
            <MultiSelect
              disabled={productType !== "preorder"}
              options={fillingsList}
              value={flavour}
              onChange={setFlavours}
              labelledBy="Select fillings"
              className={`${productType !== "preorder" ? "pointer-events-none" : ""}`}
            />
          </div>
        </div>
        <div className="block">
          <span className="mb-1  inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
            Toppings/Add-ons
          </span>
          <MultiSelect
            options={toppings}
            value={addOn}
            onChange={setAddOn}
            labelledBy="Select toppings/add-ons"
          />
        </div>
      </div>
    </>
  );
};

export default CreateProductVariants;

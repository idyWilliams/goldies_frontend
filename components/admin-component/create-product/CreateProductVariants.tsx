import React from "react";
import { MultiSelect } from "react-multi-select-component";
import {
  cakeSizes,
  toppings,
  cakeShapes,
  fillingsList,
} from "@/utils/productDetails";
import { ProductVariantsPropType } from "@/types/products";
import { Tooltip } from "react-tooltip";
import { InfoCircle } from "iconsax-react";

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
      <div className="inline-flex items-center mb-3">
        <h2 className="font-bold">Product Variant </h2>
        <span className="ml-1 cursor-pointer" id={`my-anchor-element-variant`}>
          <span>
            <InfoCircle size={16} />
          </span>
        </span>
        <Tooltip
          className="border"
          anchorSelect={`#my-anchor-element-variant`}
          content={"Only preorder products can have variants"}
          place="right"
        />
      </div>
      <div className="grid h-full grid-cols-2 gap-2 rounded-md border border-neutral-300 p-4">
        <div className="block">
          <span
            className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']`}
          >
            Product Shapes
          </span>
          <div
            className={`${productType !== "preorder" ? "cursor-not-allowed" : ""}`}
          >
            <MultiSelect
              options={cakeShapes}
              value={shapes}
              onChange={setShapes}
              labelledBy="Select shapes"
              className={`${productType !== "preorder" ? "pointer-events-none" : ""}`}
            />
          </div>
        </div>
        <div className="block">
          <span
            className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']`}
          >
            Product Sizes
          </span>
          <div
            className={`${productType !== "preorder" ? "cursor-not-allowed" : ""}`}
          >
            <MultiSelect
              options={cakeSizes}
              value={sizes}
              onChange={setSizes}
              labelledBy="Select sizes"
              className={`${productType !== "preorder" ? "pointer-events-none" : ""}`}
            />
          </div>
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
          <span
            className={`${productType !== "preorder" ? "opacity-50" : ""} mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']`}
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
              className={`${productType !== "preorder" ? "pointer-events-none" : ""}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductVariants;

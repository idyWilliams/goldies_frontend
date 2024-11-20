import React, { useEffect } from "react";

type CreatePdctTypePropType = {
  productType: string;
  setProductType: React.Dispatch<React.SetStateAction<string>>;
};

const CreatePdctType = ({
  productType,
  setProductType,
}: CreatePdctTypePropType) => {
  function setType(value: string) {
    if (value === "select_product_type") {
      setProductType("");
    } else setProductType(value);
  }

  return (
    <div className="mt-3 w-full">
      <h2 className="mb-1 after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
        Product Type
      </h2>
      <select
        id="productType"
        name="productType"
        className="form-select w-full rounded-md border-neutral-300 text-neutral-400"
        onChange={(e: any) => setType(e.target.value)}
        value={productType}
      >
        <option className="" value={"select_product_type"}>
          Select product type
        </option>

        <option value="preorder">Preorder</option>
        <option value="available">Available</option>
      </select>
    </div>
  );
};

export default CreatePdctType;

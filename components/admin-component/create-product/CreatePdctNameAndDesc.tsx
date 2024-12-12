import React from "react";

type PdctNameandDecPropType = {
  productName: string;
  productDescription: string;
  handleChange: (e: any) => void;
};

const CreatePdctNameAndDesc = ({
  productName,
  productDescription,
  handleChange,
}: PdctNameandDecPropType) => {
  return (
    <>
      <label htmlFor="productName" className="">
        <span className="mb-1 block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
          Product Name
        </span>
        <input
          required
          name="productName"
          value={productName}
          type="text"
          autoComplete="off"
          id="productName"
          placeholder="Product name"
          onChange={handleChange}
          className="mb-4 w-full rounded-sm border-none bg-gray-100 placeholder:text-sm"
        />
      </label>
      <label htmlFor="productDescription" className="">
        <span className="mb-1 block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
          Product Description
        </span>
        <textarea
          name="productDescription"
          value={productDescription}
          autoComplete="off"
          id="productDescription"
          placeholder="Product Description"
          onChange={handleChange}
          className="h-[110px] w-full resize-none rounded-sm border-none bg-gray-100 placeholder:text-sm"
        />
      </label>
    </>
  );
};

export default CreatePdctNameAndDesc;

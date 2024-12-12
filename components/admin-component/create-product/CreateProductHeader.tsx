import React from "react";
import { CgSpinner } from "react-icons/cg";

type CreateProductHeaderPropType = {
  isSubmitting: boolean;
};

const CreateProductHeader = ({ isSubmitting }: CreateProductHeaderPropType) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold">Create New Products</h1>
      <button
        className="relative rounded-md bg-black px-10 py-2 text-[12px] text-goldie-300 disabled:pointer-events-none disabled:opacity-75"
        type="submit"
        disabled={isSubmitting}
      >
        <CgSpinner
          className={`${isSubmitting ? "block" : "hidden"} absolute left-[45%] top-[20%] h-6 w-6 animate-spin `}
        />

        <span className={`${isSubmitting ? "opacity-0" : "opacity-100"}`}>
          Save Changes
        </span>
      </button>
    </div>
  );
};

export default CreateProductHeader;

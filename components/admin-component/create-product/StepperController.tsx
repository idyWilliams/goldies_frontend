import { createProductContext } from "@/context/CreateProductContext";
import React, { useContext, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export default function StepperController() {
  const { checkoutStep, currentStep, handleClick } =
    useContext(createProductContext);
  const [loading, setIsLoading] = useState(false);

  // console.log(checkoutStep, currentStep);
  const submitDetails = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    handleClick("next");
    if (currentStep === checkoutStep?.length) {
      console.log("data");
    }
  };
  return (
    <div className="mt-5 flex justify-end gap-1">
      <button
        disabled={currentStep === 1}
        onClick={() => {
          handleClick("");
        }}
        className="h-[24px] w-[57px] rounded-[2.42px] bg-[#CFCFCF] text-[10px] text-black"
      >
        Back
      </button>
      <button
        onClick={submitDetails}
        className="text-goldie-300 h-[24px] w-[57px] rounded-[2.42px] bg-black text-[10px]"
      >
        {currentStep === checkoutStep?.length ? (
          <span className="inline-flex items-center gap-2">
            {loading && <CgSpinner size={20} className="animate-spin" />} Save
          </span>
        ) : (
          "Next"
        )}
      </button>
    </div>
  );
}

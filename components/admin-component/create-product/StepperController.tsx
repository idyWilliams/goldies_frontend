import { Button } from "@/components/ui/button";
import { CreateProductContext } from "@/context/CreateProductContext";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export default function StepperController({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const router = useRouter();
  const { checkoutStep, currentStep, handleClick } =
    useContext(CreateProductContext);

  const submitDetails = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    handleClick("next");
    if (currentStep === checkoutStep?.length) {
      console.log("data");
    }
  };

  const handleCancel = () => {
    router.push("/admin/products");
  };

  return (
    <div className="mt-8 flex items-center justify-between gap-2">
      <Button
        type="button"
        variant={"secondary"}
        className="relative bg-neutral-400 text-sm "
        onClick={handleCancel}
      >
        Cancel
      </Button>

      <div className="flex items-center justify-between gap-2">
        {currentStep > 1 && (
          <Button
            type="button"
            variant={"secondary"}
            disabled={currentStep === 1}
            onClick={() => {
              handleClick("");
            }}
            className=" bg-[#CFCFCF]  text-black"
          >
            Back
          </Button>
        )}

        {/* <button
        onClick={submitDetails}
        className="h-[24px] w-[57px] rounded-[2.42px] bg-black text-[10px] text-goldie-300"
      >
        {currentStep === checkoutStep?.length ? (
          <span className="inline-flex items-center gap-2">
            {loading && <CgSpinner size={20} className="animate-spin" />} Save
          </span>
        ) : (
          "Next"
        )}
      </button> */}

        {currentStep === checkoutStep?.length && (
          <Button
            type="submit"
            disabled={isSubmitting}
            className=" bg-black text-goldie-300"
          >
            <span className="inline-flex items-center gap-2">
              {isSubmitting && <CgSpinner size={20} className="animate-spin" />}{" "}
              Save
            </span>
          </Button>
        )}
        {currentStep < checkoutStep?.length && (
          <Button
            type="button"
            onClick={submitDetails}
            className="bg-black text-goldie-300"
          >
            <span className="inline-flex items-center gap-2">Next</span>
          </Button>
        )}
      </div>
    </div>
  );
}

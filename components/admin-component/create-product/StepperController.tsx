import React from "react";

export default function StepperController() {
  return (
    <div className="mt-3 flex justify-end gap-1">
      <button className="h-[24px] w-[57px] rounded-[2.42px] bg-[#CFCFCF] text-[10px] text-black">
        Back
      </button>
      <button className="h-[24px] w-[57px] rounded-[2.42px] bg-black text-[10px] text-main">
        Save
      </button>
    </div>
  );
}

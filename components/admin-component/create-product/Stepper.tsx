import React, { useRef, useState } from "react";

type Steps = {
  highlighted: boolean;
  selected: boolean;
  completed: boolean;
};

export default function Stepper(checkoutStep: any, currentStep: any) {
  const [newStep, setNewStep] = useState<Steps[]>([]);
  const stepRef = useRef<Steps[]>([]);

  return (
    <div className="bg-black p-4">
      <div>
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-[11.27px] font-bold text-[#D9D9D9]">Step 1</h1>
          <p className="text-[8.76px] text-[#D9D9D9]">
            Information and Pricing
          </p>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#E4D064] text-[10px] text-black">
            1
          </div>
          <hr className="w-[47px] border-[#D9D9D9]" />
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#D9D9D9] text-[10px] text-black">
            2
          </div>
          <hr className="w-[47px] border-[#D9D9D9]" />
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#D9D9D9] text-[10px] text-black">
            3
          </div>
        </div>
      </div>
    </div>
  );
}

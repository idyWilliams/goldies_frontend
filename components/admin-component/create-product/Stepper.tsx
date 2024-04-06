import React, { useEffect, useRef, useState } from "react";

type Steps = {
  highlighted: boolean;
  selected: boolean;
  completed: boolean;
  description: string;
};

export default function Stepper({
  checkoutStep,
  currentStep,
}: {
  checkoutStep: string[];
  currentStep: number;
}) {
  const [newStep, setNewStep] = useState<Steps[]>([]);
  const stepRef = useRef<Steps[]>([]);

  const updateStep = (stepNumber: number, checkoutSteps: any) => {
    const newSteps = [...checkoutSteps];
    let count = 0;

    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    const stepsState = checkoutStep?.map((step: any, index: number) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        },
      ),
    );

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);

    setNewStep(current);
  }, [checkoutStep, currentStep]);
  return (
    <div className="bg-black p-4">
      {newStep.map((step, index) => (
        <div key={index}>
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-[11.27px] font-bold text-[#D9D9D9]">
              Step {index + 1}
            </h1>
            <p className="text-[8.76px] text-[#D9D9D9]">{step.description}</p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div
              className={`${step.completed ? "bg-[#14AE56]" : " bg-[#D9D9D9]"} flex h-[32px] w-[32px] items-center justify-center rounded-full ${step.selected && "bg-[#E4D064]"} text-[10px] text-black`}
            >
              {step.completed ? index + 1 : index + 1}
            </div>
            <hr className="w-[47px] border-[#D9D9D9]" />
            {/* <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#D9D9D9] text-[10px] text-black">
            2
          </div>
          <hr className="w-[47px] border-[#D9D9D9]" />
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#D9D9D9] text-[10px] text-black">
            3
          </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

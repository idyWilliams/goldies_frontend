import React, { useEffect, useState } from "react";

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
  const [currentStepProps, setCurrentStepProps] = useState<Steps>({
    highlighted: false,
    selected: false,
    completed: false,
    description: "",
  });

  useEffect(() => {
    const stepsState = checkoutStep?.map((step: any, index: number) => ({
      description: step,
      completed: index < currentStep - 1,
      highlighted: index === currentStep - 1,
      selected: index === currentStep - 1,
    }));

    setNewStep(stepsState || []);

    const currentStepProp = {
      highlighted: true,
      selected: true,
      completed: true,
      description: checkoutStep[currentStep - 1],
    };
    setCurrentStepProps(currentStepProp);
  }, [checkoutStep, currentStep]);

  return (
    <div className="bg-brand-200 p-4">
      <div>
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-lg font-bold text-[#D9D9D9]">
            Step {currentStep}
          </h1>
          <p className=" text-[#D9D9D9]"> {currentStepProps.description} </p>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {newStep.map((step, index) => (
            <div key={index} className="flex items-center justify-center gap-2">
              <div
                className={`${step.completed ? "bg-[#14AE56] text-white" : " bg-[#D9D9D9]"} flex h-[32px] w-[32px] items-center justify-center rounded-full ${step.selected && "border border-brand-100 bg-brand-200 text-brand-100"} text-sm text-black`}
              >
                {step.completed ? index + 1 : index + 1}
              </div>
              {index < newStep.length - 1 && (
                <hr className="w-[47px] border-[#D9D9D9]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

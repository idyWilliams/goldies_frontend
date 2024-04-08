import React, { useRef, useState } from "react";
import Stepper from "./Stepper";
import InformationAndPricing from "../InformationAndPricing";
import ProductVariants from "../ProductVariants";
import ProductImages from "../ProductImages";
import { createProductContext } from "../../../context/CreateProduct";

const productStep = ["information", "variants", "images"];

export default function CreateProductLayout() {
  const [currentStep, setCurrentStep] = useState(1);

  const stepNumber = 3;
  const checkoutStep = productStep;
  const stepDisplay = (productStep: any) => {
    switch (productStep) {
      case 1:
        return <InformationAndPricing />;
      case 2:
        return <ProductVariants />;
      case 3:
        return <ProductImages />;

      default:
        break;
    }
  };

  const handleClick = (direction: string) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= checkoutStep?.length && setCurrentStep(newStep);
  };
  return (
    <section>
      <div className="">
        <h1 className="mb-3 font-bold uppercase">Create New Products</h1>
        <hr className="border-1 mb-3 border-black" />
      </div>
      <Stepper checkoutStep={checkoutStep} currentStep={currentStep} />
      <div>
        <createProductContext.Provider
          value={{
            checkoutStep,
            currentStep,
            // displayStep,
            handleClick,
          }}
        >
          {stepDisplay(currentStep)}
        </createProductContext.Provider>
      </div>
    </section>
  );
}

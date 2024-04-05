import React, { useRef, useState } from "react";
import Stepper from "./Stepper";

const productStep = ["information", "variants", "images"];

export default function CreateProductLayout() {
  const [currentStep, setCurrentStep] = useState([1]);

  const stepNumber = 3;
  const checkoutStep = productStep;
  const stepDisplay = (productStep: any) => {
    switch (productStep) {
      case 1:
        return <div></div>;
      case 2:
        return <div></div>;
      case 3:
        return <div></div>;

      default:
        break;
    }
  };
  return (
    <section>
      <div className="">
        <h1 className="mb-3 font-bold uppercase">Create New Products</h1>
        <hr className="border-1 mb-3 border-black" />
      </div>
      <Stepper checkoutStep={checkoutStep} currentStep={currentStep} />
    </section>
  );
}

import React from "react";

export default function StepperController() {
  return (
    <div className="flex flex-col gap-4">
      <button className="rounded-md bg-gray-400 px-6 py-4 text-black">
        Back
      </button>
      <button className="rounded-md bg-black px-6 py-4 text-main">Next</button>
    </div>
  );
}

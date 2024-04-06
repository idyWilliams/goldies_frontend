import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const variant = [
  { label: "Round", value: "round", disabled: false },
  { label: "Square", value: "square" },
  { label: "Rectangular", value: "rectangular", disabled: false },
  { label: "Heart", value: "heart" },
  { label: "Star", value: "star" },
  { label: "Oval", value: "oval" },
  { label: "Petal", value: "petal" },
  { label: "Unicorn", value: "unicorn" },
  { label: "Tiered", value: "tiered" },
  { label: "Sheet", value: "sheet" },
];

export default function ProductVariants() {
  const [shapes, setShapes] = useState([]);

  return (
    <section>
      <div>
        <div className="mt-3 w-full">
          <h1 className="mb-1 text-[12px]">Product Variants</h1>
          <MultiSelect
            options={variant}
            value={shapes}
            onChange={setShapes}
            labelledBy="Select shapes"
            className="bg-gray-100"
          />
        </div>
      </div>
    </section>
  );
}

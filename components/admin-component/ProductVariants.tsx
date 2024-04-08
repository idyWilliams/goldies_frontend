import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const fillingsList = [
  {
    label: "Chocolate",
    value: "chocolate",
  },
  {
    label: "Vanilla",
    disabled: true,
    value: "vanilla",
  },
  {
    label: "Strawberry",
    value: "strawberry",
  },
  {
    label: "Lemon",
    value: "lemon",
  },
  {
    label: "Raspberry",
    value: "raspberry",
  },
  {
    label: "Caramel",
    value: "caramel",
  },
  {
    label: "Coffee",
    value: "coffee",
  },
  {
    label: "Peanut Butter",
    value: "peanut-butter",
  },
  {
    label: "Coconut",
    value: "coconut",
  },
  {
    label: "Mint",
    value: "mint",
  },
  {
    label: "Blueberry",
    value: "blueberry",
  },
  {
    label: "Cherry",
    value: "cherry",
  },
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Hazelnut",
    value: "hazelnut",
  },
  {
    label: "Almond",
    value: "almond",
  },
];
const cakeShapes = [
  {
    label: "Round",
    value: "round",
  },
  {
    label: "Rectangular",
    value: "rectangular",
  },
  {
    label: "Square",
    value: "square",
  },
  {
    label: "Heart",
    value: "heart",
  },
  {
    label: "Star",
    value: "star",
  },
  {
    label: "Oval",
    value: "oval",
  },
  {
    label: "Petal",
    value: "petal",
  },
  {
    label: "Unicorn",
    value: "unicorn",
  },
  {
    label: "Tiered",
    value: "tiered",
  },
  {
    label: "Sheet",
    value: "sheet",
  },
];
const toppings = [
  {
    label: "Fresh Fruit",
    value: "fresh_fruit",
  },
  {
    label: "Chocolate Ganache",
    value: "chocolate_ganache",
  },
  {
    label: "Whipped Cream",
    value: "whipped_cream",
  },
  {
    label: "Toasted Nuts",
    value: "toasted_nuts",
  },
  {
    label: "Caramel Sauce",
    value: "caramel_sauce",
  },
];
const cakeSizes = [
  {
    label: "Mini",
    value: "mini",
  },
  {
    label: "Small",
    value: "small",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Large",
    value: "large",
  },
  {
    label: "Extra Large",
    value: "extra_large",
  },
];

export default function ProductVariants() {
  const [shapes, setShapes] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [addOn, setAddOn] = useState([]);

  return (
    <section>
      <div>
        <div className="mt-6 w-full">
          <div className="grid h-full grid-cols-1 gap-2">
            <label htmlFor="ProductShapes" className="block">
              <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Product Shapes
              </span>
              <MultiSelect
                className="text-[10px]"
                options={cakeShapes}
                value={shapes}
                onChange={setShapes}
                labelledBy="Select shapes"
              />
            </label>
            <label htmlFor="ProductSizes" className="block">
              <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Product Sizes
              </span>
              <MultiSelect
                className="text-[10px]"
                options={cakeSizes}
                value={sizes}
                onChange={setSizes}
                labelledBy="Select sizes"
              />
            </label>
            <label htmlFor="ProductFillings" className="block">
              <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Product Fillings
              </span>
              <MultiSelect
                className="text-[10px]"
                options={fillingsList}
                value={fillings}
                onChange={setFillings}
                labelledBy="Select fillings"
              />
            </label>
            <label htmlFor="ProductToppings" className="block">
              <span className="mb-1 inline-block text-[12px] after:ml-1 after:text-2xl after:text-[#E10] after:content-['*']">
                Toppings/Add-ons
              </span>
              <MultiSelect
                className="text-[10px]"
                options={toppings}
                value={addOn}
                onChange={setAddOn}
                labelledBy="Select toppings/add-ons"
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

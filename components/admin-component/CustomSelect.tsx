import React from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface AnimatedMultiProps {
  defaultValue?: any[];
  options: any[];
  onChange: (options: MultiValue<any>) => void;
}

export default function AnimatedMulti({
  defaultValue,
  options,
  onChange,
}: AnimatedMultiProps) {
  const handleChange = (newValue: MultiValue<any>) => {
    onChange(newValue);
  };

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={defaultValue}
      isMulti
      onChange={handleChange}
      options={options}
    />
  );
}

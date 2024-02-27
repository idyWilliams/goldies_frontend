// components/CustomAutocomplete.tsx

import React from "react";
import Select, { ValueType } from "react-select";


interface OptionType {
  value: string;
  label: string;
}

interface CustomAutocompleteProps {
  options: OptionType[];
  onSelect: (value: string) => void;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  options,
  onSelect,
}) => {
  const handleChange = (selectedOption: ValueType<OptionType, true>) => {
    if (selectedOption) {
      onSelect(selectedOption.value);
    }
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder="Select an option..."
      isClearable
    />
  );
};

export default CustomAutocomplete;

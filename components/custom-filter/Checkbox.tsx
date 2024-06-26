import React, { useState, ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onCheckboxChange: (label: string, isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  onCheckboxChange,
}) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    onCheckboxChange(label, newCheckedState);
  };

  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="form-checkbox rounded-sm checked:bg-black checked:hover:bg-black focus:border-black focus:ring-black checked:focus:bg-black"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="whitespace-nowrap text-neutral-500">{label}</span>
    </label>
  );
};

export default Checkbox;

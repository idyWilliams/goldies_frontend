import React, { ChangeEvent } from "react";

interface CheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, isChecked, onCheckboxChange }) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(id, event.target.checked);
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

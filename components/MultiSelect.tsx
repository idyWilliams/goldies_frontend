import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

type OptionProps = {
  label: string;
  value: string;
}[];

const MultiSelectOption = ({ options }: any) => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      {/* <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default MultiSelectOption;

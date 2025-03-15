import * as _ from "lodash-es";

import React, { useEffect } from "react";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import Select from "react-select";

export type SelectOptionType = {
  label: string | number;
  value: string | number;
  description?: string;
} | null;

type CustomSelectProps = {
  selectedOption: SelectOptionType | null;
  // setSelectOption: (value: React.SetStateAction<any>) => void;
  setSelectOption: any;
  options: any;
  isDisabled?: boolean;
  name?: string;
  control?: Control<any, any>;
  getValues?: UseFormGetValues<any>;
  placeholder?: string;
  errors?: any;
  defaultValue?: SelectOptionType;
};

const CustomSelect = (props: CustomSelectProps) => {
  const {
    selectedOption,
    setSelectOption,
    options,
    isDisabled,
    name,
    getValues,
    control,
    placeholder = "Choose an option",
    errors,
    defaultValue,
  } = props;

  const handleChange = (option: any) => {
    setSelectOption(option);
  };

  var alteredOptions = options.map((option: any) => ({
    label: option.label ? option.label : option.name,
    value: option.value ? option.value : option.name,
    description: option.description ? option.description : "",
  }));

  var actualOption = alteredOptions.find(
    (option: SelectOptionType) =>
      option?.value === selectedOption?.value ||
      (option?.value === selectedOption?.value &&
        selectedOption?.value.toString()),
  );

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: errors && errors[_.camelCase(name)] && "#FDA29B",
      paddingTop: "5px",
      paddingBottom: "5px",
    }),

    indicatorsContainer: (provided: any) => ({
      ...provided,
      display: "hidden",
    }),

    singleValue: (provided: any) => ({
      ...provided,
      textTransform: "capitalize",
    }),

    option: (provided: any) => ({
      ...provided,
      textTransform: "capitalize",
    }),
  };

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = alteredOptions.find(
        (option: SelectOptionType) =>
          option?.value === defaultValue.value ||
          (option?.value === defaultValue.value &&
            defaultValue.value.toString()),
      );
      setSelectOption(defaultOption);
    }
  }, [defaultValue, alteredOptions, setSelectOption]);

  return (
    <div className="w-full">
      {control ? (
        <Controller
          control={control}
          name={_.camelCase(name)}
          defaultValue={
            getValues &&
            alteredOptions.find(
              (option: SelectOptionType) =>
                option?.label === getValues(_.camelCase(name)),
            )
          }
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              styles={customStyles}
              value={actualOption}
              defaultValue={
                getValues &&
                alteredOptions.find(
                  (option: SelectOptionType) =>
                    option?.label === getValues(_.camelCase(name)),
                )
              }
              options={alteredOptions}
              placeholder={placeholder}
              isClearable={false}
              onChange={(option) => onChange(option.label)}
              isDisabled={isDisabled}
              className="focus:border-0"
            />
          )}
        />
      ) : (
        <Select
          className="rounded-lg border-2 border-black"
          styles={customStyles}
          value={actualOption}
          options={alteredOptions}
          isClearable={false}
          placeholder={placeholder}
          onChange={handleChange}
          isDisabled={isDisabled}
        />
      )}
    </div>
  );
};

export default CustomSelect;

import React, { useState } from "react";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { newSubcategory } from "@/utils/formData";
import { SubcategoryInputsProps } from "@/utils/categoryTypes";
import { Controller } from "react-hook-form";
import Toggle from "react-toggle";
import { Switch } from "@/components/ui/switch";

const CreateSubcategoryInput = ({
  control,
  register,
  errors,
  getValues,
  setValue,
}: SubcategoryInputsProps) => {
  return (
    <EachElement
      of={newSubcategory}
      render={(data: any, index: number) => {
        if (data.name === "status") {
          return (
            // STATUS TOGGLE
            <>
              <label
                htmlFor={data?.name}
                className="inline-flex items-center gap-2"
              >
                <span className="text-sm font-semibold">{data?.label}: </span>
                <Controller
                  control={control}
                  name={data.name}
                  render={({ field: { value, ...field } }) => (
                    // <Toggle
                    //   {...field}
                    //   checked={value === true}
                    //   className="custom"
                    //   icons={{ checked: null, unchecked: null }}
                    // />
                    <Switch
                      {...field}
                      defaultChecked={value}
                      className="custom data-[state=checked]:bg-green-700"
                      // icons={{ checked: null, unchecked: null }}
                      onCheckedChange={() => {
                        console.log(value);
                        field.onChange(!value);
                      }}
                    />
                  )}
                />
              </label>
            </>
          );
        }
        return (
          <>
            <div key={index}>
              <label htmlFor={data.name} className="mb-2 block w-full">
                <span
                  className={cn(
                    "mb-1 inline-block text-sm font-semibold",
                    data?.required &&
                      "after:inline-block after:pl-0.5 after:text-red-600 after:content-['*']",
                  )}
                >
                  {data?.label}
                </span>
                {data?.type === "text" && (
                  <input
                    {...register(data.name)}
                    type={data.type}
                    id={data?.name}
                    name={data.name}
                    placeholder={data.place_holder}
                    className="form-input w-full rounded-md border-0 bg-neutral-50 py-3 text-sm placeholder:text-sm placeholder:text-neutral-400 focus:ring-neutral-900 md:text-base"
                    onBlur={() => {
                      const value = getValues(data.name);
                      setValue(data.name, value.trim());
                    }}
                  />
                )}
                {data?.type === "richtext" && (
                  <textarea
                    {...register(data.name)}
                    id={data?.name}
                    name={data?.name}
                    placeholder={data.place_holder}
                    className="form-input w-full rounded-md border-0 bg-neutral-50 py-3 text-sm placeholder:text-sm placeholder:text-neutral-400 focus:ring-neutral-900 md:text-base"
                    onBlur={() => {
                      const value = getValues(data.name);
                      setValue(data.name, value.trim());
                    }}
                  />
                )}
              </label>

              {/* {errors?.[data?.name] && (
                <p
                  className={cn(
                    "hidden text-sm text-red-600",
                    errors?.[data?.name] && "block",
                  )}
                >
                  {data?.error_message}
                </p>
              )} */}

              <p
                className={cn(
                  "hidden text-sm text-red-600",
                  errors?.[data?.name] && "block",
                )}
              >
                {errors[data.name]?.message as string}
              </p>
            </div>
          </>
        );
      }}
    />
  );
};

export default CreateSubcategoryInput;

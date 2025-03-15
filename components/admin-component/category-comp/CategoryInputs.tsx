import React from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/helper/cn";
import { CategoryInputsProps } from "@/utils/categoryTypes";
import Toggle from "react-toggle";
import EachElement from "@/helper/EachElement";
import { newCategory } from "@/utils/formData";
import { Switch } from "@/components/ui/switch";

export default function CategoryInputs({
  control,
  register,
  errors,
  getValues,
  setValue,
}: CategoryInputsProps) {
  return (
    <EachElement
      of={newCategory}
      render={(data: any, index: number) => {
        if (data.name === "status") {
          return (
            <>
              <label
                htmlFor={data?.name}
                className="mt-2 inline-flex items-center gap-2 md:mt-0"
              >
                <span className="text-sm font-semibold">{data?.label}: </span>
                <Controller
                  control={control}
                  name={data.name}
                  render={({ field: { value, ...field } }) => (
                    <>
                      {/* <Toggle
                        {...field}
                        checked={value === true}
                        className="custom"
                        icons={{ checked: null, unchecked: null }}
                      /> */}

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
                    </>
                  )}
                />
              </label>
            </>
          );
        }
        return (
          <>
            <div
              key={index}
              className={cn(
                "mt-3 md:mt-0",
                data?.type === "richtext" && "xl:col-span-2",
              )}
            >
              <label htmlFor={data.name} className="block w-full">
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
                    readOnly={data.name === "categorySlug"}
                    // disabled={data.name === "categorySlug"}
                    type={data.type}
                    id={data?.name}
                    name={data.name}
                    placeholder={data.place_holder}
                    className="form-input w-full rounded-md border-0 py-3 placeholder:text-sm placeholder:text-neutral-300 focus:ring-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400"
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
                    name={data.name}
                    placeholder={data.place_holder}
                    className="form-textarea w-full resize-none rounded-md border-0 py-3 placeholder:text-sm placeholder:text-neutral-300 focus:ring-neutral-900"
                    onBlur={() => {
                      const value = getValues(data.name);
                      setValue(data.name, value.trim());
                    }}
                  />
                )}
              </label>
              <p
                className={cn(
                  "hidden text-sm text-red-600",
                  ` ${errors[data.name] && "block"}`,
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
}

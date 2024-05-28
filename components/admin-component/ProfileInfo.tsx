"use client";
import { cn } from "@/helper/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Profile } from "iconsax-react";
import { startsWith } from "lodash-es";
import React, { ReactNode, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Fullname is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  // phone: yup
  //   .string()
  //   .required("Valid Phone Number is required")
  //   .min(6, "Valid Phone Number must be at least 6 characters")
  //   .max(15, "Valid Phone Number must not exceed 12 characters"),
});
export default function ProfileInfo() {
  const [phone, setPhone] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const handleSave = (data: any) => {
    console.log(data, errors);
    reset();
  };
  return (
    <section className="w-full px-2 lg:w-[48%]">
      <>
        <div className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-main">
          <span className="items-center justify-center">JD</span>
        </div>
        <p className="my-3 font-semibold">John Doe</p>
        <form className="space-y-5" onSubmit={handleSubmit(handleSave)}>
          <label htmlFor="fullName" className="block">
            <span className="mb-1 inline-block">Full name</span>
            <input
              {...register("fullName")}
              type="text"
              autoComplete="off"
              id="fullName"
              placeholder="Your full name"
              className={cn(
                "form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black",
                errors.fullName && "border-red-600",
              )}
            />
            {errors.fullName && (
              <p className="text-red-600">{errors.fullName.message}</p>
            )}
          </label>
          <label htmlFor="email" className="block">
            <span className="mb-1 inline-block">Email address</span>
            <input
              {...register("email")}
              type="text"
              autoComplete="off"
              id="email"
              placeholder="Your email"
              className="form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </label>
          <label htmlFor="phoneNumber" className="block">
            <span className="mb-1 inline-block">Phone number</span>
            <PhoneInput
              country={"ng"}
              value={phone}
              // {...register("phone")}
              onChange={(phoneNumber) => setPhone(phoneNumber)}
              inputProps={{
                name: "phone",

                id: "phone",
                className:
                  "pl-12 w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black",
              }}
              defaultErrorMessage="Phone number is required"
            />

            {/* {errors.phone && (
              <p className="text-red-600">{errors.phone.message}</p>
            )} */}
          </label>
          <div className="mb-6 mt-10 flex gap-8 lg:mb-0">
            <button className="items-center justify-center rounded-sm border border-red-500 bg-white px-3 py-2 text-sm text-red-500 lg:text-base">
              Cancel Changes
            </button>
            <button className="items-center justify-center rounded-sm bg-black px-5 py-2 text-sm text-main lg:text-base">
              Save Changes
            </button>
          </div>
        </form>
      </>
    </section>
  );
}

"use client";
import { cn } from "@/lib/utils";
import { ClassNames } from "@emotion/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import closeX from "../public/assets/closeX.png";
import { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
// import { useMediaQuery } from "react-responsive";
import * as yup from "yup";

const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  phone: yup
    .string()
    .required("Valid Phone Number is required")
    .min(6, "Valid Phone Number must be at least 6 characters")
    .max(15, "Valid Phone Number must not exceed 12 characters"),
  address: yup.string().required("Shipping address is required"),
  state: yup.string().required("Shipping address is required"),
  country: yup.string().required("Shipping address is required"),
});

const EditAddressModal = ({ onClose }: any) => {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    setValue("firstname", "Timilehin");
    setValue("lastname", "Abegunde");
    setValue("email", "timilehinsunday144@gmail.com");
    setValue(
      "address",
      "3, Alade Yusuf Street, Epetedo B/stop, Abaranje Road, Ikotun, Lagos.",
    );
    setValue("state", "Lagos");
    setValue("country", "Nigeria");
    setPhone("+2348089134442");
  }, [setValue]);

  //  const useIsMobile = () => {
  //    const isMobile = useMediaQuery({ maxWidth: 768 });
  //    return isMobile;
  //  };
  

  const onSubmit = (data: any) => {
    console.log("data: ", data);
    reset();
    onClose();
  };

  return (
    <>
      <div className="border rounded-lg md:p-10 ">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-200 ">
          <h2 className=" text-xl font-semibold">Edit address</h2>
          <button onClick={onClose} className="text-xl">
            <Image src={closeX} className="" alt="close button" />
          </button>
        </div>

        <div className="rounded-md bg-white p-2 md:py-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              {/* first name */}
              <label htmlFor="firstname" className="block w-full">
                <span className="mb-1 inline-block text-sm font-medium">
                  First Name
                </span>
                <input
                  type="text"
                  id="firstname"
                  {...register("firstname")}
                  className={cn(
                    "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                    errors.firstname && "border-red",
                  )}
                  // placeholder="Timilehin"
                />
                {errors?.firstname && (
                  <p className="text-red-600">{errors?.firstname?.message}</p>
                )}
              </label>
              {/* last name */}
              <label htmlFor="lastname" className="block w-full">
                <span className="mb-1 inline-block text-sm font-medium">
                  Last Name
                </span>
                <input
                  type="text"
                  {...register("lastname")}
                  id="lastname"
                  className={cn(
                    "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                    errors.lastname && "border-red-600 focus:border-red-600",
                  )}
                  // placeholder="Abegunde"
                />
                {errors?.lastname && (
                  <p className="text-red-600">{errors?.lastname?.message}</p>
                )}
              </label>
              {/* email */}
              <label htmlFor="email" className="block w-full">
                <span className="mb-1 inline-block text-sm font-medium">
                  Email Address
                </span>
                <input
                  type=""
                  {...register("email")}
                  id="email"
                  className={cn(
                    "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                    errors.email && "border-red-600 focus:border-red-600",
                  )}
                  // placeholder="timilehinsunday144@gmail.com"
                />
              </label>
              {/* phone number */}
              <label htmlFor="phone" className="block w-full">
                <span className="mb-1 inline-block text-sm font-medium">
                  Phone Number
                </span>
                <Controller
                  control={control}
                  name="phone"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"ng"}
                      value={field.value || phone}
                      onChange={(phoneNumber) => {
                        field.onChange(phoneNumber);
                        setPhone(phoneNumber);
                      }}
                      inputStyle={{
                        fontFamily: `"Space Grotesk", sans-serif`,
                      }}
                      inputProps={{
                        name: "phone",
                        id: "phone",
                        className:
                          "pl-12 w-full rounded-sm z-50 border-none text-sm text-neutral-700 bg-gray-100 focus:border focus:border-black focus:ring-black",
                      }}
                      defaultErrorMessage="Phone number is required"
                      dropdownClass={"relative z-50"}
                    />
                  )}
                />
              </label>
              {/* country */}
              <label htmlFor="country">
                <span className="mb-1 inline-block text-sm font-medium">
                  Country
                </span>
                <CountryDropdown
                  value={country}
                  onChange={setCountry}
                  classes={cn(
                    "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                    errors.country && "border-red-600 focus:border-red-600",
                  )}
                />
              </label>
              {/* state/regoin */}
              <label htmlFor="state" className="block w-full">
                <span className="mb-1 inline-block text-sm font-medium">
                  State
                </span>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <RegionDropdown
                      disableWhenEmpty={true}
                      country={country}
                      value={value || state}
                      onChange={(region) => {
                        onChange(region);
                        setState(region);
                      }}
                      classes={cn(
                        "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                        errors.state && "border-red-600 focus:border-red-600",
                      )}
                    />
                  )}
                />
                {errors?.state && (
                  <p className="text-red-600">{errors?.state?.message}</p>
                )}
              </label>
              {/* adddress */}
              <label htmlFor="address" className="block w-full md:col-span-2">
                <span className="mb-1 inline-block text-sm font-medium">
                  Shipping address
                </span>
                <textarea
                  {...register("address")}
                  id="address"
                  name="address"
                  className={cn(
                    "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                    errors.address && "border-red-600 focus:border-red-600",
                  )}
                />
                {errors?.address && (
                  <p className="text-red-600">{errors?.email?.message}</p>
                )}
              </label>
            </div>

            {/* buttons */}
            <div className="mt-7 flex w-full justify-between gap-3 font-medium ">
              <button
                className="w-44 rounded border border-neutral-900 px-5  py-2.5 text-neutral-900 "
                onClick={onClose}
              >
                Discard Changes
              </button>
              <button
                className="w-44 rounded border border-neutral-900 bg-neutral-900 px-5 py-2.5 text-goldie-300 "
                type="submit"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAddressModal;

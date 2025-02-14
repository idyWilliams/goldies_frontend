import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import { Button } from "../ui/button";

interface EditBillingFormProps {
  defaultValues: {
    _id?: string; // Add _id to the type
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
    address: string;
    country: string;
    state: string;
  };
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  phone: yup
    .string()
    .required("Valid Phone Number is required")
    .min(6, "Valid Phone Number must be at least 6 characters")
    .max(15, "Valid Phone Number must not exceed 12 characters"),
  address: yup.string().required("Shipping address is required"),
  state: yup.string().required("Shipping address is required"),
  city: yup.string().required("Shipping address is required"),
  country: yup.string().required("Shipping address is required"),
});

const EditBillingForm = ({
  defaultValues,
  onSubmit,
  onClose,
}: EditBillingFormProps) => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
    setPhone(defaultValues.phone);
    setCountry(defaultValues.country);
    setState(defaultValues.state);

    // Manually set form values for country and state
    setValue("country", defaultValues.country);
    setValue("state", defaultValues.state);
  }, [defaultValues, reset, setValue]);

  return (
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
            {...register("firstName")}
            className={cn(
              "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
              errors.firstName && "border-red",
            )}
          />
          {errors?.firstName && (
            <p className="text-xs text-red-600">
              {String(errors?.firstName?.message)}
            </p>
          )}
        </label>
        {/* last name */}
        <label htmlFor="lastname" className="block w-full">
          <span className="mb-1 inline-block text-sm font-medium">
            Last Name
          </span>
          <input
            type="text"
            {...register("lastName")}
            id="lastname"
            className={cn(
              "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
              errors.lastName && "border-red-600 focus:border-red-600",
            )}
          />
          {errors?.lastName && (
            <p className="text-xs text-red-600">
              {String(errors?.lastName?.message)}
            </p>
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
          <span className="mb-1 inline-block text-sm font-medium">Country</span>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountryDropdown
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  setCountry(val);
                  // Reset state when country changes
                  setValue("state", "");
                  setState("");
                }}
                classes={cn(
                  "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                  errors.country && "border-red-600 focus:border-red-600",
                )}
              />
            )}
          />
          {errors?.country && (
            <p className="text-xs text-red-600">
              {String(errors?.country?.message)}
            </p>
          )}
        </label>
        {/* state/regoin */}
        <label htmlFor="state" className="block w-full">
          <span className="mb-1 inline-block text-sm font-medium">State</span>
          <Controller
            name="state"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RegionDropdown
                disableWhenEmpty={true}
                country={country}
                value={field.value || state}
                onChange={(region) => {
                  field.onChange(region);
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
            <p className="text-xs text-red-600">
              {String(errors?.state?.message)}
            </p>
          )}
        </label>
        {/* city */}
        <label htmlFor="city" className="block w-full">
          <span className="mb-1 inline-block text-sm font-medium">
            City/Town
          </span>
          <input
            type="text"
            {...register("city")}
            id="city"
            className={cn(
              "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
              errors.city && "border-red-600 focus:border-red-600",
            )}
          />
          {errors?.city && (
            <p className="text-xs text-red-600">
              {String(errors?.city?.message)}
            </p>
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
            <p className="text-xs text-red-600">
              {String(errors?.address?.message)}
            </p>
          )}
        </label>
      </div>

      {/* buttons */}
      <div className="mt-7 flex w-full justify-between gap-3 font-medium ">
        <Button type="button" variant={"secondary"} onClick={onClose}>
          Discard Changes
        </Button>
        <Button type="submit" className=" bg-neutral-900  text-goldie-300 ">
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default EditBillingForm;

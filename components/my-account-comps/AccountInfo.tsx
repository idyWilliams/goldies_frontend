import { cn } from "@/helper/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { getUser } from "@/services/hooks/users";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  country: yup.string().required("Shipping address is required"),
});

const AccountInfo = () => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const {
    reset,
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const getAUser = useMutation({
    mutationFn: getUser,
  });

  useEffect(() => {
    const handleUser = async () => {
      try {
        const response = await getAUser.mutateAsync();

        console.log("Full API response:", response);

        if (response && response.user) {
          const userData = response.user;
          localStorage.setItem("user", JSON.stringify(userData));
          // @ts-ignore
          localStorage.setItem("accessToken", userData.token);

          console.log("User data from response:", userData);

          setValue("firstName", userData.firstName);
          setValue("lastName", userData.lastName);
          setValue("email", userData.email);
          setValue(
            "address",
            "3, Alade Yusuf Street, Epetedo B/stop, Abaranje Road, Ikotun, Lagos.",
          );
          setValue("state", "Lagos");
          setValue("country", "Nigeria");
          setPhone("+2348089134442");
        } else {
          console.log("No response data");
        }
      } catch (error: any) {
        console.error("Error fetching user data: ", error);
        toast.error(error.message);
      }
    };
    handleUser();
  }, [getAUser, setValue]);

  const handleSave = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <div className="">
      <div className="mb-4 border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">Account Information</h2>
        <p>This is your default shipping information</p>
      </div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          <label htmlFor="firstName" className="block w-full">
            <span className="mb-1 inline-block text-sm font-medium">
              First name
            </span>
            <input
              {...register("firstName")}
              type="text"
              id="firstName"
              defaultValue={firstName}
              className={cn(
                "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                errors.firstName && "border-red-600 focus:border-red-600",
              )}
            />
            {errors?.firstName && (
              <p className="text-red-600">{errors?.firstName?.message}</p>
            )}
          </label>
          <label htmlFor="lastName" className="block w-full">
            <span className="mb-1 inline-block text-sm font-medium">
              Last name
            </span>
            <input
              {...register("lastName")}
              type="text"
              id="lastName"
              defaultValue={lastName}
              className={cn(
                "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                errors.lastName && "border-red-600 focus:border-red-600",
              )}
            />
            {errors?.lastName && (
              <p className="text-red-600">{errors?.lastName?.message}</p>
            )}
          </label>
          <label htmlFor="email" className="block w-full">
            <span className="mb-1 inline-block text-sm font-medium">
              Email Address
            </span>
            <input
              {...register("email")}
              type="email"
              id="email"
              defaultValue={email}
              className={cn(
                "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                errors.email && "border-red-600 focus:border-red-600",
              )}
            />
            {errors?.email && (
              <p className="text-red-600">{errors?.email?.message}</p>
            )}
          </label>
          <label htmlFor="phone" className="block w-full">
            <span className="mb-1 inline-block text-sm font-medium">
              Phone number
            </span>
            <Controller
              name="phone"
              control={control}
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
                  inputStyle={{ fontFamily: `"Space Grotesk", sans-serif` }}
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
          <label htmlFor="country" className="block w-full">
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
            {errors?.country && (
              <p className="text-red-600">{errors?.country?.message}</p>
            )}
          </label>
          <label htmlFor="state" className="block w-full">
            <span className="mb-1 inline-block text-sm font-medium">State</span>
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
          <label htmlFor="address" className="block w-full md:col-span-2">
            <span className="mb-1 inline-block text-sm font-medium">
              Shipping address
            </span>
            <textarea
              {...register("address")}
              id="address"
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

        <div className="mt-7 flex items-center justify-start gap-3">
          <button className="rounded border border-neutral-900 bg-neutral-900 px-5 py-2.5 text-goldie-300">
            Save changes
          </button>
          <button className="rounded border border-red-600 px-5 py-2.5 font-medium text-red-600">
            Close account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfo;

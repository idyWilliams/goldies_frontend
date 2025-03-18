import { cn } from "@/helper/cn";
import { IUser } from "@/interfaces/user.interface";
import { updateUser } from "@/services/hooks/users";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";
import * as yup from "yup";
import ConfirmDeletion from "./ConfirmDeletion";
import { Skeleton } from "../ui/skeleton";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  phone: yup
    .string()
    .required("Valid Phone Number is required")
    .min(6, "Valid Phone Number must be at least 6 characters")
    .max(15, "Valid Phone Number must not exceed 12 characters"),
  // address: yup.string().required("Shipping address is required"),
  // state: yup.string().required("State is required"),
  // country: yup.string().required("Country is required"),
});

const AccountInfo = ({
  fetchedUser,
  isLoading,
}: {
  fetchedUser: IUser;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState("");
  // const [country, setCountry] = useState("");
  // const [state, setState] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");

  // const { data, isError, isSuccess } = useQuery({
  //   queryKey: [user],
  //   queryFn: getUser,
  // });

  // useEffect(() => {
  //   if (isSuccess) console.log(data);
  // }, [isSuccess, data]);

  const {
    reset,
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: fetchedUser?.firstName || "",
      lastName: fetchedUser?.lastName || "",
      email: fetchedUser?.email || "",
      phone: fetchedUser?.phoneNumber || "",
    },

    // defaultValues: user
    //   ? {
    //       firstName: user?.firstName,
    //       lastName: user?.lastName,
    //       email: user?.email,
    //       phone: user?.phone,
    //     }
    //   : {
    //       firstName: "",
    //       lastName: "",
    //       email: "",
    //       phone: "",
    //     },
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") as string);
    if (storedUser) {
      setUser(storedUser.user);
    } else {
      toast.error("Session expired! Please log in again");
      router.push("/sign-in");
    }
  }, [router]);
  // console.log("data is", user);

  useEffect(() => {
    if (fetchedUser) {
      reset({
        firstName: fetchedUser.firstName || "",
        lastName: fetchedUser.lastName || "",
        email: fetchedUser.email || "",
        phone: fetchedUser.phoneNumber || "",
      });
    }

    // reset({
    //   firstName: user?.firstName || "",
    //   lastName: user?.lastName || "",
    //   email: user?.email || "",
    // });
  }, [fetchedUser, reset]);

  const updateProfile = useMutation({
    mutationKey: ["update user profile"],
    mutationFn: updateUser,
    onSuccess: (data) => {
      const storedUser = JSON.parse(localStorage.getItem("user") as string);
      console.log(storedUser);
      const user = {
        ...storedUser.user,
        firstName: data.data.firstName,
        lastName: data.data.lasttName,
      };
      const newUser = {
        ...storedUser,
        user: {
          ...storedUser.user,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        },
      };
      // console.log(newUser);

      localStorage.setItem("user", JSON.stringify(newUser));

      toast.success("Account information updated successfully");
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("There was an error updating account information");
    },
  });

  // console.log("values ", getValues(), "user: ", user);

  const handleSave = (data: any) => {
    console.log(data);
    updateProfile.mutate(data);
    // toast.success("Account information updated successfully");
    // console.log("Form errors:", errors);
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-4 border-b border-neutral-200 pb-4">
          <Skeleton className="mb-2 h-6 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mt-4">
          <Skeleton className="ml-auto h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-4 border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">Account Information</h2>
        <p>This is your default account information</p>
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
              // defaultValue={firstName}
              className={cn(
                "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                errors.firstName && "border-red-600 focus:border-red-600",
              )}
            />
            {errors?.firstName &&
              typeof errors.firstName.message === "string" && (
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
              // defaultValue={lastName}
              className={cn(
                "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                errors.lastName && "border-red-600 focus:border-red-600",
              )}
            />
            {errors?.lastName?.message &&
              typeof errors.lastName.message === "string" && (
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
              disabled
              // defaultValue={email}
              className={cn(
                "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-75",
                errors.email && "border-red-600 focus:border-red-600",
              )}
            />
            {errors?.email && typeof errors?.email?.message === "string" && (
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
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInput
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
            {errors?.phone && typeof errors?.phone?.message === "string" && (
              <p className="text-red-600">{errors?.phone?.message}</p>
            )}
          </label>
          {/* <label htmlFor="country" className="block w-full">
            <span className="mb-1 inline-block text-sm font-medium">
              Country
            </span>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <CountryDropdown
                  value={field.value || country}
                  onChange={(val) => {
                    field.onChange(val);
                    setCountry(val);
                  }}
                  classes={cn(
                    "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                    errors.country && "border-red-600 focus:border-red-600",
                  )}
                />
              )}
            />
            {errors?.country && (
              <p className="text-red-600">{errors?.country?.message}</p>
            )}
          </label> */}
          {/* <label htmlFor="state" className="block w-full">
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
          </label> */}

          {/* <label htmlFor="address" className="block w-full md:col-span-2">
            <span className="mb-1 inline-block text-sm font-medium">
              Shipping address
            </span>
            <textarea
              {...register("address")}
              id="address"
              placeholder="Enter your address"
              className={cn(
                "form-input block w-full rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                errors.address && "border-red-600 focus:border-red-600",
              )}
            />
            {errors?.address && (
              <p className="text-red-600">{errors?.address.message}</p>
            )}
          </label> */}
        </div>

        <div className="mt-7 flex items-center justify-start gap-3">
          <button
            type="submit"
            className="rounded border border-neutral-900 bg-brand-200 px-5 py-2.5 text-brand-100"
          >
            Save changes
          </button>
        </div>
      </form>

      <div className="mt-8 flex items-center justify-between rounded-lg border border-red-500 p-4">
        <div>
          <p className="text-red-500">Danger zone</p>
        </div>

        <ConfirmDeletion />
      </div>
    </div>
  );
};

export default AccountInfo;

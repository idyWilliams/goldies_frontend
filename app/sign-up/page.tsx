"use client";
import Layout from "@/components/Layout";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiUserSharedLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye, AiOutlineUserAdd } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/helper/cn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, loginUser } from "@/services/hooks/user-auth";
import AuthContext from "@/context/AuthProvider";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Firstname is required"),
  lastName: yup.string().required("Lastname is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

const Page = () => {
  const router = useRouter();
  // @ts-ignore
  const { setAuth, setIsLogin } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [noSubmit, setNoSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const newUser = useMutation({
    mutationFn: createUser,
  });
  const userLogin = useMutation({
    mutationFn: loginUser,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const autoLogin = (data: any) => {
    userLogin
      .mutateAsync({ email: data.email, password: data.password })
      .then((res: any) => {
        console.log(res);
        setIsLogin(true);
        localStorage.setItem("isLogin", JSON.stringify(true));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.setItem(
          "user",
          JSON.stringify({ token: res?.token, user: res?.user }),
        );
        localStorage.setItem("accessToken", res?.token);
        router.push("/");
        reset();
      })
      .catch((err: any) => {
        console.log(err);
        console.log(err.message);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (isChecked) {
      setLoading(false);
      setNoSubmit(false);
      console.log(data);

      newUser
        .mutateAsync(data)
        .then((res: any) => {
          console.log(res);
          setAuth(res);
          autoLogin(data);
        })
        .catch((err: any) => {
          console.log(err);
          toast.success(err.message);
        });

      reset();
    } else {
      setNoSubmit(true);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mt-[64px]" />
      <section className="py-10">
        <div className="wrapper">
          <div className="flex flex-col items-center sm:mx-auto sm:w-[500px] sm:border sm:bg-white sm:p-6 sm:shadow-lg">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                <AiOutlineUserAdd size={30} />
              </span>
            </span>
            <div className="mb-4 mt-6 text-center">
              <h1 className="mb-1 text-2xl font-bold capitalize">Sign up</h1>
              <p className="text-balance text-neutral-600">
                Create your account by filling the form below
              </p>
            </div>
            <div className="w-full">
              <form
                id="signup"
                className="grid gap-5 md:grid-cols-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="firstName" className="">
                  <span className="mb-1 inline-block font-medium capitalize">
                    First name
                  </span>
                  <input
                    {...register("firstName")}
                    type="text"
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.firstName
                        ? "border border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
                    id="firstName"
                    name="firstName"
                    placeholder="Your firstname"
                  />
                  {errors?.firstName && (
                    <p className={cn("mt-1 text-sm text-red-600")}>
                      {errors.firstName?.message}
                    </p>
                  )}
                </label>
                <label htmlFor="lastName" className="">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Last name
                  </span>
                  <input
                    {...register("lastName")}
                    type="text"
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.lastName
                        ? "border border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
                    id="lastName"
                    name="lastName"
                    placeholder="Your lastname"
                  />
                  {errors?.lastName && (
                    <p className={cn("mt-1 text-sm text-red-600")}>
                      {errors.lastName?.message}
                    </p>
                  )}
                </label>
                <label htmlFor="email" className="md:col-span-2">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Email Address
                  </span>
                  <input
                    {...register("email")}
                    type="email"
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.email
                        ? "border border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
                    id="email"
                    name="email"
                    placeholder="Your email"
                  />
                  {errors?.email && (
                    <p className={cn("mt-1 text-sm text-red-600")}>
                      {errors.email?.message}
                    </p>
                  )}
                </label>
                <label htmlFor="phoneNumber" className="md:col-span-2">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Phone Number
                  </span>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <PhoneInput
                        country={"ng"}
                        value={value}
                        onChange={onChange}
                        countryCodeEditable={false}
                        inputProps={{
                          name: "phone",
                          id: "phone",
                          className: `pl-12 w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black`,
                        }}
                        defaultErrorMessage="Phone number is required"
                      />
                    )}
                  />
                  {errors?.phoneNumber && (
                    <p className={cn("mt-1 text-sm text-red-600")}>
                      {errors.phoneNumber?.message}
                    </p>
                  )}
                </label>
                <label htmlFor="password" className="relative md:col-span-2">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Password
                  </span>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={visible ? "text" : "password"}
                      className={cn(
                        "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                        errors?.password
                          ? "border border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                      )}
                      id="password"
                      name="password"
                      placeholder="Your password"
                    />
                    <span
                      onClick={handleToggle}
                      className="absolute bottom-[14px] right-3 cursor-pointer text-neutral-800"
                    >
                      {visible ? (
                        <BsEyeSlash size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </span>
                  </div>

                  {errors?.password && (
                    <p className={cn("mt-1 text-sm text-red-600")}>
                      {errors.password?.message}
                    </p>
                  )}
                </label>
                <label
                  htmlFor="agree"
                  className="flex items-center gap-3 md:col-span-2"
                >
                  <input
                    type="checkbox"
                    name="agree"
                    id="agree"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className={cn(
                      "form-checkbox h-4 w-4 checked:bg-neutral-800 checked:hover:bg-neutral-800 focus:ring-neutral-800 checked:focus:ring-neutral-800",
                      noSubmit && "border-red-600 animate-in",
                    )}
                  />
                  <span className="text-sm">
                    I agree with the{" "}
                    <span className="cursor-pointer text-goldie-300">
                      terms of service
                    </span>{" "}
                    and{" "}
                    <span className="cursor-pointer text-goldie-300">
                      privacy policy
                    </span>
                  </span>
                </label>
                <Button
                  disabled={newUser.isPending}
                  className="col-span-2 mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300"
                >
                  {newUser.isPending ? (
                    <div className="loader bg-[#fff]"></div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <p className="col-span-2 text-center">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-goldie-300">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;

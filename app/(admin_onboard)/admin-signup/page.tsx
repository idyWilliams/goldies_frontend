"use client";
import Layout from "@/app/(landing)/layout";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye, AiOutlineUserAdd } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/helper/cn";
import { useMutation } from "@tanstack/react-query";
import { createAdmin } from "@/services/hooks/admin-auth";
import { toast } from "sonner";
import AuthContext from "@/context/AuthProvider";
import AdminSignUpVerification from "@/components/admin-component/AdminSignUpVerification";
import { CgSpinner } from "react-icons/cg";
import { useAdminStore } from "@/zustand/adminStore/adminStore";
import Image from "next/image";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  userName: yup.string().required("userName is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const AdminSignUp = () => {
  // @ts-ignore
  const { setAuth, setIsLogin } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [noSubmit, setNoSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [refCode, setRefCode] = useState<string | null>("");
  const { updateAdmin } = useAdminStore();

  const newAdmin = useMutation({
    mutationFn: createAdmin,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const handleToggle2 = () => {
    setVisible2((visible: boolean) => !visible);
  };

  const onSubmit = async (data: any) => {
    setUserName(data.userName);
    setEmail(data.email);
    setLoading(true);
    setCanSubmit(true);
    console.log("data is", data);

    try {
      const res = await newAdmin.mutateAsync({
        userName: data.userName,
        email: data.email,
        password: data.password,
        refCode: refCode as string,
      });
      console.log(res);

      // @ts-ignore
      updateAdmin({ userName: data.userName, email: data.email });
      console.log("data is", data);
    } catch (err: any) {
      console.log(err, "Admin sign-up err");
      // console.log(err.message);
      // console.log(err.response.data.message);
      toast.error(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("refCode");

    let email: string | null = params.get("email");
    setRefCode(refCode);
    if (email) {
      email = email.replace(/ /g, "+");
      setEmail(email);
      setValue("email", email);
    }
  }, [setValue]);

  return (
    <>
      {newAdmin.isSuccess ? (
        <AdminSignUpVerification email={email} />
      ) : (
        <>
          <div className="flex w-full max-w-md flex-col items-center border bg-white px-6 py-12 shadow-lg sm:mx-auto sm:w-[440px]">
            <div className="mb-8 text-center">
              <h1 className="mb-1 text-xl font-bold capitalize">
                Create your admin account
              </h1>
            </div>
            <div className="mx-8 w-full">
              <form
                id="signup"
                className="flex flex-col gap-5 md:grid-cols-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="userName" className="md:col-span-2">
                  <span className="text-md mb-1 inline-block capitalize">
                    User Name
                  </span>
                  <input
                    {...register("userName")}
                    type="text"
                    id="userName"
                    placeholder="Your username"
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.userName
                        ? "border border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
                  />
                  {errors?.userName && (
                    <p className="text-red-600">{errors?.userName?.message}</p>
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
                    disabled
                    id="email"
                    name="email"
                    placeholder="Your email"
                    // defaultValue={email}
                    value={email}
                  />
                  {errors?.email && (
                    <p className={cn("mt-1 text-sm text-red-600")}>
                      {errors.email?.message}
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
                  htmlFor="confirmPassword"
                  className="relative md:col-span-2"
                >
                  <span className="mb-1 inline-block font-medium capitalize">
                    Confirm Password
                  </span>
                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
                      type={visible2 ? "text" : "password"}
                      className={cn(
                        "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                        errors?.confirmPassword
                          ? "border border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                      )}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <span
                      onClick={handleToggle2}
                      className="absolute bottom-[14px] right-3 cursor-pointer text-neutral-800"
                    >
                      {visible2 ? (
                        <BsEyeSlash size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </span>
                  </div>
                  {errors?.confirmPassword && (
                    <p className={cn("mt-1 text-sm text-red-600")}>
                      {errors.confirmPassword?.message}
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
                    <span className="cursor-pointer text-brand-200">
                      terms of service
                    </span>{" "}
                    and{" "}
                    <span className="cursor-pointer text-brand-200">
                      privacy policy
                    </span>
                  </span>
                </label>
                <Button
                  disabled={newAdmin.isPending}
                  className="col-span-2 mt-3 h-auto w-full rounded-none bg-brand-200 py-3 text-base text-brand-100 hover:border hover:border-brand-200 hover:bg-transparent hover:text-brand-200"
                >
                  {newAdmin.isPending ? (
                    <div className="flex items-center justify-center gap-3">
                      <CgSpinner className="animate-spin" size={20} />
                      Loading...
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <p className="col-span-2 text-center">
                  Already have an account?{" "}
                  <Link href="/admin-signin" className="text-brand-200">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminSignUp;

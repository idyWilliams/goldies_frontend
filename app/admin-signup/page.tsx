"use client";
import Layout from "@/components/Layout";
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
import { toast } from "react-toastify";
import AuthContext from "@/context/AuthProvider";
// import { useRouter, useSearchParams } from "next/navigation";
import AdminSignUpVerification from "@/components/admin-component/AdminSignUpVerification";
import { CgSpinner } from "react-icons/cg";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Page = () => {
  // @ts-ignore
  const { setAuth, setIsLogin } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [noSubmit, setNoSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [email, setEmail] = useState("");

  const newAdmin = useMutation({
    mutationFn: createAdmin,
  });

  // const router = useRouter();
  const params = new URLSearchParams(window.location.search);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const refCode = params.get("refCode");

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const onSubmit = async (data: any) => {
    setEmail(data.email);
    setLoading(true);
    setCanSubmit(true);
    try {
      const res = await newAdmin.mutateAsync({
        email: data.email,
        password: data.password,
        refCode: refCode as string,
      });
      console.log(res);
      localStorage.setItem("adminEmail", data.email);
      setIsLogin(true);
      localStorage.setItem("isLogin", JSON.stringify(true));
      localStorage.setItem(
        "admin",
        JSON.stringify({ token: res?.token, admin: res?.admin }),
      );
      localStorage.setItem("accessToken", res?.token);
      // reset();
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let email: string | null = params.get("email");
    if (email) {
      email = email.replace(/ /g, "+");
      setEmail(email);
      setValue("email", email);
    }
  }, [setValue, params]);

  return (
    <Layout>
      <div className="mt-[64px]" />
      <section className="py-10">
        <div className="wrapper">
          {newAdmin.isSuccess ? (
            <AdminSignUpVerification email={email} />
          ) : (
            <div className="flex flex-col items-center sm:mx-auto sm:w-[500px] sm:border sm:bg-white sm:p-6 sm:shadow-lg">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                  <AiOutlineUserAdd size={30} />
                </span>
              </span>
              <div className="mb-4 mt-6 text-center">
                <h1 className="mb-1 text-2xl font-bold capitalize">Sign up</h1>
                <p className="text-balance text-neutral-600">
                  Create your account to become an Admin by filling the form
                  below.
                </p>
              </div>
              <div className="mx-8 w-full">
                <form
                  id="signup"
                  className="flex flex-col gap-5 md:grid-cols-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                      placeholder="abegundetimilehin@gmail.com"
                      defaultValue={email}
                      value={email}
                    />
                    {errors?.email && (
                      <p className={cn("mt-1 text-sm text-red-600")}>
                        {errors.email?.message}
                      </p>
                    )}
                  </label>
                  {/* <label htmlFor="code" className="md:col-span-2">
                              <span className="mb-1 inline-block font-medium capitalize">
                                Refferal Code
                              </span>
                              <input
                                {...register("code")}
                                type="code"
                                className={cn(
                                "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                                errors?.code
                                    ? "border border-red-600 focus:border-red-600 focus:ring-0"
                                    : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                                )}
                                id="code"
                                name="code"
                                placeholder="Your Code"
                              />
                              {errors?.code && (
                                <p className={cn("mt-1 text-sm text-red-600")}>
                                {errors.code?.message}
                                </p>
                              )}
                            </label> */}
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
                    disabled={newAdmin.isPending}
                    className="col-span-2 mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300"
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
                    <Link href="/sign-in" className="text-goldie-300">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Page;

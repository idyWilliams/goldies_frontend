"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiUserSharedLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/helper/cn";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Page = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <Layout>
      <div className="mt-[64px]" />

      <section className="py-10">
        <div className="wrapper">
          <div className="flex flex-col items-center sm:mx-auto sm:w-[400px] sm:border sm:bg-white sm:p-6 sm:shadow-lg">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-goldie-300 bg-opacity-35">
                <RiUserSharedLine size={30} />
              </span>
            </span>
            <div className="mb-4 mt-6 text-center">
              <h1 className="mb-1 text-2xl font-bold capitalize">Sign In</h1>
              <p className="text-balance text-neutral-600">
                Welcom Back! Sign in to continue
              </p>
            </div>
            <div className="w-full">
              <form
                id="signin"
                className="grid gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="email" className="">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Email Address
                  </span>
                  <input
                    {...register("email")}
                    type="email"
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.email
                        ? "border border-red-600 focus:border-red-600"
                        : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                    )}
                    id="email"
                    name="email"
                    placeholder="Your email"
                  />
                </label>
                <label htmlFor="password" className="relative">
                  <span className="mb-1 inline-block font-medium capitalize">
                    Password
                  </span>
                  <input
                    {...register("password")}
                    type={visible ? "text" : "password"}
                    className={cn(
                      "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                      errors?.password
                        ? "border border-red-600 focus:border-red-600"
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
                </label>
                <div className="flex items-center justify-between">
                  <label htmlFor="agree" className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree"
                      checked
                      className="form-checkbox h-4 w-4 checked:bg-goldie-300 checked:hover:bg-neutral-800 focus:ring-neutral-800 checked:focus:ring-neutral-800"
                    />
                    <span>Keep me signed in</span>
                  </label>

                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
                <Button className="mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300">
                  Sign Up
                </Button>

                <p className="text-center">
                  Don’t have an account? &nbsp;
                  <Link href="/sign-up" className="text-goldie-300">
                    Sign Up
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

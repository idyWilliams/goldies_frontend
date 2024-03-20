"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const [visible, setVisible] = useState(false);
  // const [login, setLogin] = useState(true);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const onSubmit = (event: any) => {
    // event.preventDefault();
    const form = getValues();
    console.log(form);
  };
  return (
    <>
      <div className="w-full">
        <h1 className="font-bold">Login</h1>
        <p className="mb-5 text-[13px]">Enter your login details</p>
        <form
          id="login"
          className="space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className="block">
            <span className="mb-2 block w-full">Email Address</span>
            <input
              {...register("email")}
              type="email"
              // name="email"
              autoComplete="off"
              id="email"
              placeholder="Your email"
              className={`w-full rounded-sm bg-gray-50 text-[13px] ${errors.email ? "border border-red-500 focus:border-red-500 focus:outline-none focus:ring-0" : "border focus:border-black focus:outline-none focus:ring-black"}`}
            />
            <p className="mt-2 text-[#a10]">{errors.email?.message}</p>
          </label>
          <label htmlFor="password" className="mt-4 block">
            <span className="mb-2 block w-full">Password</span>
            <div className="relative">
              <input
                {...register("password")}
                type={visible ? "text" : "password"}
                //   name="password"
                autoComplete="off"
                id="password"
                placeholder="Your password"
                className={`w-full rounded-sm bg-gray-50 text-[13px] ${errors.password ? "border border-red-500 focus:border-red-500 focus:outline-none focus:ring-0" : "border focus:border-black focus:outline-none focus:ring-black"}`}
              />
              <span
                onClick={handleToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
              >
                {visible ? <BsEyeSlash /> : <AiOutlineEye />}
              </span>
            </div>
            <p className="mt-2 text-[#a10]">{errors.password?.message}</p>
          </label>
          <p className="mt-2 text-right text-sm">Forgot password?</p>
          <button
            type="submit"
            className="mt-6 w-full rounded-sm bg-black px-11 py-2 text-[#9C8222]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 flex items-center justify-center text-[12px]">
          Don&apos;t have an account?&nbsp;&nbsp;
          <Link href={"/signup"} className="cursor-pointer text-[#9C8222]">
            Register Now
          </Link>
        </p>
      </div>
    </>
  );
}

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignUp() {
  const [visible, setVisible] = useState(false);

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
    console.log(form, "text");
  };

  return (
    <>
      <div className="w-full">
        <h1 className="font-bold">Create an account</h1>
        <p className="text-[13px]">
          Register your account by filling the form below
        </p>

        <form id="signup" className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 flex w-full items-center justify-center gap-4">
            <label htmlFor="firstName" className="block">
              <span className="">Firstname</span>
              <input
                {...register("firstName")}
                type="text"
                autoComplete="off"
                id="firstName"
                placeholder="Your firstname"
                className={`w-full rounded-sm bg-gray-50 text-[13px] ${errors.firstName ? "border border-red-500 focus:border-red-500 focus:outline-none focus:ring-0" : "border focus:border-black focus:outline-none focus:ring-black"}`}
              />
              <p className="mt-2 text-[#a10]">{errors.firstName?.message}</p>
            </label>

            <label htmlFor="lastName" className="block">
              <span className="">LastName</span>
              <input
                {...register("lastName")}
                type="text"
                autoComplete="off"
                id="lastName"
                placeholder="Your lastname"
                className={`w-full rounded-sm bg-gray-50 text-[13px] ${errors.lastName ? "border border-red-500 focus:border-red-500 focus:outline-none focus:ring-0" : "border focus:border-black focus:outline-none focus:ring-black"}`}
              />
              <p className="mt-2 text-[#a10]">{errors.lastName?.message}</p>
            </label>
          </div>

          <label htmlFor="email" className="">
            <span className="mb-1 mt-4 block w-full">Email Address</span>
            <input
              {...register("email")}
              type="email"
              autoComplete="off"
              id="email"
              placeholder="Your email"
              className={`w-full rounded-sm bg-gray-50 text-[13px] ${errors.email ? "border border-red-500 focus:border-red-500 focus:outline-none focus:ring-0" : "border focus:border-black focus:outline-none focus:ring-black"}`}
            />
            <p className="mt-2 text-[#a10]">{errors.email?.message}</p>
          </label>

          <label htmlFor="password" className="">
            <span className="mb-1 mt-4 block w-full">Password</span>
            <div className="relative">
              <input
                {...register("password")}
                type={visible ? "text" : "password"}
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
          <button className="mt-4 w-full rounded-sm bg-black px-11 py-2 text-[#9C8222]">
            Register
          </button>
        </form>
        <p className="mt-4 flex items-center justify-center text-[12px]">
          Already have an account?&nbsp;&nbsp;
          <Link href={"/login"} className="cursor-pointer text-[#9C8222]">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}

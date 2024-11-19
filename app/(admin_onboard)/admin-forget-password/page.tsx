"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { forgetAdminPassword } from "@/services/hooks/admin-auth";
import { Sms } from "iconsax-react";
import { BiArrowBack } from "react-icons/bi";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const ForgetAdminPassword = () => {
  const [email, setEmail] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const forgetPassword = useMutation({
    mutationFn: forgetAdminPassword,
    mutationKey: ["Admin Forget Password"],
  });

  const onSubmit = (data: any) => {
    // setEmail(data.email);
    // console.log("Submitted Data:", data);
    // forgetPassword
    //   .mutateAsync(data)
    //   .then((res: any) => {
    //     console.log("res: ", res.data);
    //     reset();
    //   })
    //   .catch((err: any) => {
    //     console.log(err, "Admin sign-in err");
    //     toast.error(err?.response?.data?.message || err?.message);
    //   });
  };

  return (
    <>
      {forgetPassword.isSuccess ? (
        <div className="flex w-full max-w-md flex-col items-center border bg-white px-6 py-12 shadow-lg sm:mx-auto sm:w-[440px]">
          <div className="mb-4 flex flex-col items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
                <Sms className="" />
              </span>
            </span>
            <h3 className="mt-5  text-[20px] font-bold">Check your mail</h3>
            <p className="mt-2 text-center text-sm leading-normal">
              We&apos;ve sent a reset link to {email}
            </p>
          </div>

          <Button className="my-3 h-auto w-full rounded bg-neutral-900 py-2.5 text-sm text-goldie-300">
            Open email app
          </Button>
          <div className="mb-7 flex cursor-pointer items-center justify-center gap-1 text-sm text-neutral-500">
            <span>Didn&apos;t get an email?</span>
            <span
              className="text-goldie-300"
              onClick={() => onSubmit({ email })}
            >
              Click to resend
            </span>
          </div>
          <div className="flex cursor-pointer items-center justify-center gap-3 ">
            <Link
              href={"/admin-signin"}
              className="inline-flex items-center gap-2 text-sm text-neutral-500"
            >
              <span>
                <BiArrowBack />
              </span>{" "}
              Back to login
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-md flex-col items-center border bg-white px-6 py-12 shadow-lg sm:mx-auto sm:w-[440px]">
          <div className="mb-8 text-center">
            <h1 className="mt-5 text-[20px] font-bold">Forgot Password?</h1>
            <p className="mt-2 text-sm">
              No worries, we&apos;ll send you reset instructions
            </p>
          </div>
          <div className="w-full">
            <form
              id="admin-sign-in"
              className="grid gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email */}
              <label htmlFor="email">
                <span className="mb-1 inline-block font-medium capitalize">
                  Email address
                </span>
                <input
                  {...register("email")}
                  type="email"
                  className={cn(
                    "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                    errors?.email
                      ? " border border-red-600 focus:border-red-600 focus:ring-red-600"
                      : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                  )}
                  id="email"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className=" text-red-600"> {errors?.email?.message} </p>
                )}
              </label>

              <Button
                disabled={forgetPassword?.isPending}
                className="mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-goldie-300"
                type="submit"
              >
                {forgetPassword?.isPending ? "Loading...." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetAdminPassword;

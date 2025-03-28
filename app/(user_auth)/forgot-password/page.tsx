"use client";

import { Button } from "@/components/ui/button";
import Verification from "@/components/Verification";
import { cn } from "@/helper/cn";
import { forgotPassword } from "@/services/hooks/user-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Key } from "iconsax-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
});

export default function Page() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitEmail = useMutation({
    mutationFn: forgotPassword,
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    submitEmail
      .mutateAsync({ email: data.email })
      .then((res: any) => {
        localStorage.removeItem("email");
        localStorage.setItem("email", JSON.stringify({ email: data.email }));
        setOpen(true);
        reset();
        return res;
      })
      .catch((err: any) => {
        console.error(err);
        toast.error(err?.response?.data?.message || err?.message);
      });
  };

  const resubmit = () => {
    email && onSubmit({ email: email });
  };

  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  return (
    <div className="mx-auto flex w-full items-center justify-center bg-white px-4 pb-10 pt-4 sm:w-[560px] md:h-[70vh] md:w-[640px] lg:w-[500px]">
      <div
        className={cn(
          "block w-full bg-white p-5 sm:mx-auto sm:w-[400px] sm:border sm:bg-white sm:p-6 sm:shadow-lg md:border-0 md:shadow-none",
          open && "hidden",
        )}
      >
        <div className="mb-6 flex flex-col items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
              <Key className="" />
            </span>
          </span>
          <h3 className="mt-5 text-[20px] font-bold">Forgot Password?</h3>
          <p className="text-[12px]">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>
        <form id="forgotPassword" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            <span className="mb-1 inline-block text-sm">Email</span>
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={cn(
                  "form-input w-full rounded border-none bg-neutral-100 placeholder:text-sm focus:border-neutral-900 focus:ring-0",
                  errors?.email && "border-red-600 focus:border-red-600",
                )}
              />
              <span
                onClick={handleToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500"
              >
                {/* {visible ? <BsEyeSlash /> : <AiOutlineEye />} */}
              </span>
              <p className="mt-2 text-[#a10]">{errors.email?.message}</p>
            </div>
          </label>
          <div
            className={`${submitEmail.isPending ? "cursor-not-allowed" : ""}`}
          >
            <Button
              className="my-5 w-full rounded bg-neutral-900 py-2 text-sm text-brand-200 disabled:hover:cursor-not-allowed"
              disabled={submitEmail.isPending}
            >
              {submitEmail.isPending ? "Submitting" : "Reset Password"}
            </Button>
          </div>

          <div className="flex cursor-pointer items-center justify-center gap-3 ">
            <Link
              href={"/sign-in"}
              className="inline-flex items-center gap-2 text-sm text-neutral-500"
            >
              <span>
                <BiArrowBack />
              </span>{" "}
              Back to login
            </Link>
          </div>
        </form>
      </div>

      <div className={cn("hidden w-full", open && "block")}>
        <Verification email={email} resubmit={resubmit} />
      </div>
    </div>
  );
}

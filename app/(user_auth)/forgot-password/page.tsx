"use client";

import { Button } from "@/components/ui/button";
import Verification from "@/components/Verification";
import { cn } from "@/helper/cn";
import { forgotPassword } from "@/services/hooks/user-auth";
import { ErrorResponse } from "@/types/products";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
  const [showVerification, setShowVerification] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");

  const submitEmail = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setSubmittedEmail(email);
      localStorage.setItem("forgotPasswordEmail", JSON.stringify(email));
      setShowVerification(true);
      reset();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error);
      const resError = error.response?.data;
      console.error(resError);
      toast.error(`${resError?.message ? resError?.message : resError}`);
    },
  });

  const handleResubmit = async () => {
    await submitEmail.mutateAsync({ email: submittedEmail });
  };

  return (
    <div className="mx-auto flex w-full items-center justify-center px-4 py-10 sm:w-[560px] md:h-[70vh] md:w-[640px] lg:w-[500px]">
      {showVerification ? (
        <Verification email={submittedEmail} resubmit={handleResubmit} />
      ) : (
        <div className="block w-full bg-white p-5 sm:mx-auto sm:w-[400px] sm:border sm:bg-white sm:p-6 sm:shadow-lg md:border-0 md:shadow-none">
          <div className="mb-6 flex flex-col items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 bg-opacity-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-200 bg-opacity-10 text-brand-100">
                <Key className="" />
              </span>
            </span>
            <h3 className="mt-5 text-[20px] font-bold">Forgot Password?</h3>
            <p className="text-center text-[12px]">
              No worries, we&apos;ll send you reset instructions
            </p>
          </div>

          <form
            onSubmit={handleSubmit((data) =>
              submitEmail.mutate({ email: data.email }),
            )}
          >
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block text-sm">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Enter your email"
                className={cn(
                  "form-input w-full rounded border border-none border-neutral-400 bg-white placeholder:text-sm focus:border-neutral-900 focus:ring-0",
                  errors?.email && "border-red-600 focus:border-red-600",
                )}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="my-5 w-full rounded bg-brand-200  py-2 text-sm text-brand-100 hover:bg-brand-200 disabled:hover:cursor-not-allowed"
              disabled={submitEmail.isPending || !isValid}
            >
              {submitEmail.isPending ? "Sending..." : "Reset Password"}
            </Button>

            <div className="flex justify-center">
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700"
              >
                <BiArrowBack />
                Back to login
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

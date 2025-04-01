"use client";
import { Key } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsEyeSlash } from "react-icons/bs";
import ReactPasswordChecklist from "react-password-checklist";
import * as yup from "yup";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";

import { resetPassword } from "@/services/hooks/user-auth";
import PasswordReset from "@/components/PasswordReset";
import ResetLinkExpired from "@/components/ResetLinkExpired";
import { Button } from "@/components/ui/button";
import { ErrorResponse } from "@/types/products";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const ResetPasswordComp = ({ token }: { token: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [passesChecklist, setPassesChecklist] = useState(false);

  const passwordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setShowSuccess(true);
      toast.success("Password reset successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Password reset failed. Please try again.";
      
      if (errorMessage.toLowerCase().includes("expired")) {
        setIsExpired(true);
      } else {
        toast.error(errorMessage);
      }
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [newPassword, confirmPassword] = watch(["newPassword", "confirm"]);

  const handleSubmitForm = (data: { newPassword: string }) => {
    passwordMutation.mutate({ password: data.newPassword, emailToken: token });
  };

  if (isExpired) {
    return <ResetLinkExpired />;
  }

  if (showSuccess) {
    return <PasswordReset password={confirmPassword} />;
  }

  return (
    <div className="mx-auto flex w-full items-center justify-center px-4 py-10 sm:w-[560px] md:h-[70vh] md:w-[640px] lg:w-[500px]">
      <div className="block w-full bg-white p-5 sm:mx-auto sm:w-[400px] sm:border sm:bg-white sm:p-6 sm:shadow-lg md:border-0 md:shadow-none">
        <div className="mb-6 flex flex-col items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
              <Key className="" />
            </span>
          </span>
          <h3 className="mt-5 text-[20px] font-bold">Set a new password</h3>
          <p className="text-balance text-center text-[12px]">
            Your new password must be different from your previously used
            password
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="mb-1 block text-sm font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("newPassword")}
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter your new password"
                className="form-input w-full rounded border-none bg-neutral-100 placeholder:text-sm focus:border-neutral-900 focus:ring-0"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {showPassword ? <BsEyeSlash /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm"
              className="mb-1 block text-sm font-semibold"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirm")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirm"
                placeholder="Confirm your new password"
                className="form-input w-full rounded border-none bg-neutral-100 placeholder:text-sm focus:border-neutral-900 focus:ring-0"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {showConfirmPassword ? <BsEyeSlash /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.confirm && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirm.message}
              </p>
            )}
          </div>

          {newPassword && (
            <ReactPasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={newPassword}
              valueAgain={confirmPassword}
              onChange={(isValid) => setPassesChecklist(isValid)}
              messages={{
                minLength: "Password has at least 8 characters",
                specialChar: "Password has special characters",
                number: "Password has a number",
                capital: "Password has a capital letter",
                match: "Passwords match",
              }}
              className="mt-2 text-xs"
            />
          )}

          <Button
            type="submit"
            className="my-5 w-full rounded bg-neutral-900 py-2 text-sm text-brand-200 disabled:hover:cursor-not-allowed"
            disabled={passwordMutation.isPending || !passesChecklist}
            aria-disabled={passwordMutation.isPending || !passesChecklist}
          >
            {passwordMutation.isPending ? "Resetting..." : "Reset Password"}
          </Button>

          <div className="flex items-center justify-center">
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
    </div>
  );
};

export default ResetPasswordComp;

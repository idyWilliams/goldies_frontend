"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { resetPassword } from "@/services/hooks/auth";
import PasswordReset from "@/components/PasswordReset";
import ResetLinkExpired from "@/components/ResetLinkExpired";
import { Button } from "@/components/ui/button";
import Verification from "@/components/Verification";
import { cn } from "@/helper/cn";
import { isTokenValid } from "@/helper/isTokenValid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { log } from "console";
import { Eye, EyeSlash, Key, PasswordCheck } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsEyeSlash } from "react-icons/bs";
import ReactPasswordChecklist from "react-password-checklist";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  newPassword: yup.string().required("New password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Page({ params }: { params: { token: string } }) {
  const isExpired = isTokenValid(params.token);

  const [visible, setVisible] = useState(false);
  const handleToggle = () => {
    setVisible((visible: boolean) => !visible);
  };

  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const submitPassword = useMutation({
    mutationFn: resetPassword,
  });

  const toggleEye1 = () => {
    setEye1((prev: any) => !prev);
  };
  const toggleEye2 = () => {
    setEye2((prev: any) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSave = (data: any) => {
    submitPassword
      .mutateAsync({ password: data.newPassword, token: params.token })
      .then((res: any) => {
        console.log(res);
        setOpen(true);
        reset();
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <>
      <Layout>
        <div className="mt-[64px] lg:mt-20"></div>
        <section className="py-12">
          <div className="mx-auto flex w-full items-center justify-center bg-white px-4 py-10 sm:w-[560px] md:h-[70vh] md:w-[640px] lg:w-[500px]">
            {isExpired && <ResetLinkExpired />}
            {!isExpired && (
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
                  <h3 className="mt-5 text-[20px] font-bold">
                    Set a new password
                  </h3>
                  <p className="text-balance text-center text-[12px]">
                    Your new password must be different from your previously
                    used password
                  </p>
                </div>
                <form id="forgotPassword" onSubmit={handleSubmit(handleSave)}>
                  <label htmlFor="newPassword">
                    <span className="mb-1 inline-block text-sm font-semibold">
                      Password
                    </span>
                    <div className="relative mb-4">
                      <input
                        {...register("newPassword")}
                        type={eye1 ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter your new password"
                        className="form-input w-full rounded border-none bg-neutral-100 placeholder:text-sm focus:border-neutral-900 focus:ring-0"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <span
                        onClick={toggleEye1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500"
                      >
                        {eye1 ? <BsEyeSlash /> : <AiOutlineEye />}
                      </span>
                    </div>
                  </label>
                  <label htmlFor="confirm">
                    <span className="mb-1 inline-block text-sm font-semibold">
                      Confirm Password
                    </span>
                    <div className="relative">
                      <input
                        {...register("confirm")}
                        type={eye2 ? "text" : "password"}
                        name="confirm"
                        id="confirm"
                        placeholder="Confirm your new password"
                        className="form-input w-full rounded border-none bg-neutral-100 placeholder:text-sm focus:border-neutral-900 focus:ring-0"
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        value={passwordAgain}
                      />
                      <span
                        onClick={toggleEye2}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500"
                      >
                        {eye2 ? <BsEyeSlash /> : <AiOutlineEye />}
                      </span>
                    </div>
                  </label>

                  {password !== "" && (
                    <ReactPasswordChecklist
                      rules={[
                        "minLength",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                      ]}
                      minLength={8}
                      value={password}
                      valueAgain={passwordAgain}
                      onChange={(isValid) => {}}
                    />
                  )}

                  <div
                    className={`${submitPassword.isPending ? "cursor-not-allowed" : ""}`}
                  >
                    <Button
                      className="my-5 w-full rounded bg-neutral-900 py-2 text-sm text-goldie-300 disabled:hover:cursor-not-allowed"
                      disabled={submitPassword.isPending}
                    >
                      {submitPassword.isPending
                        ? "Resetting"
                        : "Reset Password"}
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
            )}
            <div className={cn("hidden w-full", open && "block")}>
              <PasswordReset password={passwordAgain} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

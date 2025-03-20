"use client";
import { Button } from "@/components/ui/button";
import { resetAdminPassword } from "@/services/hooks/admin-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Key } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsEyeSlash } from "react-icons/bs";
import ReactPasswordChecklist from "react-password-checklist";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object().shape({
  newPassword: yup.string().required("New password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetAdminPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>("");
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const submitPassword = useMutation({
    mutationFn: resetAdminPassword,
    mutationKey: ["reset+password"],
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

  const handleSave = async (data: any) => {
    const { newPassword } = data;
    console.log(newPassword, "admin respas", { token: token, newPassword });

    try {
      const resetPw = await submitPassword.mutateAsync({
        token: token as string,
        newPassword,
      });
      console.log(resetPw);
      toast.success(resetPw?.message);
      reset();
      router.push("/admin-signin");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    setToken(token ? token : null);
    console.log(token, "token, admin reset");
  }, []);

  return (
    <>
      <div className="flex w-full max-w-md flex-col items-center border bg-white px-6 py-12 shadow-lg sm:mx-auto sm:w-[440px]">
        <div className="mb-6 flex flex-col items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#BC8123] bg-opacity-10">
              <Key className="" />
            </span>
          </span>
          <h3 className="mt-5 text-[20px] font-bold">Set a new password</h3>
          <p className="text-center text-[14px]">
            Your new password must be different from your previously used
            password
          </p>
        </div>
        <form
          id="forgotPassword"
          className="w-full"
          onSubmit={handleSubmit(handleSave)}
        >
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
              rules={["minLength", "specialChar", "number", "capital", "match"]}
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
              className="my-5 h-auto w-full rounded bg-neutral-900 py-3 text-sm text-brand-200 disabled:hover:cursor-not-allowed"
              disabled={submitPassword.isPending}
            >
              {submitPassword.isPending ? "Resetting" : "Reset Password"}
            </Button>
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
        </form>
      </div>
    </>
  );
};

export default ResetAdminPassword;

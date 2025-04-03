"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiUserSharedLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AiOutlineEye,
  AiOutlineUserAdd,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/helper/cn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, loginUser } from "@/services/hooks/user-auth";
import AuthContext from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import {
  getAdminUsers,
  inviteAdmin,
  verifyOTP,
} from "@/services/hooks/admin-auth";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";

// Define form data type
type FormData = {
  email: string;
  role: "admin" | "super_admin";
};

// Create validation schema with proper types
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  role: yup
    .string()
    .oneOf(["admin", "super_admin"] as const, "Invalid role")
    .required("Role is required"),
});

const Page = () => {
  const router = useRouter();
  // @ts-ignore
  const { setAuth, setIsLogin } = useContext(AuthContext);

  const inviteAnAdmin = useMutation({ mutationFn: inviteAdmin });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      role: "admin", // Default role is admin
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: FormData) => {
    inviteAnAdmin
      .mutateAsync(data)
      .then((res: any) => {
        setAuth(res);
        toast.success(`Invitation sent successfully to ${data.role}!`);
        reset();
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err?.response?.data?.message || err?.message);
      });
  };

  return (
    <section
      style={{
        background:
          "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.9)), url(/assets/vectorBG.jpg)",
        backgroundSize: "cover",
      }}
      className="flex h-dvh flex-col items-center justify-center px-4"
    >
      <div className="flex flex-col items-center rounded-lg border bg-white p-8 shadow-xl sm:mx-auto sm:w-[480px]">
        <div className="mb-8 flex flex-col items-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-200 bg-opacity-35">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 bg-opacity-35 text-brand-100">
              <AiOutlineUserAdd size={30} />
            </span>
          </span>
          <h1 className="mb-2 mt-6 text-2xl font-bold">Invite Admin</h1>
          <p className="text-center text-neutral-600">
            A link will be sent to the provided email to request admin access
          </p>
        </div>

        <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="mb-1 block font-medium">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              className={cn(
                "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                errors?.email
                  ? "border border-red-600 focus:border-red-600 focus:ring-0"
                  : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
              )}
              id="email"
              placeholder="admin@example.com"
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-medium">Admin Type</label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-200 p-4 transition-all",
                  selectedRole === "admin"
                    ? "border-brand-100 bg-brand-200 bg-opacity-10"
                    : "hover:border-neutral-300",
                )}
              >
                <input
                  type="radio"
                  {...register("role")}
                  value="admin"
                  className="sr-only"
                />
                <FaUserShield
                  size={24}
                  className={cn(
                    "mb-2",
                    selectedRole === "admin"
                      ? "text-brand-100"
                      : "text-neutral-500",
                  )}
                />
                <span
                  className={cn(
                    "font-medium",
                    selectedRole === "admin"
                      ? "text-brand-100"
                      : "text-neutral-700",
                  )}
                >
                  Admin
                </span>
                <span className="mt-1 text-center text-xs text-neutral-500">
                  Standard admin access
                </span>
              </label>

              <label
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-200 p-4 transition-all",
                  selectedRole === "super_admin"
                    ? "border-brand-100 bg-brand-200 bg-opacity-10"
                    : "hover:border-neutral-300",
                )}
              >
                <input
                  type="radio"
                  {...register("role")}
                  value="super_admin"
                  className="sr-only"
                />
                <AiOutlineSetting
                  size={24}
                  className={cn(
                    "mb-2",
                    selectedRole === "super_admin"
                      ? "text-brand-100"
                      : "text-neutral-500",
                  )}
                />
                <span
                  className={cn(
                    "font-medium",
                    selectedRole === "super_admin"
                      ? "text-brand-100"
                      : "text-neutral-700",
                  )}
                >
                  Super Admin
                </span>
                <span className="mt-1 text-center text-xs text-neutral-500">
                  Full system access
                </span>
              </label>
            </div>
            {errors?.role && (
              <p className="mt-1 text-sm text-red-600">
                {errors.role?.message}
              </p>
            )}
          </div>

          <Button
            disabled={inviteAnAdmin.isPending}
            className="hover:bg-brand-200/90 h-auto w-full bg-brand-200 py-3 text-base font-medium text-brand-100"
          >
            {inviteAnAdmin.isPending ? (
              <div className="flex items-center justify-center gap-3">
                <CgSpinner className="animate-spin" size={20} />
                Sending Invitation...
              </div>
            ) : (
              "Send Invite"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Page;

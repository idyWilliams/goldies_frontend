"use client";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/helper/cn";
import { initials } from "@/helper/initials";
import { updateAdminProfile } from "@/services/hooks/admin-auth";
import useAdmin from "@/services/hooks/admin/use_admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Profile } from "iconsax-react";
import { startsWith } from "lodash-es";
import React, { ReactNode, useEffect, useState } from "react";
import { useForm, FieldError, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object().shape({
  userName: yup.string().required("Fullname is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});

export default function ProfileInfo() {
  const { auth } = useAuth();
  const admin = auth?.admin;

  const updateUserName = useMutation({
    mutationFn: updateAdminProfile,
    mutationKey: ["update + username"],
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // HANDLE SUBMIT
  const handleSave = async (data: any) => {
    const { userName } = data;
    console.log({ userName, id: admin?._id });
    try {
      const update = await updateUserName.mutateAsync({
        userName,
        id: admin?._id as string,
      });
      console.log(update);
      localStorage.setItem("admin", JSON.stringify(update));
    } catch (error) {}
    reset();
    // toast.success("Account information updated successfully");
  };
  const handleCancel = () => {
    console.log("click cancelled");
    reset();
  };

  useEffect(() => {
    reset({
      userName: admin?.userName,
      email: admin?.email,
    });
  }, [admin?.email, admin?.userName, reset]);

  return (
    <section className="w-full px-2 lg:w-[48%]">
      <>
        <div className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-main">
          <span className="items-center justify-center">
            {initials(admin?.userName as string)}
          </span>
        </div>
        <p className="my-3 font-semibold">{admin?.userName}</p>
        <form className="space-y-5" onSubmit={handleSubmit(handleSave)}>
          <label htmlFor="userName" className="block">
            <span className="mb-1 inline-block">Username</span>
            <input
              {...register("userName")}
              type="text"
              autoComplete="off"
              id="userName"
              placeholder="Your full name"
              className={cn(
                "form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black",
                errors.userName && "border-red-600",
              )}
            />
            {errors.userName && (
              <p className="text-red-600">{errors.userName.message}</p>
            )}
          </label>
          <label htmlFor="email" className="block">
            <span className="mb-1 inline-block">Email address</span>
            <input
              {...register("email")}
              type="email"
              autoComplete="off"
              id="email"
              disabled
              placeholder="Your email"
              className="form-input w-full cursor-not-allowed rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black disabled:text-neutral-500"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </label>
          <div className="mb-6 mt-10 grid grid-cols-2 gap-8 lg:mb-0">
            <button
              type="submit"
              className="items-center justify-center rounded-sm bg-black px-5 py-2 text-sm text-main lg:text-base"
            >
              Save Changes
            </button>
          </div>
        </form>
      </>
    </section>
  );
}

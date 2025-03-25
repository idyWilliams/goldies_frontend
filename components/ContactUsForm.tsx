"use client"
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import { CheckCircle } from "lucide-react";
import { sendContactMail } from "@/services/hooks/mail";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/helper/cn";
import { SendContactUsMail } from "@/interfaces/mail.interface";
import Image from "next/image";
import Logo from "@/public/assets/new-logo/logo-white.svg";

const schema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  message: yup.string().required("Message is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  phoneNumber: yup
    .string()
    .required("Valid Phone Number is required")
    .min(6, "Valid Phone Number must be at least 6 characters")
    .max(15, "Valid Phone Number must not exceed 12 characters"),
});

const ContactUsForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendContactMail,
    onSuccess: () => {
      setIsDialogOpen(true);
      reset();

      setTimeout(() => {
        setIsDialogOpen(false);
      }, 3000);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      fullName: "",
      message: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: SendContactUsMail) => {
    await mutateAsync(data);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-black bg-brand-200 text-center">
          <DialogHeader>
            <DialogTitle className="text-center text-brand-200">
              <div className="flex justify-between ">
                <Image
                  src={Logo}
                  className="flex w-[100px] items-center"
                  alt="Goldis Logo sm"
                />
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div>
              <CheckCircle size={50} className="text-green-500" />
            </div>
            <p className="text-white">
              Your message has been sent successfully!
            </p>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="bg-brand-200 text-brand-100"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="block">
          <span className="mb-1 inline-block font-medium text-brand-200">
            Your name
          </span>
          <input
            {...register("fullName")}
            type="text"
            autoComplete="off"
            id="name"
            placeholder="Enter your name"
            className={cn(
              "form-input w-full rounded-md border-gray-300 placeholder:text-sm focus:border focus:border-brand-200 focus:ring-brand-200",
              errors.fullName && "border-red-600",
            )}
          />
          {errors.fullName && (
            <p className="text-red-600">{errors?.fullName?.message}</p>
          )}
        </label>
        <label htmlFor="email" className="block">
          <span className="mb-1 inline-block font-medium text-brand-200">
            Your email address
          </span>
          <input
            {...register("email")}
            type="email"
            autoComplete="off"
            id="email"
            placeholder="Enter your email address"
            className={cn(
              "form-input w-full rounded-md border-gray-300 placeholder:text-sm focus:border focus:border-brand-200 focus:ring-brand-200",
              errors.email && "border-red-600",
            )}
          />
          {errors.email && (
            <p className="text-red-600">{errors?.email?.message}</p>
          )}
        </label>
        <label htmlFor="phoneNumber" className="block">
          <span className="mb-1 inline-block font-medium text-brand-200">
            Your phone Number
          </span>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PhoneInput
                country={"ng"}
                {...field}
                inputProps={{
                  id: "phone",
                  className: `form-input pl-12 w-full rounded-md placeholder:text-sm focus:border focus:border-brand-200 focus:ring-brand-200 ${errors.phoneNumber ? "border-red-600" : "border-gray-300"}`,
                }}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-600">{errors?.phoneNumber?.message}</p>
          )}
        </label>
        <label htmlFor="message" className="block">
          <span className="mb-1 inline-block font-medium text-brand-200">
            Your message
          </span>
          <textarea
            {...register("message")}
            autoComplete="off"
            id="message"
            placeholder="Enter your message"
            className={cn(
              "form-textarea h-[100px] w-full rounded-md border-gray-300 placeholder:text-sm focus:border focus:border-brand-200 focus:ring-brand-200",
              errors.message && "border-red-600",
            )}
          />
          {errors.message && (
            <p className="text-red-600">{errors?.message?.message}</p>
          )}
        </label>
        <Button
          type="submit"
          disabled={isPending}
          className="ml-auto block w-full bg-brand-200 text-brand-100 hover:border hover:border-brand-200 hover:bg-transparent hover:text-brand-200 md:w-[75%]"
        >
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </>
  );
};

export default ContactUsForm;

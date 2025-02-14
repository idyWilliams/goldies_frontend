"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/helper/cn";
import { SendContactUsMail } from "@/interfaces/mail.interface";
import Logo from "@/public/assets/goldis-gold-logo.png";
import Img from "@/public/assets/reviews.png";
import { sendContactMail } from "@/services/hooks/mail";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Call, Location, Sms } from "iconsax-react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";

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

export default function ContactPage() {
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
    <section>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-black bg-black text-center">
          <DialogHeader>
            <DialogTitle className="text-center text-goldie-300">
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
              className="bg-goldie-300 text-[#0F0904;] hover:bg-goldie-400"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative h-[200px] w-full md:h-[300px]">
        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-white md:text-3xl lg:mb-2 lg:text-5xl">
            Contact Us
          </h1>
          <p className="text-center text-white">
            Please contact us if you have any question or concerns
          </p>
          <div className="mt-4">
            <Link href={"/"} className="text-white">
              Home
            </Link>{" "}
            <span className="text-white">-</span>{" "}
            <Link href={"/contact"} className="text-goldie-300">
              Contact Us
            </Link>
          </div>
        </div>

        <Image
          src={Img}
          alt="banner"
          width={1000}
          height={400}
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center"
        />
      </div>
      <div className=" bg-neutral-300">
        <div className="mx-auto grid gap-5 px-4 py-16 md:grid-cols-[300px_1fr] lg:w-[800px]  xl:w-[1000px]">
          <div className="flex flex-col justify-center bg-black px-10 pb-14 pt-10 md:rounded-md">
            <h3 className="text-[24px] font-bold text-white">Opening Hours</h3>
            <p className="text-[16px] text-goldie-300">
              Mondays - Fridays 8am-6pm
            </p>
            <div className="mt-5 flex items-center justify-center gap-7 text-white">
              <div className="flex flex-col items-start space-y-7">
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Call />
                  </span>
                  <a
                    href="tel:+447488855300"
                    className="text-[14px] hover:underline"
                  >
                    +447488855300
                  </a>
                </div>
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Sms />
                  </span>
                  <a
                    href="mailto:johndoe@gmail.com"
                    className="text-[14px] hover:underline"
                  >
                    johndoe@gmail.com
                  </a>
                </div>
                <div className="inline-flex items-start gap-5">
                  <span>
                    <Location />
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=37+Wallenger+Avenue,+Romford,+Essex,+England,+RM2+6EP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-balance text-[14px] hover:underline"
                  >
                    37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-7"></div>
            </div>
            <Image
              src={Logo}
              alt="logo"
              width={100}
              height={100}
              className="mx-auto mt-20 hidden h-auto w-[80%] opacity-40 md:block"
            />
          </div>
          <div className=" bg-white px-4 py-8 md:rounded-md xl:px-10">
            <h3 className="mb-5 text-center text-[24px] font-bold text-black">
              Contact Us
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name" className="block">
                <span className="mb-1 inline-block font-medium">Your name</span>
                <input
                  {...register("fullName")}
                  type="text"
                  autoComplete="off"
                  id="name"
                  placeholder="Enter your name"
                  className={cn(
                    "form-input w-full rounded-md border-gray-300 placeholder:text-sm focus:border focus:border-black focus:ring-black",
                    errors.fullName && "border-red-600",
                  )}
                />
                {errors.fullName && (
                  <p className="text-red-600">{errors?.fullName?.message}</p>
                )}
              </label>
              <label htmlFor="email" className="block">
                <span className="mb-1 inline-block font-medium">
                  Your email address
                </span>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="off"
                  id="email"
                  placeholder="Enter your email address"
                  className={cn(
                    "form-input w-full rounded-md border-gray-300 placeholder:text-sm focus:border focus:border-black focus:ring-black",
                    errors.email && "border-red-600",
                  )}
                />
                {errors.email && (
                  <p className="text-red-600">{errors?.email?.message}</p>
                )}
              </label>
              <label htmlFor="phoneNumber" className="block">
                <span className="mb-1 inline-block font-medium">
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
                        className: `form-input pl-12 w-full rounded-md placeholder:text-sm focus:border focus:border-black focus:ring-black ${errors.phoneNumber ? "border-red-600" : "border-gray-300"}`,
                      }}
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-600">{errors?.phoneNumber?.message}</p>
                )}
              </label>
              <label htmlFor="message" className="block">
                <span className="mb-1 inline-block font-medium">
                  Your message
                </span>
                <textarea
                  {...register("message")}
                  autoComplete="off"
                  id="message"
                  placeholder="Enter your message"
                  className={cn(
                    "form-textarea h-[100px] w-full resize-none rounded-md border-gray-300 placeholder:text-sm focus:border focus:border-black focus:ring-black",
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
                className="ml-auto block w-full text-goldie-300 md:w-[75%]"
              >
                {isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

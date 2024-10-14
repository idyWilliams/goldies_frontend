"use client";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Img from "../../public/assets/reviews.png";
import logo from "../../public/assets/goldis-gold-logo.png";
import { Call, Location, Sms } from "iconsax-react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import { cn } from "@/helper/cn";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  message: yup.string().required("message is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  phone: yup
    .string()
    .required("Valid Phone Number is required")
    .min(6, "Valid Phone Number must be at least 6 characters")
    .max(15, "Valid Phone Number must not exceed 12 characters"),
});
export default function Page() {
  const [phone, setPhone] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
    setPhone("");
    reset();
    toast.success("Form successfully submitted");
  };
  return (
    <>
      <Layout>
        <div className="mt-[64px] lg:mt-20" />
        <section className="">
          <div className="h-14 bg-black lg:hidden"></div>
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
            <div className="mx-auto grid gap-5 px-4 py-10 md:grid-cols-[300px_1fr] lg:w-[800px] lg:pt-40 xl:w-[1000px]">
              <div className="flex flex-col justify-center bg-black px-10 pb-14 pt-10 md:rounded-md">
                <h3 className="text-[24px] font-bold text-white">
                  Opening Hours
                </h3>
                <p className="text-[16px] text-goldie-300">
                  Mondays - Fridays 8am-6pm
                </p>
                <div className="mt-5 flex items-center justify-center gap-7 text-white">
                  <div className="flex flex-col items-start space-y-7">
                    <div className="inline-flex items-center gap-5">
                      <span>
                        <Call />
                      </span>
                      <span className="text-[14px]">+447488855300</span>
                    </div>
                    <div className="inline-flex items-center gap-5">
                      <span>
                        <Sms />
                      </span>
                      <span className="text-[14px]">johndoe@gmail.com</span>
                    </div>
                    <div className="inline-flex items-start gap-5">
                      <span>
                        <Location />
                      </span>
                      <span className="text-balance text-[14px]">
                        37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start space-y-7"></div>
                </div>
                <Image
                  src={logo}
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
                    <span className="mb-1 inline-block font-medium">
                      Your name
                    </span>
                    <input
                      {...register("name")}
                      type="text"
                      autoComplete="off"
                      id="name"
                      placeholder="Enter your name"
                      className={cn(
                        "form-input w-full rounded-md border-gray-300 placeholder:text-sm focus:border focus:border-black focus:ring-black",
                        errors.name && "border-red-600",
                      )}
                    />
                    {errors.name && (
                      <p className="text-red-600">{errors?.name?.message}</p>
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
                      name="phone"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <PhoneInput
                          country={"ng"}
                          value={phone || value}
                          onChange={(phoneNumber) => {
                            setPhone(phoneNumber);
                            onChange(phoneNumber);
                          }}
                          inputProps={{
                            id: "phone",
                            className: `form-input pl-12 w-full rounded-md placeholder:text-sm focus:border focus:border-black focus:ring-black ${errors.phone ? "border-red-600" : "border-gray-300"}`,
                          }}
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-600">{errors?.phone?.message}</p>
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
                  <button className="ml-auto block w-full bg-black py-2 text-goldie-300 md:w-[75%]">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

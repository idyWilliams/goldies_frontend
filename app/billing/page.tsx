"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { billingFormData } from "@/utils/formData";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import "react-phone-input-2/lib/style.css";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { toast } from "sonner";
import { initPayment } from "@/services/hooks/payment";
import { useMutation } from "@tanstack/react-query";
const form1Schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  phoneNumber: yup
    .string()
    .required("Valid Phone Number is required")
    .min(6, "Valid Phone Number must be at least 6 characters")
    .max(15, "Valid Phone Number must not exceed 12 characters"),
  address: yup.string().required("Shipping address is required"),
  city: yup.string().required("Shipping address is required"),
  country: yup.string().required("Shipping address is required"),
});

const form2Schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  phoneNumber: yup
    .string()
    .required("Valid Phone Number is required")
    .min(6, "Valid Phone Number must be at least 6 characters")
    .max(15, "Valid Phone Number must not exceed 12 characters"),
  address: yup.string().required("Shipping address is required"),
  city: yup.string().required("Shipping address is required"),
  country: yup.string().required("Shipping address is required"),
});

const Page = () => {
  const cart = useSelector((state: RootState) => state.product.cart);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>("option1");
  const form1 = useForm({ resolver: yupResolver(form1Schema) });
  const form2 = useForm({ resolver: yupResolver(form2Schema) });
  const [submitForm1, setSubmitForm1] = useState(true);
  const paymentInit = useMutation({
    mutationFn: initPayment,
  });
  const {
    register,
    control,
    // handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
    },
  });

  const handleSubmit = () => {
    if (selectedMethod === "option1") {
      form1.handleSubmit(onSubmitForm1)();
    } else if (selectedMethod === "option2") {
      form2.handleSubmit(onSubmitForm2)();
    } else {
      console.warn("No form selected for submission.");
    }
  };

  const orderTotal = Object.values(cart).reduce((acc, current) => {
    return (
      50.5 + acc + parseFloat(current.maxPrice) * (current.quantity as number)
    );
  }, 0);

  const onSubmitForm1 = (data: any) => {
    console.log("Form 1 submitted:", data);
    console.log("Cart data", cart);

    const callbackUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/my-orders"
        : "https://goldies-frontend.vercel.app/my-orders";

    const paymentData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      amount: orderTotal,
      callbackUrl: callbackUrl,
    };

    console.log("Payment Data:", paymentData);

    paymentInit
      .mutateAsync(paymentData)
      .then((res: any) => {
        if (res?.data?.authorization_url) {
          window.location.href = res?.data?.authorization_url;
          toast.success("Redirecting....");
        } else {
          console.error("Failed to initialize payment.");
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const onSubmitForm2 = (data: any) => {
    console.log("Form 2 submitted:", data);
    console.log("Cart data", cart);
    const callbackUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/my-orders"
        : "https://goldies-frontend.vercel.app/my-orders";
    const paymentData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      amount: orderTotal,
      callbackUrl: callbackUrl,
    };

    console.log("Payment Data:", paymentData);

    paymentInit
      .mutateAsync(paymentData)
      .then((res: any) => {
        if (res?.data?.authorization_url) {
          window.location.href = res?.data?.authorization_url;
          toast.success("window pending");
        } else {
          console.error("Failed to initialize payment.");
        }
      })
      .catch((err) => {
        console.error("Error: ", err, "err.res", err.response);
        console.log(err.message);
      });
  };
  const handleOnchange = (event: any) => {
    setSelectedMethod(event.target.value);
  };

  // console.log(cart, Object.values(cart));

  return (
    <>
      <Layout>
        <div className="mt-[64px] h-full lg:mt-20" />
        <div className="bg-black py-3">
          <div className="wrapper">
            <BreadCrumbs
              items={[
                {
                  name: "Home",
                  link: "/",
                },
                {
                  name: "Billing",
                  link: "/billing",
                },
              ]}
            />
          </div>
        </div>
        <section className="bg-neutral-100 px-4 py-6">
          <div className="grid-cols-2 gap-4 md:grid lg:mx-auto lg:max-w-5xl lg:grid-cols-[1fr_400px] lg:gap-8 xl:max-w-6xl">
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Billing Details</h2>
                <p>This field is required before Payment</p>
              </div>

              <form id="form1">
                <div className="space-y-3">
                  <EachElement
                    of={billingFormData}
                    render={(data: any, index: number) => {
                      if (data?.name === "address")
                        return (
                          <div key={index}>
                            <label
                              htmlFor={data.name}
                              className="mb-1 inline-block text-sm"
                            >
                              {data.label}
                            </label>
                            <textarea
                              {...form1.register("address")}
                              id={data.name}
                              name={data.name}
                              placeholder={data.place_holder}
                              required={data.required}
                              className={cn(
                                "form-textarea block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                              )}
                            />
                            {form1.formState.errors.address && (
                              <p className="text-red-600">
                                {form1.formState.errors.address?.message}
                              </p>
                            )}
                          </div>
                        );

                      if (data?.name === "country")
                        return (
                          <div key={index}>
                            <label
                              htmlFor={data.name}
                              className="mb-1 inline-block text-sm"
                            >
                              {data.label}
                            </label>
                            <Controller
                              name={data?.name}
                              control={form1?.control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <CountryDropdown
                                  {...field}
                                  value={field.value || country1}
                                  onChange={(country) => {
                                    field.onChange(country);
                                    setCountry1(country);
                                  }}
                                  classes={cn(
                                    "form-input block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                  )}
                                />
                              )}
                            />
                            {form1.formState.errors.country && (
                              <p className="text-red-600">
                                {form1.formState.errors.country?.message}
                              </p>
                            )}
                          </div>
                        );

                      if (data?.name === "phoneNumber")
                        return (
                          <div key={index}>
                            <label
                              htmlFor={data.name}
                              className="mb-1 inline-block text-sm"
                            >
                              {data.label}
                            </label>
                            <Controller
                              name={data?.name}
                              control={form1?.control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  country={"ng"} // Adjust this if necessary for dynamic countries
                                  value={field.value || phone1}
                                  onChange={(phoneNumber) => {
                                    field.onChange(phoneNumber);
                                    setPhone1(phoneNumber);
                                  }}
                                  inputProps={{
                                    name: "phone",
                                    id: "phone",
                                    className:
                                      "form-input block w-full rounded border-0 pl-12 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                  }}
                                  dropdownClass={"relative z-50"}
                                />
                              )}
                            />
                            {form1.formState.errors.phoneNumber && (
                              <p className="text-red-600">
                                {form1.formState.errors.phoneNumber?.message}
                              </p>
                            )}
                          </div>
                        );

                      return (
                        <div key={index}>
                          <label
                            htmlFor={data.name}
                            className="mb-1 inline-block text-sm"
                          >
                            {data.label}
                          </label>
                          <input
                            {...form1.register(data?.name)}
                            type={data.type}
                            name={data.name}
                            id={data.name}
                            placeholder={data.place_holder}
                            required={data.required}
                            className={cn(
                              "form-input block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                            )}
                          />
                          {form1.formState.errors[
                            data?.name as keyof typeof errors
                          ] && (
                            <p className="text-red-600">
                              {
                                form1.formState.errors[
                                  data?.name as keyof typeof errors
                                ]?.message
                              }
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
              </form>

              <div className="flex flex-col gap-4">
                <label
                  htmlFor="save"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    name="save"
                    id="save"
                    className="form-checkbox rounded-sm checked:bg-neutral-900 checked:hover:bg-neutral-900 focus:ring-neutral-900 checked:focus:bg-neutral-900"
                  />
                  <span>Save this information</span>
                </label>
                <div className="mt-3 inline-flex flex-col space-y-2">
                  <label
                    htmlFor="info"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="options"
                      id="option1"
                      checked={selectedMethod === "option1"}
                      value={"option1"}
                      onChange={(e) => handleOnchange(e)}
                      className="form-checkbox rounded-sm checked:bg-neutral-900 checked:hover:bg-neutral-900 focus:ring-neutral-900 checked:focus:bg-neutral-900"
                    />
                    <span>Same as billing address</span>
                  </label>
                  <label
                    htmlFor="options"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="options"
                      id="option2"
                      checked={selectedMethod === "option2"}
                      value={"option2"}
                      className="form-checkbox rounded-sm checked:bg-neutral-900 checked:hover:bg-neutral-900 focus:ring-neutral-900 checked:focus:bg-neutral-900"
                      // onChange={() => setNewInfo(!newInfo)}
                      onChange={(e) => handleOnchange(e)}
                    />
                    <span>Use different shipping address</span>
                  </label>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-medium">Shipping method</h3>
                <p className="text-neutral-500">
                  This is the address where your product will be delivered
                </p>
              </div>
              <form id="form2">
                <div>
                  <div className="h-min overflow-hidden">
                    {selectedMethod === "option2" && (
                      <div
                        className={cn(
                          "mt-2 h-0 origin-top space-y-3 duration-300",
                          selectedMethod === "option2" && "h-[610px]",
                        )}
                      >
                        <EachElement
                          of={billingFormData}
                          render={(data: any, index: number) => {
                            if (data?.name === "address")
                              return (
                                <div key={index}>
                                  <label
                                    htmlFor={data.name}
                                    className="mb-1 inline-block text-sm"
                                  >
                                    {data.label}
                                  </label>
                                  <textarea
                                    {...form2.register("address")}
                                    id={data.name}
                                    name={data.name}
                                    placeholder={data.place_holder}
                                    required={data.required}
                                    className={cn(
                                      "form-textarea block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                    )}
                                  />
                                  {form2.formState.errors.address && (
                                    <p className="text-red-600">
                                      {form2.formState.errors.address?.message}
                                    </p>
                                  )}
                                </div>
                              );

                            if (data?.name === "country")
                              return (
                                <div key={index}>
                                  <label
                                    htmlFor={data.name}
                                    className="mb-1 inline-block text-sm"
                                  >
                                    {data.label}
                                  </label>
                                  <Controller
                                    name={data?.name}
                                    control={form2?.control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                      <CountryDropdown
                                        {...field}
                                        value={field.value || country2}
                                        onChange={(country) => {
                                          field.onChange(country);
                                          setCountry2(country);
                                        }}
                                        classes={cn(
                                          "form-input block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                        )}
                                      />
                                    )}
                                  />
                                  {form2.formState.errors.country && (
                                    <p className="text-red-600">
                                      {form2.formState.errors.country?.message}
                                    </p>
                                  )}
                                </div>
                              );

                            if (data?.name === "phoneNumber")
                              return (
                                <div key={index}>
                                  <label
                                    htmlFor={data.name}
                                    className="mb-1 inline-block text-sm"
                                  >
                                    {data.label}
                                  </label>
                                  <Controller
                                    name={data?.name}
                                    control={form2?.control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                      <PhoneInput
                                        {...field}
                                        country={"ng"} // Adjust this if necessary for dynamic countries
                                        value={field.value || phone2}
                                        onChange={(phoneNumber) => {
                                          field.onChange(phoneNumber);
                                          setPhone2(phoneNumber);
                                        }}
                                        inputProps={{
                                          name: "phone",
                                          id: "phone",
                                          className:
                                            "form-input block w-full rounded border-0 pl-12 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                        }}
                                        dropdownClass={"relative z-50"}
                                      />
                                    )}
                                  />
                                  {form2.formState.errors.phoneNumber && (
                                    <p className="text-red-600">
                                      {
                                        form2.formState.errors.phoneNumber
                                          ?.message
                                      }
                                    </p>
                                  )}
                                </div>
                              );

                            return (
                              <div key={index}>
                                <label
                                  htmlFor={data.name}
                                  className="mb-1 inline-block text-sm"
                                >
                                  {data.label}
                                </label>
                                <input
                                  {...form2.register(data?.name)}
                                  type={data.type}
                                  name={data.name}
                                  id={data.name}
                                  placeholder={data.place_holder}
                                  required={data.required}
                                  className={cn(
                                    "form-input block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                  )}
                                />
                                {form2.formState.errors[
                                  data?.name as keyof typeof errors
                                ] && (
                                  <p className="text-red-600">
                                    {
                                      form2.formState.errors[
                                        data?.name as keyof typeof errors
                                      ]?.message
                                    }
                                  </p>
                                )}
                              </div>
                            );
                          }}
                        />

                        {/* <label
                        htmlFor="save"
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          name="save"
                          id="save"
                          className="form-checkbox"
                        />
                        <span>Save this information</span>
                      </label> */}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            {/* order summary */}
            <div className="mt-3 md:mt-0">
              <h3 className="mb-3 hidden text-xl font-semibold md:block">
                Order Summary
              </h3>
              <section>
                {Object.values(cart).length >= 1 &&
                  Object.values(cart).map((item, idx) => {
                    return (
                      <div key={item.id} className=" space-y-3 p-2 md:bg-white">
                        <div className="grid grid-cols-[50px_1fr] gap-2 rounded-md bg-white p-4 md:bg-transparent md:p-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="h-full w-full object-cover object-center"
                          />
                          <div className="flex justify-between ">
                            <div className="">
                              <h3>{item.name}</h3>
                              <span className="">
                                ({item.quantity} Quantity)
                              </span>
                            </div>
                            <div className=" ">
                              <span className=" ">&euro; {item.maxPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </section>
              <div className="">
                <div className="space-y-3 p-2 md:bg-white">
                  <div className="flex items-center justify-between">
                    <ul className="flex flex-col gap-3">
                      <li>SubTotal</li>
                      <li>Delivery Fees</li>
                      <li>Total</li>
                    </ul>
                    <ul className="flex flex-col gap-3 ">
                      <li>&euro;{orderTotal}</li>
                      <li>&euro; 50.50</li>
                      <li>&euro;{orderTotal + 50.5}</li>
                    </ul>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 block w-full rounded bg-neutral-900 px-6 py-2.5 text-main"
                  onClick={handleSubmit}
                >
                  Proceed to payment
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Page;

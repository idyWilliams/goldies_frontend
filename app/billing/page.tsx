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
import RedVelvet from "../../public/assets/red-velvet-cake.webp";
import Chocolate from "../../public/assets/birthday-cake.webp";

import Link from "next/link";

import illustration from "../../public/assets/illistration-removebg-preview.png";
import { BsPlus, BsDash, BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { GiEmptyChessboard } from "react-icons/gi";
import { useDispatch } from "react-redux";
import {
  decrementProductQty,
  deleteProductFromCart,
  incrementProductQty,
  setProducts,
} from "@/redux/features/product/productSlice";
import { useEffect } from "react";

const schema = yup.object().shape({
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
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state: RootState) => state.product.cart);
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>("option1");
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const cartTotal = Object.values(cart).reduce((acc, current) => {
    return acc + parseFloat(current.maxPrice) * (current.quantity as number);
  }, 0);



  const handleOnchange = (event: any) => {
    setSelectedMethod(event.target.value);
  };

  console.log(cart, Object.values(cart));

  return (
    <>
      <Layout>
        <div className="mt-[64px] lg:mt-20" />
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
              <form id="billing">
                <div className="space-y-3">
                  <EachElement
                    of={billingFormData}
                    render={(data: any, index: number) => {
                      if (data?.name === "address")
                        return (
                          <div className="">
                            <label
                              htmlFor={data.name}
                              className="mb-1 inline-block text-sm"
                            >
                              {data.label}
                            </label>
                            <textarea
                              id={data.name}
                              name={data.name}
                              placeholder={data.place_holder}
                              required={data.required}
                              className={cn(
                                "form-textarea block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                              )}
                            />
                          </div>
                        );

                      if (data?.name === "country")
                        return (
                          <div className="">
                            <label
                              htmlFor={data.name}
                              className="mb-1 inline-block text-sm"
                            >
                              {data.label}
                            </label>
                            <CountryDropdown
                              value={country}
                              onChange={setCountry}
                              classes={cn(
                                "form-input block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                              )}
                            />
                            {/* {errors[data?.name] && (
                        <p className="text-red-600">
                          {errors[data?.name]?.message}
                        </p>
                      )} */}
                          </div>
                        );

                      if (data?.name === "phoneNumber")
                        return (
                          <div>
                            <label
                              htmlFor={data.name}
                              className="mb-1 inline-block text-sm"
                            >
                              {data.label}
                            </label>
                            <Controller
                              name={data?.name}
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  country={"ng"}
                                  value={field.value || phone}
                                  onChange={(phoneNumber) => {
                                    field.onChange(phoneNumber);
                                    setPhone(phoneNumber);
                                  }}
                                  // inputStyle={{
                                  //   fontFamily: `"Space Grotesk", sans-serif`,
                                  // }}
                                  inputProps={{
                                    name: "phone",
                                    id: "phone",
                                    className:
                                      "form-input block w-full rounded border-0 pl-12 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                  }}
                                  defaultErrorMessage="Phone number is required"
                                  dropdownClass={"relative z-50"}
                                />
                              )}
                            />
                          </div>
                        );

                      return (
                        <div key={index} className="">
                          <label
                            htmlFor={data.name}
                            className="mb-1 inline-block text-sm"
                          >
                            {data.label}
                          </label>
                          <input
                            {...register(data?.name)}
                            type={data.type}
                            name={data.name}
                            id={data.name}
                            defaultValue={""}
                            placeholder={data.place_holder}
                            required={data.required}
                            className={cn(
                              "form-input block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                            )}
                          />
                        </div>
                      );
                    }}
                  />

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
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-medium">Shipping method</h3>
                  <p className="text-neutral-500">
                    This is the address where your product will be delivered
                  </p>
                </div>

                <div>
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
                  <div className="h-min overflow-hidden">
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
                              <div className="">
                                <label
                                  htmlFor={data.name}
                                  className="mb-1 inline-block text-sm"
                                >
                                  {data.label}
                                </label>
                                <textarea
                                  id={data.name}
                                  name={data.name}
                                  placeholder={data.place_holder}
                                  required={data.required}
                                  className={cn(
                                    "form-textarea block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                  )}
                                />
                              </div>
                            );

                          if (data?.name === "country")
                            return (
                              <div className="">
                                <label
                                  htmlFor={data.name}
                                  className="mb-1 inline-block text-sm"
                                >
                                  {data.label}
                                </label>
                                <CountryDropdown
                                  value={country}
                                  onChange={setCountry}
                                  classes={cn(
                                    "form-input block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                  )}
                                />
                                {/* {errors[data?.name] && (
                        <p className="text-red-600">
                          {errors[data?.name]?.message}
                        </p>
                      )} */}
                              </div>
                            );

                          if (data?.name === "phoneNumber")
                            return (
                              <div>
                                <label
                                  htmlFor={data.name}
                                  className="mb-1 inline-block text-sm"
                                >
                                  {data.label}
                                </label>
                                <Controller
                                  name={data?.name}
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <PhoneInput
                                      {...field}
                                      country={"ng"}
                                      value={field.value || phone}
                                      onChange={(phoneNumber) => {
                                        field.onChange(phoneNumber);
                                        setPhone(phoneNumber);
                                      }}
                                      // inputStyle={{
                                      //   fontFamily: `"Space Grotesk", sans-serif`,
                                      // }}
                                      inputProps={{
                                        name: "phone",
                                        id: "phone",
                                        className:
                                          "form-input block w-full rounded border-0 pl-12 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                      }}
                                      defaultErrorMessage="Phone number is required"
                                      dropdownClass={"relative z-50"}
                                    />
                                  )}
                                />
                              </div>
                            );

                          return (
                            <div key={index} className="">
                              <label
                                htmlFor={data.name}
                                className="mb-1 inline-block text-sm"
                              >
                                {data.label}
                              </label>
                              <input
                                {...register(data?.name)}
                                type={data.type}
                                name={data.name}
                                id={data.name}
                                defaultValue={""}
                                placeholder={data.place_holder}
                                required={data.required}
                                className={cn(
                                  "form-input block w-full rounded border-0 bg-neutral-50 py-2.5 text-sm text-neutral-700 focus:border-neutral-900 focus:ring-0",
                                )}
                              />
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
                      // border-b py-2
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
                      <li>&euro;{cartTotal}</li>
                      <li>&euro; 50.50</li>
                      <li>&euro;{cartTotal + 50.5}</li>
                    </ul>
                  </div>
                </div>
             
                <button
                  // type="submit"
                  className="mt-5 block w-full rounded bg-neutral-900 px-6 py-2.5 text-main"
                >
                  Proceed to payment
                </button>
              </div>
            </div>
            {/* end of order summary */}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Page;

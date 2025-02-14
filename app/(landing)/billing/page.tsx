"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import EditBillingForm from "@/components/my-account-comps/EditBillingForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { formatCurrency } from "@/helper/formatCurrency";
import { IBillingInfo } from "@/interfaces/user.interface";
import { useAppSelector } from "@/redux/hook";
import {
  getAllBllingInfo,
  initPayment,
  orderCreate,
  saveBillingDetails,
  updateDetailsBillings,
  verifyPayment,
} from "@/services/hooks/payment";
import { billingFormData } from "@/utils/formData";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckCircle, Edit2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";
import * as yup from "yup";

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
  save: yup.boolean().default(false),
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
  save: yup.boolean().default(false),
});

const Page = () => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const { cart, buyNowProduct } = useAppSelector((state) => state.product);

  // Get URL parameters
  const isBuyNow = queryParams.get("buyNow") === "true";

  // Determine which products to use
  const products = isBuyNow && buyNowProduct ? [buyNowProduct] : cart;

  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>("option1");
  const [isBillingInfoSaved, setIsBillingInfoSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedBillingId, setSelectedBillingId] = useState<string | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState<IBillingInfo | null>(null);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentProcessingModalOpen, setIsPaymentProcessingModalOpen] =
    useState(false);

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["allBllingInfo"],
    queryFn: async () => getAllBllingInfo(),
  });

  const billingInfos = data?.user as IBillingInfo[];

  const form1 = useForm({
    resolver: yupResolver(form1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phoneNumber: "",
      address: "",
      country: "",
      save: false,
    },
  });
  const form2 = useForm({ resolver: yupResolver(form2Schema) });

  useEffect(() => {
    if (isBuyNow && !buyNowProduct) {
      toast.error("Invalid product selection");
      router.push("/shop");
    }
  }, [isBuyNow, buyNowProduct, router]);

  const paymentInit = useMutation({
    mutationFn: initPayment,
  });

  const saveBilling = useMutation({ mutationFn: saveBillingDetails });
  const updateBillingDetails = useMutation({
    mutationFn: updateDetailsBillings,
  });
  const createOrder = useMutation({ mutationFn: orderCreate });

  useEffect(() => {
    const reference = queryParams.get("reference");

    if (reference && !isOrderCreated) {
      verifyAndCreateOrder(reference);
    }
  }, [queryParams, isOrderCreated]);

  // Add this effect to reset form with billing info when data loads
  useEffect(() => {
    if (billingInfos && billingInfos?.length > 0) {
      // Set initial selected billing info (default or first in array)
      const defaultBilling =
        billingInfos.find((info) => info.defaultBillingInfo) || billingInfos[0];
      setSelectedBillingId(defaultBilling._id);

      form1.reset({
        firstName: defaultBilling.firstName,
        lastName: defaultBilling.lastName,
        email: defaultBilling.email,
        phoneNumber: defaultBilling.phoneNumber,
        address: defaultBilling.streetAddress,
        city: defaultBilling.cityOrTown,
        country: defaultBilling.country,
        save: false,
      });
    }
  }, [billingInfos, form1]);

  // Edit form initialization
  useEffect(() => {
    if (editingInfo) {
      form1.reset({
        firstName: editingInfo.firstName,
        lastName: editingInfo.lastName,
        email: editingInfo.email,
        phoneNumber: editingInfo.phoneNumber,
        address: editingInfo.streetAddress,
        city: editingInfo.cityOrTown,
        country: editingInfo.country,
        save: editingInfo.defaultBillingInfo,
      });
    }
  }, [editingInfo, form1]);

  // Function to map billing info to form values
  const mapBillingInfoToForm = (info: IBillingInfo) => ({
    _id: info._id,
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
    phone: info.phoneNumber,
    address: info.streetAddress,
    state: info.cityOrTown,
    country: info.country,
  });

  // Handle edit submission
  const handleEditSubmit = async (data: any) => {
    if (!data._id) {
      toast.error("Invalid billing information");
      return;
    }

    try {
      const billingInfo = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phone,
        streetAddress: data.address,
        cityOrTown: data.city,
        defaultBillingInfo: data.save,
      };

      await updateBillingDetails.mutateAsync(billingInfo);
      toast.success("Billing info updated successfully!");
      refetch();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update billing info");
    }
  };

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

  const deliveryFee = 50.5;
  const orderTotal = products.reduce((acc, current) => {
    return acc + parseFloat(current.maxPrice) * (current.quantity as number);
  }, 0);

  const totalWithDelivery = orderTotal + deliveryFee;

  const onSubmitForm1 = async (data: any) => {
    setIsPaymentProcessingModalOpen(true); // Open the modal
    setIsProcessingPayment(true);

    try {
      const callbackUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:7009/billing"
          : "https://goldies-frontend-v3.vercel.app/billing";

      const paymentData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        amount: totalWithDelivery,
        callbackUrl: callbackUrl,
      };

      // Step 1: Initialize Payment
      const paymentRes = await paymentInit.mutateAsync(paymentData);
      if (
        !paymentRes?.data?.authorization_url ||
        !paymentRes?.data?.reference
      ) {
        throw new Error("Payment initialization failed.");
      }

      localStorage.setItem("goldies_formData", JSON.stringify(data));

      window.location.href = paymentRes.data.authorization_url;
    } catch (error: any) {
      console.error("Payment Init Error:", error);
      setIsPaymentProcessingModalOpen(false);
      toast.error(error.message || "Payment initialization failed.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // This function should run after successful payment callback
  const verifyAndCreateOrder = async (reference: string) => {
    if (isOrderCreated) return;

    setIsPaymentModalOpen(true); // Open the modal
    setIsSubmitting(true);

    try {
      const formDataString = localStorage.getItem("goldies_formData");

      if (!formDataString) throw new Error("Billing information missing.");

      const data = JSON.parse(formDataString);

      // Step 2: Verify Payment
      const verifyRes = await verifyPayment(reference);
      if (!verifyRes?.data?.status || verifyRes.data.status !== "success") {
        throw new Error("Payment verification failed.");
      }

      // Step 3: Create Order
      const ItemID = products.map((item) => item._id);
      const orderInfo = {
        orderedItems: ItemID,
        fee: {
          subTotal: orderTotal,
          total: totalWithDelivery,
          deliveryFee,
        },
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        cityOrTown: data.city,
        streetAddress: data.address,
        phoneNumber: data.phoneNumber,
      };

      const orderRes = await createOrder.mutateAsync(orderInfo);
      if (!orderRes?.error) {
        setIsOrderCreated(true);
      } else {
        throw new Error(orderRes.message || "Failed to create order.");
      }

      // Step 4: Save Billing Info (If Checked)
      if (data.save) {
        const billingInfo = {
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          cityOrTown: data.city,
          streetAddress: data.address,
          phoneNumber: data.phoneNumber,
          defaultBillingInfo: true,
        };

        if (isBillingInfoSaved) {
          await updateBillingDetails.mutateAsync(billingInfo);
          toast.success("Billing info updated successfully!");
        } else {
          await saveBilling.mutateAsync(billingInfo);
          setIsBillingInfoSaved(true);
          toast.success("Billing info saved successfully!");
        }
      }

      // router.push("/my-orders");
      window.location.href = "/my-orders";
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
      setIsPaymentModalOpen(false);
      localStorage.removeItem("goldies_formData");
    }
  };

  const onSubmitForm2 = async (data: any) => {
    setIsPaymentProcessingModalOpen(true); // Open the modal
    setIsProcessingPayment(true);

    try {
      const callbackUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:7009/billing"
          : "https://goldies-frontend-v3.vercel.app/billing";

      const paymentData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        amount: totalWithDelivery,
        callbackUrl: callbackUrl,
      };

      // Step 1: Initialize Payment
      const paymentRes = await paymentInit.mutateAsync(paymentData);
      if (
        !paymentRes?.data?.authorization_url ||
        !paymentRes?.data?.reference
      ) {
        throw new Error("Payment initialization failed.");
      }

      localStorage.setItem("goldies_formData", JSON.stringify(data));

      window.location.href = paymentRes.data.authorization_url;
    } catch (error: any) {
      console.error("Payment Init Error:", error);
      setIsPaymentProcessingModalOpen(false);
      toast.error(error.message || "Payment initialization failed.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleOnchange = (event: any) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <div className="mt-[64px] flex h-full w-full flex-col bg-red-400 lg:mt-20">
      <div className=" bg-black py-3 ">
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

      <section className="h-full w-full bg-neutral-100 px-4 py-6">
        <div className="mx-auto grid-cols-2 gap-8 md:grid lg:max-w-5xl lg:grid-cols-[1fr_400px] lg:gap-8 xl:max-w-6xl">
          {/* billing form */}
          <div className="w-full lg:w-4/5">
            <div className="mb-4">
              {billingInfos?.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold">Shipping Address</h2>
                  <p>Select from your saved billing address</p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">Billing Details</h2>
                  <p>This field is required before Payment</p>
                </>
              )}
            </div>

            {billingInfos?.length > 0 ? (
              <div className="mb-6 grid gap-2 md:grid-cols-2">
                {billingInfos.map((info: IBillingInfo) => (
                  <label
                    key={info._id}
                    className="relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-4 hover:border-neutral-900 has-[:checked]:border-neutral-900"
                  >
                    <div className="grid grid-cols-[1fr_5fr_1fr] items-center gap-2">
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          name="billingInfo"
                          value={info._id}
                          checked={selectedBillingId === info._id}
                          onChange={() => {
                            setSelectedBillingId(info._id);
                            form1.reset({
                              firstName: info.firstName,
                              lastName: info.lastName,
                              email: info.email,
                              phoneNumber: info.phoneNumber,
                              address: info.streetAddress,
                              city: info.cityOrTown,
                              country: info.country,
                              save: false,
                            });
                          }}
                          className="h-4 w-4 border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {info.firstName} {info.lastName}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {info.cityOrTown}, {info.country}
                        </p>
                        <p className="line-clamp-1 truncate text-sm">
                          {info.streetAddress}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Dialog
                          open={isDialogOpen && editingInfo?._id === info._id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setEditingInfo(null);
                            }
                            setIsDialogOpen(open);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size={"icon"}
                              variant={"ghost"}
                              className="rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingInfo(info);
                              }}
                            >
                              <Edit2Icon size={20} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>
                                Edit Billing Information
                              </DialogTitle>
                            </DialogHeader>
                            {editingInfo && (
                              <EditBillingForm
                                defaultValues={mapBillingInfoToForm(
                                  editingInfo,
                                )}
                                onSubmit={handleEditSubmit}
                                onClose={() => setIsDialogOpen(false)}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>

                      {info.defaultBillingInfo && (
                        <span className="absolute right-0 top-0 rounded-bl-2xl bg-green-500 px-3 py-1 text-[11px] uppercase leading-3 text-white">
                          Default
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            ) : (
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
                                  country={"ng"}
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

                <div className=" my-4">
                  <label
                    htmlFor="save"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="save"
                      {...form1.register("save")}
                      className="form-checkbox rounded-sm checked:bg-neutral-900 checked:hover:bg-neutral-900 focus:ring-neutral-900 checked:focus:bg-neutral-900"
                    />
                    <span>Save this information</span>
                  </label>
                </div>
              </form>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-medium">Shipping method</h3>
              <p className="text-neutral-500">
                This is the address where your product will be delivered
              </p>
            </div>

            <div className="mt-3 inline-flex flex-col space-y-2">
              <label
                htmlFor="option1"
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
                htmlFor="option2"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  checked={selectedMethod === "option2"}
                  value={"option2"}
                  className="form-checkbox rounded-sm checked:bg-neutral-900 checked:hover:bg-neutral-900 focus:ring-neutral-900 checked:focus:bg-neutral-900"
                  onChange={(e) => handleOnchange(e)}
                />
                <span>Use different shipping address</span>
              </label>
            </div>

            <form id="form2">
              <div>
                <div className="">
                  {selectedMethod === "option2" && (
                    <div
                      className={cn(
                        "mt-2 h-0 space-y-3 duration-300",
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
                                      country={"ng"}
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

                      <label
                        htmlFor="save"
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id="save"
                          {...form2.register("save")}
                          className="form-checkbox rounded-sm checked:bg-neutral-900 checked:hover:bg-neutral-900 focus:ring-neutral-900 checked:focus:bg-neutral-900"
                        />
                        <span>Save this information</span>
                      </label>
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
            <div className="divide-y">
              {products.length >= 1 &&
                products.map((item, i) => {
                  return (
                    <div key={i} className=" space-y-3 p-2 md:bg-white">
                      <div className="grid grid-cols-[50px_1fr] gap-2 rounded-md bg-white p-4 md:bg-transparent md:p-0">
                        <div className="h-[50px] w-[50px] shrink-0">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex justify-between ">
                          <div className="pr-4">
                            <h3>{item.name}</h3>
                            <span className="">({item.quantity} Quantity)</span>
                          </div>
                          <div className="text-right ">
                            <span className="text-right ">
                              {formatCurrency(parseInt(item.maxPrice), "en-NG")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="bordert-t border">
              <div className="space-y-3 p-2 md:bg-white">
                <div className="flex items-center justify-between">
                  <ul className="flex flex-col gap-3">
                    <li>SubTotal</li>
                    <li>Delivery Fees</li>
                    <li className="font-bold">Total</li>
                  </ul>
                  <ul className="flex flex-col gap-3 text-right">
                    <li>{formatCurrency(orderTotal, "en-NG")}</li>
                    <li>{formatCurrency(deliveryFee, "en-NG")}</li>
                    <li>{formatCurrency(totalWithDelivery, "en-NG")}</li>
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

            {/* Payment Processing Modal */}
            <Dialog
              open={isPaymentProcessingModalOpen}
              onOpenChange={(open) => setIsPaymentProcessingModalOpen(open)}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl">
                    Processing Payment
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Please wait while we initialize your payment.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-4 py-4">
                  {isProcessingPayment ? (
                    <>
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-900 border-t-transparent" />
                      <p className="text-center text-sm text-neutral-600">
                        Redirecting to payment gateway...
                      </p>
                    </>
                  ) : (
                    <>
                      <div>
                        <CheckCircle size={32} className="text-green-500" />
                      </div>
                      <p className="text-center text-sm text-neutral-600">
                        Payment initialized successfully! Redirecting...
                      </p>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Payment Verification Modal */}
            <Dialog
              open={isPaymentModalOpen}
              onOpenChange={(open) => setIsPaymentModalOpen(open)}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl">
                    Processing Payment
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Please wait while we verify your payment and create your
                    order.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-4 py-4">
                  {isSubmitting ? (
                    <>
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-900 border-t-transparent" />
                      <p className="text-center text-sm text-neutral-600">
                        Verifying payment and creating order...
                      </p>
                    </>
                  ) : (
                    <>
                      <div>
                        <CheckCircle size={32} className="text-green-500" />
                      </div>
                      <p className="text-center text-sm text-neutral-600">
                        Payment verified successfully!
                        <br /> Redirecting to your orders...
                      </p>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;

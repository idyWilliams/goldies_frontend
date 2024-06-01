import React from "react";

export default function BillingInfo() {
  return (
    <div className="rounded-md bg-white px-4  py-5">
      <p className="mb-6 text-[18px]">Billing Information</p>
      <label htmlFor="fullName" className="block lg:w-[70%]">
        <span className="mb-1 inline-block text-[12px]">Full name</span>
        <input
          type="text"
          autoComplete="off"
          id="fullName"
          placeholder="Your fullname"
          className="mb-5 w-full rounded-sm border-none bg-gray-50 text-[13px] focus:border-black focus:outline-none focus:ring-0 focus:ring-black"
        />
      </label>
      <label htmlFor="email" className="block lg:w-[70%]">
        <span className="mb-1 inline-block text-[12px]">Email address</span>
        <input
          type="text"
          autoComplete="off"
          id="email"
          placeholder="Your email"
          className="mb-5 w-full rounded-sm border-none bg-gray-50 text-[13px] focus:border-black focus:outline-none focus:ring-0 focus:ring-black"
        />
      </label>
      <label htmlFor="billingAddress" className="block lg:w-[70%]">
        <span className="mb-1 inline-block text-[12px]">Billing address</span>
        <input
          type="text"
          autoComplete="off"
          id="billingAddress"
          placeholder="Your billingAddress"
          className="mb-5 w-full rounded-sm border-none bg-gray-50 text-[13px] focus:border-black focus:outline-none focus:ring-0 focus:ring-black"
        />
      </label>
      <div className="mb-6 border-b-2 border-gray-300"></div>
      <div className="pl">
        <h3>Order Information</h3>
        <label htmlFor="orders" className="block w-[30%]">
          <span className="mb-1 mt-6 inline-block text-[12px]">
            Total Number of Orders
          </span>
          <input
            type="text"
            autoComplete="off"
            id="orders"
            placeholder="No of orders"
            className="mb-5 w-full rounded-sm border-none bg-gray-50 text-[13px] focus:border-black focus:outline-none focus:ring-0 focus:ring-black"
          />
        </label>
        <label htmlFor="amtSpent" className="block w-[30%]">
          <span className="mb-1 inline-block text-[12px]">Amount spent</span>
          <input
            type="text"
            autoComplete="off"
            id="amtSpent"
            placeholder="Amount Spent"
            className="mb-5 w-full rounded-sm border-none bg-gray-50 text-[13px] focus:border-black focus:outline-none focus:ring-0 focus:ring-black"
          />
        </label>
      </div>
    </div>
  );
}

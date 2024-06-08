import React from "react";

export default function BillingInfo() {
  return (
    <div className="rounded-md bg-white px-4 py-5">
      <p className="mb-6 text-[18px] font-semibold">Billing Information</p>
      <div className="mb-3 block">
        <span className="mb-1 inline-block text-neutral-500">
          Full name:&nbsp;
        </span>
        <span className="font-medium text-neutral-900">John Doe</span>
      </div>
      <div className="mb-3 block">
        <span className="mb-1 inline-block text-neutral-500">
          Email address:&nbsp;
        </span>
        <span className="font-medium text-neutral-900">johndoe@gmail.com</span>
      </div>
      <div className="mb-3 block">
        <span className="mb-1 inline-block text-neutral-500">
          Billing address:&nbsp;
        </span>
        <span className="text-balance font-medium text-neutral-900">
          37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
        </span>
      </div>

      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="pl">
        <h3 className="mb-4 font-semibold">Order Information</h3>
        <div className="mb-2 block">
          <span className="mb-1 inline-block text-neutral-500">
            Total orders:&nbsp;
          </span>
          <span className="text-balance font-medium text-neutral-900">8</span>
        </div>
        <div className="mb-3 block">
          <span className="mb-1 inline-block text-neutral-500">
            Total amount spent:&nbsp;
          </span>
          <span className="text-balance font-medium text-neutral-900">
            &euro;370
          </span>
        </div>
      </div>
    </div>
  );
}

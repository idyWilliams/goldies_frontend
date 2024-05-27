"use client";
import { Profile } from "iconsax-react";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

export default function ProfileInfo() {
  const [phone, setPhone] = useState("");
  return (
    <section className="w-full pl-2 lg:w-[400px]">
      <>
        <div className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-main">
          <span className="items-center justify-center">JD</span>
        </div>
        <p className="my-3 font-semibold">John Doe</p>
        <form className="space-y-5">
          <label htmlFor="fullName" className="block">
            <span className="mb-1 inline-block">Full name</span>
            <input
              type="text"
              autoComplete="off"
              id="fullName"
              placeholder="Your full name"
              className="w-full rounded-sm border-none bg-gray-100"
            />
          </label>
          <label htmlFor="email" className="block">
            <span className="mb-1 inline-block">Email address</span>
            <input
              type="text"
              autoComplete="off"
              id="email"
              placeholder="Your email"
              className="w-full rounded-sm border-none bg-gray-100"
            />
          </label>
          <label htmlFor="phoneNumber" className="block">
            <PhoneInput
              inputClass="w-full rounded-sm border-none bg-gray-100"
              //   showDropdown={true}
              enableSearch={true}
              enableAreaCodes={true}
              //   country={"us"}
              value={phone}
              onChange={setPhone}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              //   containerStyle={{ width: "100%" }}
              //   inputStyle={{
              //     width: "100%",
              //     padding: "0.5rem",
              //     borderRadius: "0.25rem",
              //     border: "1px solid #ccc",
              //   }}
              //   buttonStyle={{
              //     borderRadius: "0.25rem 0 0 0.25rem",
              //     border: "1px solid #ccc",
              //   }}
            />
          </label>
        </form>
        <div className="mb-6 mt-10 flex gap-8 lg:mb-0">
          <button className="items-center justify-center rounded-sm border border-red-500 bg-white px-3 py-2 text-sm text-red-500 lg:text-base">
            Cancel Changes
          </button>
          <button className="items-center justify-center rounded-sm bg-black px-5 py-2 text-sm text-main lg:text-base">
            Save Changes
          </button>
        </div>
      </>
    </section>
  );
}

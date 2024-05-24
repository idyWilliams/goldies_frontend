import { Eye, EyeSlash, Lock1 } from "iconsax-react";
import React, { useState } from "react";

export default function ChangePassword() {
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);

  const toggleEye1 = () => {
    setEye1((prev: any) => !prev);
  };
  const toggleEye2 = () => {
    setEye2((prev: any) => !prev);
  };
  const toggleEye3 = () => {
    setEye3((prev: any) => !prev);
  };
  return (
    <section className="w-full pl-2 lg:w-[400px]">
      <>
        <div className="mb-6">
          <h1 className="hidden font-bold">Change Password</h1>
          <p className="text-sm text-neutral-500">Input your password below</p>
        </div>
        <form id="changePassword" className="space-y-5">
          <label htmlFor="oldPassword" className="relative block">
            <span className="mb-1 text-sm font-medium">Old Password</span>
            <input
              type={eye1 ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              className="form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black"
            />
            <span
              className="absolute bottom-3 right-3 cursor-pointer text-gray-500"
              onClick={toggleEye1}
            >
              {eye1 ? <EyeSlash size={20} /> : <Eye size={20} />}
            </span>
          </label>
          <label htmlFor="newPassword" className="relative block">
            <span className="mb-1 text-sm font-medium">New Password</span>
            <input
              type={eye2 ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              className="form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black"
            />
            <span
              className="absolute bottom-3 right-3 cursor-pointer text-gray-500"
              onClick={toggleEye2}
            >
              {eye2 ? <EyeSlash size={20} /> : <Eye size={20} />}
            </span>
          </label>
          <label htmlFor="confirm" className="relative block">
            <span className="mb-1 text-sm font-medium">
              Confirm New Password
            </span>
            <input
              type={eye3 ? "text" : "password"}
              name="confirm"
              id="confirm"
              className="form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black"
            />
            <span
              className="absolute bottom-3 right-3 cursor-pointer text-gray-500"
              onClick={toggleEye3}
            >
              {eye3 ? <EyeSlash size={20} /> : <Eye size={20} />}
            </span>
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

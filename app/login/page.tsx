import Header from "@/components/Header";
import React from "react";

export default function page() {
  return (
    <>
      <Header />
      <section className="flex h-screen items-center justify-center">
        <form id="login" className="">
          <label htmlFor="email" className="">
            <span className="mb-2 block w-full font-bold">Email Address</span>
            <input type="email" name="email" autoComplete="off" id="email" />
          </label>
          <label htmlFor=""></label>
        </form>
      </section>
    </>
  );
}
